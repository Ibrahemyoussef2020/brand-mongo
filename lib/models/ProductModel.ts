import mongoose from 'mongoose'



export type Product = {
  _id?: String,
  static_id: String,
  title?: String
  image?: String
  price?: Number,
  oldPrice?: Number,
  discount?: String,
  brand?: String
  description?: String
  category?: String,
  type?: String,
  ratings?: Number,
  avgRating?: Number,
  // numReviews?: Number
  // countInStock?: Number
  color?: String,
  // isFeatured?:Boolean,
  free_delivery?: Boolean,
  to_home?: Boolean,
  premium_offer?: Boolean,
  verified?: Boolean,

  link?: String,
  badge?: String,
}



const ProductSchema = new mongoose.Schema(
  {
    static_id: { type: String, required: true },
    title: { type: String, required: false, unique: false },
    category: { type: String, required: false },
    type: { type: String, required: false },
    image: { type: String, required: false },
    price: { type: Number, required: false },
    oldPrice: { type: Number, required: false },
    discount: { type: String, default: "0%", required: false },
    brand: { type: String, required: false },
    color: { type: String, required: false },
    badge: { type: String, default: 'seller', required: false },
    link: { type: String, default: 'choice', required: false },
    ratings: { type: Number, required: false, default: 0 },
    avgRating: { type: Number, required: false, default: 0 },
    //  numReviews: { type: Number, required: false, default: 0 },
    //   countInStock: { type: Number, required: false, default: 100 },
    description: { type: String, required: false },
    //  isFeatured: { type: Boolean, default: false },
    free_delivery: { type: Boolean, default: false },
    to_home: { type: Boolean, default: true, required: false },
    premium_offer: { type: Boolean, default: false, required: false },
    verified: { type: Boolean, default: false, required: false },
    //  banner: String,
  },
  {
    timestamps: false,
  }
)

const ProductModel =
  mongoose.models?.Product || mongoose.model('Product', ProductSchema)

export default ProductModel


