const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

products.forEach(p => {
    if (!p.images) {
        p.images = [
            p.image,
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80"
        ];
    }
});

fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Successfully updated products.json with multiple images for slider demo');
