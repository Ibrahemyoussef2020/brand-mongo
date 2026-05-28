/**
 * Safely build an image src path from a product image field.
 * Handles:
 *  - paths that already start with '/' (avoids '//')
 *  - paths that already include a file extension (avoids '.png.webp')
 *  - empty/null paths (returns placeholder)
 */
export function getImageSrc(imagePath: string | undefined | null, ext: string = '.webp'): string {
  if (!imagePath) return '/images/placeholder.webp';

  // Remove leading slash if present to avoid double-slash
  const cleaned = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  // If the path already has an image extension, use it as-is
  if (/\.(webp|png|jpe?g|gif|svg|avif)$/i.test(cleaned)) {
    return `/${cleaned}`;
  }

  return `/${cleaned}${ext}`;
}
