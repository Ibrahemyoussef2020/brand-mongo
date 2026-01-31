import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CartModel from "@/lib/models/CartModel";

// Dummy user for development until full auth is implemented
const TEMP_USER_ID = "temp_user_123"; 

export async function GET(req: NextRequest) {
  await dbConnect();
  // In real app, get userId from session/token
  const userId = TEMP_USER_ID; 

  let cart = await CartModel.findOne({ user: userId });
  
  if (!cart) {
      return NextResponse.json({ items: [], bill: 0 });
  }

  return NextResponse.json(cart);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const userId = TEMP_USER_ID;
  const body = await req.json();
  const { product, quantity, price, title, image, total } = body;

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
    // Update existing item
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].total += total;
  } else {
    // Add new item
    cart.items.push({ product, quantity, price, title, image, total });
  }

  // Recalculate bill
  cart.bill = cart.items.reduce((acc: number, item: any) => acc + item.total, 0);

  await cart.save();
  return NextResponse.json(cart);
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    const userId = TEMP_USER_ID; 
    const { productId } = await req.json(); // If productId is provided, remove item. Else create empty cart.

    if (productId) {
         let cart = await CartModel.findOne({ user: userId });
         if (cart) {
             cart.items = cart.items.filter((item: any) => item.product !== productId);
             cart.bill = cart.items.reduce((acc: number, item: any) => acc + item.total, 0);
             await cart.save();
             return NextResponse.json(cart);
         }
    } else {
        // Clear entire cart
        await CartModel.findOneAndDelete({ user: userId });
        return NextResponse.json({ items: [], bill: 0 });
    }
    
    return NextResponse.json({ message: "Cart not found" }, { status: 404 });
}
