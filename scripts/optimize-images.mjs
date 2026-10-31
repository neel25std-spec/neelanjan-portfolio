import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const projectRoot = 'c:/Users/neel2/OneDrive/Documents/Projects/Portfolio';
const publicDir = path.join(projectRoot, 'public');
const imagesDir = path.join(publicDir, 'images');

async function optimize() {
  console.log('=== OPTIMIZING HERO PROFILE IMAGE ===');
  const profileSrc = path.join(imagesDir, 'neelanjan-profile.jpg');
  if (fs.existsSync(profileSrc)) {
    const inputBuf = fs.readFileSync(profileSrc);
    const meta = await sharp(inputBuf).metadata();
    console.log(`Original: ${meta.width}x${meta.height}, ${(inputBuf.length / 1024).toFixed(1)} KB`);

    // 1. Desktop High-Res WebP (692x1024, quality 85)
    const webpPath = path.join(imagesDir, 'neelanjan-profile.webp');
    await sharp(inputBuf)
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);
    console.log(`Created neelanjan-profile.webp: ${(fs.statSync(webpPath).size / 1024).toFixed(1)} KB`);

    // 2. Desktop High-Res AVIF (692x1024, quality 75)
    const avifPath = path.join(imagesDir, 'neelanjan-profile.avif');
    await sharp(inputBuf)
      .avif({ quality: 75, effort: 6 })
      .toFile(avifPath);
    console.log(`Created neelanjan-profile.avif: ${(fs.statSync(avifPath).size / 1024).toFixed(1)} KB`);

    // 3. Mobile WebP (480x710, quality 85)
    const mobileWebpPath = path.join(imagesDir, 'neelanjan-profile-mobile.webp');
    await sharp(inputBuf)
      .resize(480, 710, { fit: 'cover', position: 'top' })
      .webp({ quality: 85, effort: 6 })
      .toFile(mobileWebpPath);
    console.log(`Created neelanjan-profile-mobile.webp: ${(fs.statSync(mobileWebpPath).size / 1024).toFixed(1)} KB`);
  }

  // 4. Optimize bye.webp (displayed at max 70x70)
  const byeSrc = path.join(publicDir, 'bye.webp');
  if (fs.existsSync(byeSrc)) {
    const byeBuf = fs.readFileSync(byeSrc);
    const byeMeta = await sharp(byeBuf).metadata();
    console.log(`\nOriginal bye.webp: ${byeMeta.width}x${byeMeta.height}, ${(byeBuf.length / 1024).toFixed(1)} KB`);
    
    // Resize to 160x160 (more than 2x of 70x70)
    const optByeBuf = await sharp(byeBuf)
      .resize(160, 160, { fit: 'contain' })
      .webp({ quality: 90, effort: 6 })
      .toBuffer();
    
    fs.writeFileSync(byeSrc, optByeBuf);
    console.log(`Optimized bye.webp: ${(optByeBuf.length / 1024).toFixed(1)} KB`);
  }

  // 5. Optimize project preview webp files without reducing visual quality
  const projectWebps = [
    'evercrown.webp', 'velvet-pour.webp', 'gta-vi.webp', 'swt.webp',
    'retrobuilding.webp', 'duevion.webp', 'dexa.webp', 'shop_co.webp',
    'tian.webp', 'tp-host.webp'
  ];

  console.log('\n=== OPTIMIZING PROJECT IMAGES ===');
  for (const name of projectWebps) {
    const filePath = path.join(publicDir, name);
    if (fs.existsSync(filePath)) {
      const origBuf = fs.readFileSync(filePath);
      const meta = await sharp(origBuf).metadata();
      const targetWidth = Math.min(meta.width, 1000);
      
      const newBuf = await sharp(origBuf)
        .resize(targetWidth, null, { withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      
      console.log(`${name}: ${(origBuf.length/1024).toFixed(1)} KB -> ${(newBuf.length/1024).toFixed(1)} KB (${Math.round((1 - newBuf.length/origBuf.length)*100)}% savings)`);
      
      if (newBuf.length < origBuf.length) {
        fs.writeFileSync(filePath, newBuf);
      }
    }
  }

  // Clean up any temporary files if any
  const tempBye = path.join(publicDir, 'bye-opt.webp');
  if (fs.existsSync(tempBye)) fs.unlinkSync(tempBye);
  console.log('\n=== OPTIMIZATION COMPLETE ===');
}

optimize().catch(console.error);
