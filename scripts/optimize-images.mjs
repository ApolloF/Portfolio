/*
 * One-off image pipeline: source images in img/ -> committed static derivatives.
 * Run: npm install && node scripts/optimize-images.mjs
 *
 * Photos:      {name}-800.webp + {name}-1600.webp + {name}-800.jpg fallback
 * Screenshots: {name}-800.webp + {name}-1600.webp (q90) + {name}-800.png fallback
 * hero-bg:     640w webp + png (rendered at 320x200, 2x for retina)
 * profile:     240w webp + jpg (rendered at 120px, 2x for retina)
 */
import sharp from 'sharp';
import { statSync } from 'node:fs';
import path from 'node:path';

const IMG = 'img';

const PHOTOS = [
  'sim-pedals-full.jpg',
  'sim-pedals-electronics.jpg',
  'sim-pedals-mechanics.jpg',
  'stress-plant-01.jpg',
  'stress-plant-02.jpg',
  'wood-workshop.jpg',
  'wood-shed.jpg',
  'wood-table-finish.jpg',
  'bgrid-demo.jpg',
  'fabrication-3d-printer.jpg',
  'fabrication-laser-cutter.png', // photo stored as PNG; converts to webp/jpg
];

const SCREENSHOTS = [
  'homelab-proxmox.png',
  'ai-surveillance-nvr.png',
];

const manifest = [];

async function emit(pipeline, outName) {
  const out = path.join(IMG, outName);
  const info = await pipeline.toFile(out);
  manifest.push({
    file: outName,
    width: info.width,
    height: info.height,
    kb: Math.round(statSync(out).size / 1024),
  });
}

function source(name) {
  return sharp(path.join(IMG, name)).rotate(); // bake EXIF orientation
}

function base(name) {
  return name.replace(/\.[^.]+$/, '');
}

for (const name of PHOTOS) {
  const stem = base(name);
  await emit(source(name).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 78 }), `${stem}-800.webp`);
  await emit(source(name).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }), `${stem}-1600.webp`);
  await emit(source(name).resize({ width: 800, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }), `${stem}-800.jpg`);
}

for (const name of SCREENSHOTS) {
  const stem = base(name);
  await emit(source(name).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 90 }), `${stem}-800.webp`);
  await emit(source(name).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 90 }), `${stem}-1600.webp`);
  await emit(source(name).resize({ width: 800, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true }), `${stem}-800.png`);
}

await emit(source('hero-bg.png').resize({ width: 640, withoutEnlargement: true }).webp({ quality: 80 }), 'hero-bg-640.webp');
await emit(source('hero-bg.png').resize({ width: 640, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true }), 'hero-bg-640.png');

await emit(source('profile-photo.jpeg').resize({ width: 240, withoutEnlargement: true }).webp({ quality: 82 }), 'profile-photo-240.webp');
await emit(source('profile-photo.jpeg').resize({ width: 240, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }), 'profile-photo-240.jpg');

console.log(JSON.stringify(manifest, null, 2));
const total = manifest.reduce((sum, m) => sum + m.kb, 0);
console.log(`Total generated: ${manifest.length} files, ${Math.round(total / 1024 * 10) / 10} MB`);
