const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const inputSvg = './icon.svg';
  const outputDir = './build';

  if (!fs.existsSync(inputSvg)) {
    console.error('Error: icon.svg not found');
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Generate PNG for Linux (512x512)
    await sharp(inputSvg)
      .resize(512, 512)
      .png()
      .toFile(path.join(outputDir, 'icon.png'));
    
    console.log('✓ Generated icon.png (512x512)');

    // Generate larger PNG for conversion to icns/ico (1024x1024)
    await sharp(inputSvg)
      .resize(1024, 1024)
      .png()
      .toFile(path.join(outputDir, 'icon-1024.png'));
    
    console.log('✓ Generated icon-1024.png (1024x1024)');
    console.log('\nNext steps:');
    console.log('1. Convert build/icon-1024.png to .icns at https://cloudconvert.com/png-to-icns');
    console.log('2. Convert build/icon-1024.png to .ico at https://cloudconvert.com/png-to-ico');
    console.log('3. Save them as build/icon.icns and build/icon.ico');
  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
}

generateIcons();
