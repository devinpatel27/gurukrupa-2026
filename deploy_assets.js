const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');
const productImageDir = path.join(publicDir, 'product-images');
const brainDir = 'C:\\Users\\BAPS\\.gemini\\antigravity\\brain\\50415c64-aa8e-49e7-a17f-f8dcb09b4dc8';

console.log('Ensuring public directory exists...');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('Created public directory at: ' + publicDir);
}

if (!fs.existsSync(productImageDir)) {
    fs.mkdirSync(productImageDir, { recursive: true });
    console.log('Created product-images directory at: ' + productImageDir);
}

// Copy favicon placeholder if not exists
const faviconPath = path.join(publicDir, 'favicon.ico');
if (!fs.existsSync(faviconPath)) {
    fs.writeFileSync(faviconPath, '');
    console.log('Created placeholder favicon.ico');
}

// Copy logo.svg from root to public if exists
const rootLogo = path.join(rootDir, 'logo.svg');
const publicLogo = path.join(publicDir, 'logo.svg');
if (fs.existsSync(rootLogo)) {
    fs.copyFileSync(rootLogo, publicLogo);
    console.log('Copied logo.svg to public folder');
}

// Copy all PNGs from brain folder to product-images
if (fs.existsSync(brainDir)) {
    const files = fs.readdirSync(brainDir);
    files.forEach(file => {
        if (file.toLowerCase().endsWith('.png')) {
            const src = path.join(brainDir, file);
            const dest = path.join(productImageDir, file);
            fs.copyFileSync(src, dest);
            console.log(`Copied ${file} to product-images`);
        }
    });
} else {
    console.error('Brain directory not found at: ' + brainDir);
}

console.log('Asset deployment complete.');
