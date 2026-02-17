import mongoose from 'mongoose'

export type LocalizedString = {
  en?: string;
  ar?: string;
};

export type Product = {
  _id?: string;
  static_id: string;
  title?: LocalizedString;
  image?: string;
  price?: number;
  oldPrice?: number;
  discount?: LocalizedString | string;
  brand?: LocalizedString;
  description?: LocalizedString;
  category?: LocalizedString;
  type?: LocalizedString;
  ratings?: number;
  avgRating?: number;
  color?: LocalizedString;
  free_delivery?: boolean;
  to_home?: boolean;
  premium_offer?: boolean;
  verified?: boolean;
  link?: LocalizedString;
  badge?: LocalizedString;
}

const ProductSchema = new mongoose.Schema(
  {
    static_id: { type: String, required: true },
    title: {
      en: { type: String },
      ar: { type: String }
    },
    category: {
      en: { type: String },
      ar: { type: String }
    },
    type: {
      en: { type: String },
      ar: { type: String }
    },
    image: { type: String, required: false },
    price: { type: Number, required: false },
    oldPrice: { type: Number, required: false },
    discount: {
      en: { type: String },
      ar: { type: String }
    },
    brand: {
      en: { type: String },
      ar: { type: String }
    },
    color: {
      en: { type: String },
      ar: { type: String }
    },
    badge: {
      en: { type: String },
      ar: { type: String }
    },
    link: {
      en: { type: String },
      ar: { type: String }
    },
    ratings: { type: Number, required: false, default: 0 },
    avgRating: { type: Number, required: false, default: 0 },
    description: {
      en: { type: String },
      ar: { type: String }
    },
    free_delivery: { type: Boolean, default: false },
    to_home: { type: Boolean, default: true, required: false },
    premium_offer: { type: Boolean, default: false, required: false },
    verified: { type: Boolean, default: false, required: false },
  },
  {
    timestamps: true,
  }
)

const ProductModel =
  mongoose.models?.Product || mongoose.model('Product', ProductSchema)

export default ProductModel
