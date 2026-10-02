export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";
import CartModel from "@/lib/models/CartModel";
import UserModel from "@/lib/models/UserModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const orders = await OrderModel.find({ user: userId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("Error in GET /api/orders:", error);
    return NextResponse.json({ error: (error as Error).message || String(error) }, { status: 500 });
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
    const body = await req.json();
    const { paymentIntentId, shippingAddress } = body;

    // Check if order with this paymentIntentId already exists (prevent duplicates)
    if (paymentIntentId) {
      const existingOrder = await OrderModel.findOne({ paymentIntentId });
      if (existingOrder) {
        return NextResponse.json({ 
          message: "Order already exists", 
          order: existingOrder 
        });
      }
    }

    // Create order from current cart
    const cart = await CartModel.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const newOrder = await OrderModel.create({
      user: userId,
      items: cart.items,
      totalBill: cart.bill,
      status: "Paid",
      paymentIntentId: paymentIntentId || null,
      shippingAddress: shippingAddress || ""
    });

    // Clear cart after order
    await CartModel.findOneAndDelete({ user: userId });

    return NextResponse.json({ 
      success: true, 
      message: "Order created successfully", 
      order: newOrder 
    });
  } catch (error: any) {
    console.error("Error in POST /api/orders:", error);
    return NextResponse.json({ error: (error as Error).message || String(error) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();
    const { orderId, status, items } = body;

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    
    // Check if the user is an admin proposing changes to items
    if (items && (session.user.role === 'admin' || session.user.role === 'super_admin')) {
      updateData.requiresUserApproval = true;
      updateData.status = "Pending Approval";
      updateData.proposedChanges = {
        items,
        totalBill: items.reduce((sum: number, item: any) => sum + (item.total || item.price * item.quantity), 0),
        status: status || undefined
      };
    } else {
      // Normal update
      if (status) updateData.status = status;
      if (items) {
        updateData.items = items;
        updateData.totalBill = items.reduce((sum: number, item: any) => sum + (item.total || item.price * item.quantity), 0);
      }
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updateData, { new: true });

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Send email to user if an admin proposed changes
    if (updateData.requiresUserApproval) {
      try {
        const orderUser = await UserModel.findById(updatedOrder.user);
        if (orderUser && orderUser.email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: orderUser.email,
            subject: `Action Required: Modifications proposed for your Order #${updatedOrder._id.toString().slice(-6)}`,
            html: `
              <h3>Admin has proposed changes to your order!</h3>
              <p>Hello ${orderUser.name},</p>
              <p>The administration team has proposed some modifications to your recent order. Please log in to your account and navigate to <strong>My Orders</strong> to review and accept or refuse these changes.</p>
              <p>Thank you!</p>
            `,
          };
          await transporter.sendMail(mailOptions);
        }
      } catch (err) {
        console.error("Failed to send email notification to user:", err);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Order updated successfully", 
      order: updatedOrder 
    });
  } catch (error: any) {
    console.error("Error in PUT /api/orders:", error);
    return NextResponse.json({ error: (error as Error).message || String(error) }, { status: 500 });
  }
}

