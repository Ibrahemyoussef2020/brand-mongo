import mongoose from 'mongoose';

export interface IReview {
  _id?: string;
  customer: string;
  email: string;
  productTitle: string;
  rating: number;
  comment: string;
  status: 'Approved' | 'Pending' | 'Flagged';
  date: string;
}

const ReviewSchema = new mongoose.Schema(
  {
    customer: { type: String, required: true },
    email: { type: String, required: true },
    productTitle: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    comment: { type: String, required: true },
    status: { type: String, enum: ['Approved', 'Pending', 'Flagged'], default: 'Approved' },
    date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.models?.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default ReviewModel;
