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
        requiresUserApproval: { type: Boolean, default: false },
        proposedChanges: {
            items: [
                {
                    product: { type: String },
                    quantity: { type: Number },
                    price: { type: Number },
                    title: {
                        en: { type: String },
                        ar: { type: String }
                    },
                    image: { type: String },
                    total: { type: Number }
                }
            ],
            totalBill: { type: Number },
            status: { type: String }
        }
    },
    { timestamps: true }
);

// Compound index: covers find({ user }) + sort({ createdAt: -1 }) in one scan
OrderSchema.index({ user: 1, createdAt: -1 });
// Single index: covers duplicate-check findOne({ paymentIntentId }) in POST /api/orders
OrderSchema.index({ paymentIntentId: 1 });

const OrderModel = mongoose.models?.Order || mongoose.model("Order", OrderSchema);

export default OrderModel;
