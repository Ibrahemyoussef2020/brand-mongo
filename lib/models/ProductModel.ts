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
  image2?: string;
  image3?: string;
  image4?: string;
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
  stockCount?: number;
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
    image2: { type: String, required: false },
    image3: { type: String, required: false },
    image4: { type: String, required: false },
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
    stockCount: { type: Number, default: 0, required: false }
  },
  {
    timestamps: true,
  }
)

// Indexes for frequently filtered fields
// category.en: used in 10+ category-level API routes
ProductSchema.index({ 'category.en': 1 });
// static_id: used in findOne lookups and prefix-regex queries
ProductSchema.index({ static_id: 1 });
// type.en / brand.en: used in fetchProducts filter builder
ProductSchema.index({ 'type.en': 1 });
ProductSchema.index({ 'brand.en': 1 });
// price: used in range ($gte/$lte) filters
ProductSchema.index({ price: 1 });
// avgRating: used in equality and range filters
ProductSchema.index({ avgRating: 1 });
// Compound: category + price is the most common combined filter pattern
ProductSchema.index({ 'category.en': 1, price: 1 });
// to_home: used in homepage recommended products
ProductSchema.index({ to_home: 1, createdAt: -1 });

const ProductModel =
  mongoose.models?.Product || mongoose.model('Product', ProductSchema)

export default ProductModel
