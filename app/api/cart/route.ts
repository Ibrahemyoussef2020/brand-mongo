import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CartModel from "@/lib/models/CartModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Subscriber from "@/lib/models/SubscriberModel";
import ProductModel from "@/lib/models/ProductModel";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;

    let cart = await CartModel.findOne({ user: userId });
    
    if (!cart) {
        return NextResponse.json({ items: [], bill: 0, success: true, message: "Cart empty" }, { status: 200 });
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
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const userEmail = session.user.email;
    const body = await req.json();
    const { product, quantity, price, title, image, deliveryPrice } = body;

    // Validate required fields
    if (!product || quantity === undefined || price === undefined) {
         console.error("Missing required fields in POST /api/cart", body);
         return NextResponse.json({success: false , message: "Missing required fields (product, quantity, price)" }, { status: 400 });
    }

    const subscriber = await Subscriber.findOne({ email: userEmail });
    const productData = await ProductModel.findOne({ static_id: product });
    
    let appliedPrice = price;
    if (subscriber && productData?.premium_offer) {
        appliedPrice = price * 0.8;
    }

    const calculatedTotal = (appliedPrice * quantity);

    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      cart = await CartModel.create({ 
          user: userId, 
          items: [],
          bill: 0
      });
    }

    const existingItemIndex = cart.items.findIndex((item: any) => item.product === product);

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].total = cart.items[existingItemIndex].quantity * appliedPrice; 
    } else {
      cart.items.push({ product, quantity, price: appliedPrice, title, image, total: calculatedTotal });
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
        
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const userId = session.user.id;
        const userEmail = session.user.email;
        const body = await req.json();
        const { productId, action, value } = body; 

        let cart = await CartModel.findOne({ user: userId });
        if (!cart) {
             return NextResponse.json({ success: true, message: "Cart empty", cart: { items: [], bill: 0 } }, { status: 200 });
        }

        const itemIndex = cart.items.findIndex((item: any) => item.product === productId);

        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            let newQuantity = item.quantity;
            
            if (action === 'increase') {
                newQuantity = item.quantity + 1;
            } else if (action === 'decrease' && item.quantity > 1) {
                newQuantity = item.quantity - 1;
            } else if (action === 'set' && typeof value === 'number') {
                newQuantity = value;
            }

            const subscriber = await Subscriber.findOne({ email: userEmail });
            const productData = await ProductModel.findOne({ static_id: productId });
            
            let appliedPrice = item.price; // Start with persisted price
            // If it's a premium offer and user is subscriber, ensure price is discounted (if not already)
            // Note: price is already persisted in item. So if they sub after adding, we might need to update.
            if (subscriber && productData?.premium_offer) {
                // If the persisted price is the original price, discount it.
                // Assuming productData.price is the original price.
                if (appliedPrice === productData.price) {
                     appliedPrice = productData.price * 0.8;
                }
            } else if (!subscriber && productData?.premium_offer) {
                // If they unsubscribed, restore original price
                appliedPrice = productData.price || item.price;
            }

            cart.items[itemIndex].quantity = newQuantity;
            cart.items[itemIndex].price = appliedPrice;
            cart.items[itemIndex].total = newQuantity * appliedPrice;
            
            // Recalculate bill
            cart.bill = cart.items.reduce((acc: number, cur: any) => acc + cur.total, 0);
            await cart.save();

            return NextResponse.json({success: true , message: "Item updated successfully" , cart , status: 201 });
        }

        return NextResponse.json({ success: true, message: "Item not found in cart", cart, status: 200 });
    } catch (error: any) {
        console.error("Error in PATCH /api/cart:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const userId = session.user.id;
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
        
        return NextResponse.json({ success: true, message: "Cart is already empty", cart: { items: [], bill: 0 } }, { status: 200 });
    } catch (error: any) {
        console.error("Error in DELETE /api/cart:", error);
        return NextResponse.json({success: false , message: "Internal Server Error", error: error.message , status: 500 }, { status: 500 });
    }
}
