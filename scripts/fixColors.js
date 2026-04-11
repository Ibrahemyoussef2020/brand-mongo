const fs = require('fs');

let code = fs.readFileSync('components/general/ProductCard.tsx', 'utf8');

// Inject the activeColor variable definition before handleAddToCart
if (!code.includes('const activeColor =')) {
    code = code.replace(
        "const productId = product._id || product.static_id;",
        "const productId = product._id || product.static_id;\n    const activeColor = config.actionButtonType === 'show-details' ? '#2196F3' : '#4CAF50';"
    );
}

// Replace hardcoded green with activeColor
// Cart Button Icon Color
code = code.replace(
    "color: currentCartItem ? '#4CAF50' : '#666'",
    "color: currentCartItem ? activeColor : '#666'"
);

// Cart Button text color
code = code.replace(
    /color: '#4CAF50', fontSize: '13px'/g,
    "color: activeColor, fontSize: '13px'"
);

// Fav Button Icon Color
code = code.replace(
    "color: isFav ? '#4CAF50' : '#666'",
    "color: isFav ? activeColor : '#666'"
);

fs.writeFileSync('components/general/ProductCard.tsx', code);
console.log('SUCCESS');
