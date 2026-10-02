import mongoose from 'mongoose';

export interface IOffer {
  _id?: string;
  title: string;
  badge: string;
  discount: string;
  targetCategory: string;
  status: 'Active' | 'Scheduled' | 'Expired';
  startDate: string;
  endDate: string;
  image: string;
}

const OfferSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    badge: { type: String, default: 'Special Offer' },
    discount: { type: String, required: true },
    targetCategory: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Scheduled', 'Expired'], default: 'Active' },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

const OfferModel = mongoose.models?.Offer || mongoose.model<IOffer>('Offer', OfferSchema);

export default OfferModel;
