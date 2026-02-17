import mongoose from "mongoose";

export type LocalizedString = {
    en?: string;
    ar?: string;
};


const OrderSchema = new mongoose.Schema(
    {
        user: { type: String, required: true },
        items: [
            {
                product: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                title: {
                    en: { type: String },
                    ar: { type: String }
                },
                image: { type: String },
                total: { type: Number }
            }
        ],
        totalBill: { type: Number, required: true },
        status: { type: String, default: "Pending" }, // Pending, Paid, Processing, Delivered, Cancelled
        shippingAddress: { type: String, default: "" },
        paymentIntentId: { type: String, default: null }, // Stripe payment intent ID
    },
    { timestamps: true }
);

const OrderModel = mongoose.models?.Order || mongoose.model("Order", OrderSchema);

export default OrderModel;
