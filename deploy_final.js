const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\BAPS\\.gemini\\antigravity\\brain\\50415c64-aa8e-49e7-a17f-f8dcb09b4dc8';
const destDir = 'D:\\xampp\\htdocs\\gurukrupa\\public\\product-images';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(brainDir);
files.forEach(file => {
    if (file.toLowerCase().endsWith('.png')) {
        const src = path.join(brainDir, file);
        const dest = path.join(destDir, file);
        try {
            fs.copyFileSync(src, dest);
            console.log(`Copied: ${file}`);
        } catch (e) {
            console.error(`Failed: ${file} - ${e.message}`);
        }
    }
});

// Also copy logo
const logoSrc = 'D:\\xampp\\htdocs\\gurukrupa\\src\\logo.svg';
const logoDest = 'D:\\xampp\\htdocs\\gurukrupa\\public\\logo.svg';
if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, logoDest);
    console.log('Copied logo.svg');
}
