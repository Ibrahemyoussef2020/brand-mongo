import { z } from 'zod';
import { HomeSectionType } from '../constants/homeSectionTypes';
import mongoose from 'mongoose';

// Custom validation for MongoDB ObjectIds
const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

// Shared Schemas
const localizedStringSchema = z.object({
  en: z.string().min(1),
  ar: z.string().optional(),
});

const itemsSourceSchemaBase = z.object({
  limit: z.number().int().positive().optional(),
});

const itemsSourceManualSchema = itemsSourceSchemaBase.extend({
  mode: z.literal('manual'),
  productIds: z.array(objectIdSchema),
});

const itemsSourceQuerySchema = itemsSourceSchemaBase.extend({
  mode: z.literal('query'),
  categoryId: z.string().optional(),
  collectionId: z.string().optional(),
  sort: z.enum(['newest', 'priceLow', 'priceHigh', 'topRated', 'bestSelling']).optional(),
});

const itemsSourceSchema = z.discriminatedUnion('mode', [
  itemsSourceManualSchema,
  itemsSourceQuerySchema,
]);

// Base Section Schema (excluding type and config)
const baseSectionSchema = z.object({
  key: z.string().min(1),
  status: z.enum(['draft', 'published']).default('published'),
  title: localizedStringSchema.optional(),
  subtitle: localizedStringSchema.optional(),
  order: z.number().int(),
  enabled: z.boolean().default(true),
  itemsSource: itemsSourceSchema,
});

// Config Schemas per Type
const inlineStartImageConfigSchema = z.object({
  heroImage: z.string().url(),
  buttonText: z.string(),
  buttonHref: z.string(),
  tiles: z
    .array(
      z.object({
        title: z.string(),
        image: z.string(),
        href: z.string(),
        priceFrom: z.number().optional(),
      })
    )
    .min(1)
    .max(10), // Limit adjusted to 10 based on example config (6-10 items)
}).strict();

const gridSectionConfigSchema = z.object({
  layout: z.object({
    columns: z.number().int().min(1).max(12),
  }).strict(),
  showPrice: z.boolean().optional(),
  showRating: z.boolean().optional(),
}).strict();

const dealOffersConfigSchema = z.object({
  endAt: z.string().datetime(), // ISO Date String
  badgeText: z.string().optional(),
  discountLabelMode: z.string().optional(),
}).strict();

const categoryTilesGridConfigSchema = z.object({
  // Add required specific fields here if needed later. Left empty strict object for now.
}).strict();

// Discriminated Unions for the whole section schema
const inlineStartImageSectionSchema = baseSectionSchema.extend({
  type: z.literal(HomeSectionType.INLINE_START_IMAGE),
  config: inlineStartImageConfigSchema,
});

const gridSectionSectionSchema = baseSectionSchema.extend({
  type: z.literal(HomeSectionType.GRID_SECTION),
  config: gridSectionConfigSchema,
});

const dealOffersSectionSchema = baseSectionSchema.extend({
  type: z.literal(HomeSectionType.DEAL_OFFERS),
  config: dealOffersConfigSchema,
});

const categoryTilesGridSectionSchema = baseSectionSchema.extend({
  type: z.literal(HomeSectionType.CATEGORY_TILES_GRID),
  config: categoryTilesGridConfigSchema,
});

export const homeSectionSchema = z.discriminatedUnion('type', [
  inlineStartImageSectionSchema,
  gridSectionSectionSchema,
  dealOffersSectionSchema,
  categoryTilesGridSectionSchema,
]);

// Export inferred types
export type HomeSectionValidated = z.infer<typeof homeSectionSchema>;
