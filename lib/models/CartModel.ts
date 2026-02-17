import mongoose from "mongoose";

export type LocalizedString = {
    en?: string;
    ar?: string;
};


const CartSchema = new mongoose.Schema(
    {
        user: { type: String, required: true }, // Using static_id or email for now
        items: [
            {
                product: { type: String, required: true }, // static_id
                quantity: { type: Number, default: 1 },
                price: { type: Number, required: true }, // Snapshotted price
                title: {
                    en: { type: String },
                    ar: { type: String }
                },
                image: { type: String },
                total: { type: Number }
            }
        ],
        bill: { type: Number, default: 0 }
    },
    { timestamps: true }
);

const CartModel = mongoose.models?.Cart || mongoose.model("Cart", CartSchema);

export default CartModel;
