import mongoose, { Schema, Document } from 'mongoose';

export interface Section extends Document {
  en: string; // English identifier / slug
  ar: string; // Arabic display name
  slug?: string; // optional auto‑generated slug
}

const SectionSchema = new Schema<Section>({
  en: { type: String, required: true, unique: true, trim: true },
  ar: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, sparse: true },
});

// Auto‑generate a slug from the English name if not provided
SectionSchema.pre<Section>('save', function (next) {
  if (!this.slug) {
    this.slug = this.en.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

export const SectionModel =
  (mongoose.models.Section as typeof mongoose.Model) ||
  mongoose.model<Section>('Section', SectionSchema);
