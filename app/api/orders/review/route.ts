import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const body = await req.json();
        const { orderId, action } = body; // action: 'accept' | 'refuse'

        if (!orderId || !action) {
            return NextResponse.json({ error: "Order ID and action are required" }, { status: 400 });
        }

        const order = await OrderModel.findOne({ _id: orderId, user: session.user.id });
        if (!order) {
            return NextResponse.json({ error: "Order not found or unauthorized" }, { status: 404 });
        }

        if (!order.requiresUserApproval || !order.proposedChanges) {
            return NextResponse.json({ error: "No pending changes for this order" }, { status: 400 });
        }

        const updateData: any = {
            requiresUserApproval: false,
            $unset: { proposedChanges: 1 }
        };

        if (action === 'accept') {
            updateData.items = order.proposedChanges.items;
            updateData.totalBill = order.proposedChanges.totalBill;
            if (order.proposedChanges.status) {
                updateData.status = order.proposedChanges.status;
            } else {
                updateData.status = "Processing"; // Revert status from Pending Approval to a normal state if not provided
            }
        } else if (action === 'refuse') {
            // Keep original items and bill, just revert status
            updateData.status = "Processing"; 
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updateData, { new: true });

        return NextResponse.json({ 
            success: true, 
            message: `Changes ${action}ed successfully`, 
            order: updatedOrder 
        });
    } catch (error: any) {
        console.error("Error in POST /api/orders/review:", error);
        return NextResponse.json({ error: (error as Error).message || String(error) }, { status: 500 });
    }
}
