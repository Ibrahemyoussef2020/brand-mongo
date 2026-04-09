import mongoose, { Schema, Document, Model } from 'mongoose';
import { HomeSectionType } from '../constants/homeSectionTypes';

export interface IHomeSection extends Document {
  key: string;
  type: HomeSectionType;
  status: 'draft' | 'published';
  title?: {
    en: string;
    ar?: string;
  };
  subtitle?: {
    en: string;
    ar?: string;
  };
  order: number;
  enabled: boolean;
  config: any;
  itemsSource: {
    mode: 'manual' | 'query';
    productIds?: mongoose.Types.ObjectId[];
    categoryId?: string;
    collectionId?: string;
    limit?: number;
    sort?: 'newest' | 'priceLow' | 'priceHigh' | 'topRated' | 'bestSelling';
  };
  createdAt: Date;
  updatedAt: Date;
}

const HomeSectionSchema = new Schema<IHomeSection>(
  {
    key: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: Object.values(HomeSectionType),
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      required: true,
    },
    title: {
      en: { type: String },
      ar: { type: String },
    },
    subtitle: {
      en: { type: String },
      ar: { type: String },
    },
    order: { type: Number, required: true },
    enabled: { type: Boolean, default: true },
    config: { type: Schema.Types.Mixed, required: true },
    itemsSource: {
      mode: {
        type: String,
        enum: ['manual', 'query'],
        required: true,
      },
      productIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
      categoryId: { type: String },
      collectionId: { type: String },
      limit: { type: Number },
      sort: {
        type: String,
        enum: ['newest', 'priceLow', 'priceHigh', 'topRated', 'bestSelling'],
      },
    },
  },
  {
    timestamps: true,
  }
);

export const HomeSection: Model<IHomeSection> =
  mongoose.models.HomeSection ||
  mongoose.model<IHomeSection>('HomeSection', HomeSectionSchema);
