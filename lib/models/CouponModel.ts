import mongoose from 'mongoose';

export interface ICoupon {
  _id?: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  usageCount: number;
  usageLimit: number;
  status: 'Active' | 'Expired' | 'Disabled';
  expiresAt: string;
}

const CouponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
    discountValue: { type: Number, required: true },
    minSpend: { type: Number, default: 0 },
    usageCount: { type: Number, default: 0 },
    usageLimit: { type: Number, default: 100 },
    status: { type: String, enum: ['Active', 'Expired', 'Disabled'], default: 'Active' },
    expiresAt: { type: String, required: true },
  },
  { timestamps: true }
);

const CouponModel = mongoose.models?.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);

export default CouponModel;
