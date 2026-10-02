import mongoose from 'mongoose';

export interface ICategory {
  _id?: string;
  name: { en: string; ar?: string };
  slug: string;
  itemCount: number;
  featured: boolean;
  status: 'Active' | 'Pending' | 'Inactive';
  image?: string;
  date: string;
}

const CategorySchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, default: '' },
    },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    itemCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Active' },
    image: { type: String, default: '' },
    date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.models?.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default CategoryModel;
