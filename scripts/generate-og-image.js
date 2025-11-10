const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateOGImage() {
  const width = 1200;
  const height = 630;
  const logoPath = path.join(__dirname, '../public/ptboost_logo-nobg.png');
  const outputPath = path.join(__dirname, '../public/og-image.jpg');

  // Create gradient background (orange to red) - matching brand colors
  const svgGradient = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#F7931E;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#DC2626;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;

  // Create base image with gradient
  let image = sharp(Buffer.from(svgGradient))
    .resize(width, height)
    .jpeg({ quality: 95 });

  // Add logo if it exists
  if (fs.existsSync(logoPath)) {
    const logo = await sharp(logoPath)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();

    // Composite logo in top-left area
    image = image.composite([
      {
        input: logo,
        top: 50,
        left: 60
      }
    ]);
  }

  // Create text overlay with better positioning and styling
  // Using SVG for text rendering with proper font weights
  const textSVG = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .main-text {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            font-weight: 900;
            fill: white;
            font-size: 72px;
            letter-spacing: -2px;
          }
          .sub-text {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            font-weight: 700;
            fill: white;
            font-size: 52px;
            letter-spacing: -1px;
            opacity: 0.98;
          }
          .price-text {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            font-weight: 800;
            fill: white;
            font-size: 42px;
            letter-spacing: -0.5px;
            opacity: 0.95;
          }
        </style>
      </defs>
      <!-- Main headline -->
      <text x="60" y="${height - 240}" class="main-text">
        Professional Websites for
      </text>
      <text x="60" y="${height - 160}" class="main-text">
        UK Personal Trainers
      </text>
      <!-- Sub headline -->
      <text x="60" y="${height - 80}" class="sub-text">
        Just £7.99/month • Live in 7 Days
      </text>
      <!-- Accent line -->
      <line x1="60" y1="${height - 50}" x2="600" y2="${height - 50}" stroke="white" stroke-width="4" opacity="0.8"/>
    </svg>
  `;

  const textBuffer = Buffer.from(textSVG);
  
  // Composite text onto image
  image = image.composite([
    {
      input: textBuffer,
      top: 0,
      left: 0
    }
  ]);

  // Save the final image
  await image.toFile(outputPath);
  console.log(`✅ Open Graph image generated successfully at: ${outputPath}`);
  console.log(`   Dimensions: ${width}x${height}px`);
  console.log(`   Format: JPEG (quality: 95)`);
}

generateOGImage().catch(console.error);
