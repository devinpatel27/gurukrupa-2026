const fs = require('fs');
const path = require('path');

const root = __dirname;
const pub = path.join(root, 'public');
const prod = path.join(pub, 'product-images');
const brain = 'C:\\Users\\BAPS\\.gemini\\antigravity\\brain\\50415c64-aa8e-49e7-a17f-f8dcb09b4dc8';

console.log('--- STARTING FINAL ASSET FIX ---');

if (!fs.existsSync(pub)) fs.mkdirSync(pub);
if (!fs.existsSync(prod)) fs.mkdirSync(prod);

// Copy logo
const srcLogo = path.join(root, 'src', 'logo.svg');
const destLogo = path.join(pub, 'logo.svg');
if (fs.existsSync(srcLogo)) {
    fs.copyFileSync(srcLogo, destLogo);
    console.log('✓ Deployed logo.svg');
}

// Copy product PNGs
if (fs.existsSync(brain)) {
    const files = fs.readdirSync(brain);
    files.forEach(f => {
        if (f.toLowerCase().endsWith('.png')) {
            fs.copyFileSync(path.join(brain, f), path.join(prod, f));
            console.log(`✓ Deployed ${f}`);
        }
    });
}

// Create favicon
fs.writeFileSync(path.join(pub, 'favicon.ico'), '');
console.log('✓ Created favicon.ico');

console.log('--- ASSETS OK ---');
