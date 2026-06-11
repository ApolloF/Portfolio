/*
 * One-off meta asset generation: favicon rasters from favicon.svg and the
 * 1200x630 social share image. Run after optimize-images.mjs dependencies
 * are installed: node scripts/generate-meta-assets.mjs
 */
import sharp from 'sharp';

const svg = { density: 300 };

await sharp('favicon.svg', svg).resize(96, 96).png().toFile('favicon-96.png');
await sharp('favicon.svg', svg).resize(192, 192).png().toFile('favicon-192.png');
await sharp('favicon.svg', svg).resize(512, 512).png().toFile('favicon-512.png');
// iOS composites its own corner radius; ship an opaque full-bleed square
await sharp('favicon.svg', svg).resize(180, 180).flatten({ background: '#0a0a0f' }).png().toFile('apple-touch-icon.png');

await sharp('img/sim-pedals-full.jpg')
  .rotate()
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile('img/og-image.jpg');

console.log('meta assets generated');
