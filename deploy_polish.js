const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\BAPS\\.gemini\\antigravity\\brain\\50415c64-aa8e-49e7-a17f-f8dcb09b4dc8';
const destDir = 'D:\\xampp\\htdocs\\gurukrupa\\public';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const mapping = {
    'cat_ro_purifier_premium_1775479391898.png': 'cat-ro.png',
    'cat_water_dispenser_office_1775479412208.png': 'cat-dispenser.png',
    'cat_water_geyser_modern_1775479431098.png': 'cat-geyser.png',
    'cat_solar_panel_rooftop_1775479449627.png': 'cat-solar.png',
    'hero_purifier_ultra_premium_1775479480299.png': 'hero-purifier.png'
};

Object.entries(mapping).forEach(([oldName, newName]) => {
    const src = path.join(brainDir, oldName);
    const dest = path.join(destDir, newName);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Deployed: ${newName}`);
    } else {
        console.error(`Source missing: ${oldName}`);
    }
});

console.log('Final Polish: Category and Hero images deployed.');
