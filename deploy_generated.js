const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\BAPS\\.gemini\\antigravity\\brain\\50415c64-aa8e-49e7-a17f-f8dcb09b4dc8';
const destDir = 'D:\\xampp\\htdocs\\gurukrupa\\public\\product-images';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const mapping = {
    'ro_purifier_modern_white_blue_1775479155641.png': 'ro_purifier_1775470141435.png',
    'under_sink_ro_compact_black_1775479174369.png': 'under_sink_ro_1775470206804.png',
    'tabletop_filter_sleek_white_blue_1775479190869.png': 'tabletop_filter_1775470191344.png',
    'water_dispenser_premium_silver_black_1775479205796.png': 'water_dispenser_1775470175127.png',
    'ro_filter_set_professional_1775479223568.png': 'filter_cartridge_1775470221849.png'
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

// Also ensure logo is in public root
const logoSrc = 'D:\\xampp\\htdocs\\gurukrupa\\src\\logo.svg';
const logoDest = 'D:\\xampp\\htdocs\\gurukrupa\\public\\logo.svg';
if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, logoDest);
    console.log('Verified logo.svg in public folder');
}
