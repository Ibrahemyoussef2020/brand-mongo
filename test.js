require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Mock schemas
const OrderSchema = new mongoose.Schema(
    {
        user: { type: String, required: true },
        items: [
            {
                product: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                title: { en: { type: String }, ar: { type: String } },
                image: { type: String },
                total: { type: Number }
            }
        ],
        totalBill: { type: Number, required: true },
        status: { type: String, default: "Pending" },
        shippingAddress: { type: String, default: "" },
        paymentIntentId: { type: String, default: null },
        requiresUserApproval: { type: Boolean, default: false },
        proposedChanges: {
            items: [
                {
                    product: { type: String },
                    quantity: { type: Number },
                    price: { type: Number },
                    title: { en: { type: String }, ar: { type: String } },
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

const OrderModel = mongoose.models?.Order || mongoose.model('Order', OrderSchema);

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    // Get an order
    const order = await OrderModel.findOne();
    if (!order) {
        console.log('No order found');
        process.exit(0);
    }

    console.log('Testing update on order:', order._id);

    const items = order.items.map(i => i.toObject());
    items[0].quantity += 1; // simulate edit

    const updateData = {
        requiresUserApproval: true,
        status: "Pending Approval",
        proposedChanges: {
            items,
            totalBill: items.reduce((sum, item) => sum + (item.total || item.price * item.quantity), 0),
            status: "Processing"
        }
    };

    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(order._id, updateData, { new: true });
        console.log('Update successful!', updatedOrder.requiresUserApproval);
    } catch (e) {
        console.error('Update failed:', e);
    }

    process.exit(0);
}

run();
