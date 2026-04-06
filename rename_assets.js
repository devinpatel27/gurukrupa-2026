const fs = require('fs');
const path = require('path');

const baseDir = 'D:\\xampp\\htdocs\\gurukrupa\\public';
const imgDir = path.join(baseDir, 'product-images');

const productMapping = {
    'ro_purifier_modern_white_blue_1775479155641.png': 'ro_purifier_1775470141435.png',
    'under_sink_ro_compact_black_1775479174369.png': 'under_sink_ro_1775470206804.png',
    'tabletop_filter_sleek_white_blue_1775479190869.png': 'tabletop_filter_1775470191344.png',
    'water_dispenser_premium_silver_black_1775479205796.png': 'water_dispenser_1775470175127.png',
    'ro_filter_set_professional_1775479223568.png': 'filter_cartridge_1775470221849.png'
};

const categoryMapping = {
    'cat_ro_purifier_premium_1775479391898.png': 'cat-ro.png',
    'cat_water_dispenser_office_1775479412208.png': 'cat-dispenser.png',
    'cat_water_geyser_modern_1775479431098.png': 'cat-geyser.png',
    'cat_solar_panel_rooftop_1775479449627.png': 'cat-solar.png',
    'hero_purifier_ultra_premium_1775479480299.png': 'hero-purifier.png'
};

// Rename products within product-images/
Object.entries(productMapping).forEach(([oldName, newName]) => {
    const oldPath = path.join(imgDir, oldName);
    const newPath = path.join(imgDir, newName);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed Product: ${newName}`);
    }
});

// Move and rename categories to public/ (root)
Object.entries(categoryMapping).forEach(([oldName, newName]) => {
    const oldPath = path.join(imgDir, oldName);
    const newPath = path.join(baseDir, newName);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Moved & Renamed Category: ${newName}`);
    }
});

console.log('Final Asset Alignment Complete.');
