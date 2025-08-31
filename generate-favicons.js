const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Ensure the public directory exists
const publicDir = path.join(__dirname, 'public');

// Favicon sizes to generate
const faviconSizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

async function generateFavicons() {
  try {
    const sourceImage = path.join(publicDir, 'sportchain.png');
    
    if (!fs.existsSync(sourceImage)) {
      console.error('Source image sportchain.png not found in public directory');
      return;
    }

    console.log('Generating favicon files...');

    for (const favicon of faviconSizes) {
      const outputPath = path.join(publicDir, favicon.name);
      
      await sharp(sourceImage)
        .resize(favicon.size, favicon.size, {
          fit: 'contain',
          background: { r: 10, g: 15, b: 13, alpha: 1 } // #0a0f0d background
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated ${favicon.name}`);
    }

    console.log('\n🎉 All favicon files generated successfully!');
    console.log('\nFiles created:');
    faviconSizes.forEach(favicon => {
      console.log(`  - ${favicon.name}`);
    });
    
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

// Check if sharp is installed
try {
  require.resolve('sharp');
  generateFavicons();
} catch (e) {
  console.log('Sharp package not found. Installing...');
  console.log('Please run: npm install sharp');
  console.log('Then run: node generate-favicons.js');
}
