const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\BAPS\\.gemini\\antigravity\\brain\\50415c64-aa8e-49e7-a17f-f8dcb09b4dc8';
const destDir = 'd:\\xampp\\htdocs\\gurukrupa\\public\\images';

if (!fs.existsSync('d:\\xampp\\htdocs\\gurukrupa\\public')) {
    fs.mkdirSync('d:\\xampp\\htdocs\\gurukrupa\\public');
}
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

const files = fs.readdirSync(srcDir);
const pngFiles = files.filter(f => f.endsWith('.png'));

pngFiles.forEach(file => {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    console.log('Copied ' + file);
});
