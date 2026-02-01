import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CartModel from "@/lib/models/CartModel";

// Dummy user for development until full auth is implemented
const TEMP_USER_ID = "temp_user_123"; 

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    // In real app, get userId from session/token
    const userId = TEMP_USER_ID; 

    let cart = await CartModel.findOne({ user: userId });
    
    if (!cart) {
        return NextResponse.json({ items: [], bill: 0 , success: false  , message: "Cart not found" }, {status: 404 });
    }

    return NextResponse.json(cart);
  } catch (error: any) {
    console.error("Error in GET /api/cart:", error);
    return NextResponse.json({success: false , message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const userId = TEMP_USER_ID;
    const body = await req.json();
    const { product, quantity, price, title, image, total, deliveryPrice } = body;

    // Validate required fields
    if (!product || quantity === undefined || price === undefined) {
         console.error("Missing required fields in POST /api/cart", body);
         return NextResponse.json({success: false , message: "Missing required fields (product, quantity, price)" }, { status: 400 });
    }

    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      cart = await CartModel.create({ 
          user: userId, 
          items: [],
          bill: 0
      });
    }

    // Find existing item by product ID (which is passed as 'product' in body, or 'id' mapped to 'product')
    const existingItemIndex = cart.items.findIndex((item: any) => item.product === product);

    if (existingItemIndex > -1) {
      // Update existing item
      const currentItem = cart.items[existingItemIndex];
      
      cart.items[existingItemIndex].quantity += quantity;
      
      // Logic: current total + new total - deliveryPrice (to avoid double delivery charge if delivery is per item type or per order?)
      // The user said "add deleveryPrice and don't presist that".
      // We assume body.deliveryPrice is the delivery associated with THIS product.
      cart.items[existingItemIndex].total = (currentItem.total + total) - (deliveryPrice || 0); 

    } else {
      // Add new item
      // We do NOT store deliveryPrice in the item object in DB
      cart.items.push({ product, quantity, price, title, image, total });
    }

    // Recalculate bill
    cart.bill = cart.items.reduce((acc: number, item: any) => acc + item.total, 0);

    await cart.save();
    return NextResponse.json(cart);
  } catch (error: any) {
    console.error("Error in POST /api/cart:", error);
    return NextResponse.json({success: false , message: "Internal Server Error", error: error.message , status: 500 }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
    try {
        await dbConnect();
        const userId = TEMP_USER_ID;
        const body = await req.json();
        const { productId, action, value } = body; 
        // action: 'increase' | 'decrease' | 'set'

        let cart = await CartModel.findOne({ user: userId });
        if (!cart) {
             return NextResponse.json({success: false , message: "Cart not found" }, { status: 404 });
        }

        const itemIndex = cart.items.findIndex((item: any) => item.product === productId);

        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            let quantityDifference = 0;
            let newQuantity = item.quantity;
            
            // Ensure price is available. Item from DB has price.
            const price = item.price;

            if (action === 'increase') {
                quantityDifference = 1;
                newQuantity = item.quantity + 1;
            } else if (action === 'decrease') {
                if (item.quantity > 1) {
                    quantityDifference = -1;
                    newQuantity = item.quantity - 1;
                } else {
                     return NextResponse.json({success: false , message: "Item not found" , status: 404 }); // No change
                }
            } else if (action === 'set' && typeof value === 'number') {
                newQuantity = value;
                quantityDifference = newQuantity - item.quantity;
            }

            if (quantityDifference !== 0) {
                cart.items[itemIndex].quantity = newQuantity;
                cart.items[itemIndex].total += quantityDifference * price;
                
                // Recalculate bill
                cart.bill = cart.items.reduce((acc: number, cur: any) => acc + cur.total, 0);
                await cart.save();
            }

            return NextResponse.json({success: true , message: "Item updated successfully" , cart , status: 201 });
        }

        return NextResponse.json({success: false , message: "Item not found" , status: 404 });
    } catch (error: any) {
        console.error("Error in PATCH /api/cart:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        const userId = TEMP_USER_ID; 
        const { productId } = await req.json(); 

        if (productId) {
             let cart = await CartModel.findOne({ user: userId });
             if (cart) {
                 cart.items = cart.items.filter((item: any) => item.product !== productId);
                 cart.bill = cart.items.reduce((acc: number, item: any) => acc + item.total, 0);
                 await cart.save();
                 return NextResponse.json({success: true , message: "Item deleted successfully" , cart});
             }
        } else {
            // Clear entire cart
            await CartModel.findOneAndDelete({ user: userId });
            return NextResponse.json({success: true , message: "Cart cleared successfully" , cart: { items: [], bill: 0 }});
        }
        
        return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    } catch (error: any) {
        console.error("Error in DELETE /api/cart:", error);
        return NextResponse.json({success: false , message: "Internal Server Error", error: error.message , status: 500 }, { status: 500 });
    }
}
