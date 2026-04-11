const fs = require('fs');

let code = fs.readFileSync('components/general/ProductCard.tsx', 'utf8');

// Add Redux Imports
if (!code.includes('import { useDispatch')) {
    code = code.replace(
        "import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';",
        "import { faCartArrowDown, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';\nimport { useDispatch, useSelector } from 'react-redux';\nimport { AppDispatch, IRootState } from '@/redux/store';\nimport { addToCart, addToFavStore, removeFromFavStore } from '@/redux/slices';\nimport customObjectIncludes from '@/utilities/customObjectIncludes';"
    );
}

// Ensure the component block has the correct hooks
if (!code.includes('const dispatch = useDispatch')) {
    code = code.replace(
        "const ProductCard = ({ product, locale, sectionKey = 'items', config = {}, index = 0 }: ProductCardProps) => {\n    return (",
        `const ProductCard = ({ product, locale, sectionKey = 'items', config = {}, index = 0 }: ProductCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const {favorites} = useSelector((state:IRootState) => state.combine.fav);
    const {products: cartProducts} = useSelector((state:IRootState) => state.combine.cart);
    
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const addedProduct = {
            ...product,
            quantity: 1,
            deliveryPrice: product.free_delivery ? 0 : 50, 
            total: product.price
        };
        dispatch(addToCart(addedProduct));
    };

    const handleToggleFav = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (customObjectIncludes(favorites, product._id)) {
            dispatch(removeFromFavStore(product._id));
        } else {
            dispatch(addToFavStore(product));
        }
    };
    
    const isFav = customObjectIncludes(favorites, product._id);
    const currentCartItem = cartProducts.find((item: any) => item._id === product._id);

    return (`
    );
}

// Button 1: faCartArrowDown target
let btn1Idx = code.indexOf("<button style={{");
let innerBtnIconIdx = code.indexOf("<FontAwesomeIcon icon={faCartArrowDown}", btn1Idx);
if (innerBtnIconIdx !== -1 && innerBtnIconIdx < btn1Idx + 500) {
    code = code.replace("<button style={{", "<button onClick={handleAddToCart} style={{");
}

// Button 2: faHeart target
let btn2Idx = code.indexOf("<button style={{", innerBtnIconIdx || 0);
let innerFavIconIdx = code.indexOf("<FontAwesomeIcon icon={faHeart}", btn2Idx);
if (innerFavIconIdx !== -1 && innerFavIconIdx < btn2Idx + 500) {
    code = code.replace(
        /<button style=\{\{[\s\S]*?<FontAwesomeIcon icon=\{faHeart\} style={{ color: '#666', fontSize: '18px' }} \/>\s*<\/button>/,
        (match) => {
            return match
                .replace("<button style={{", "<button onClick={handleToggleFav} style={{")
                .replace("icon={faHeart}", "icon={isFav ? faHeartSolid : faHeart}")
                .replace("color: '#666'", "color: isFav ? '#ff5252' : '#666'");
        }
    );
}

// Button 3: Add to Cart target
let btn3Idx = code.indexOf("<button style={{", code.indexOf("Add to Cart"));
if (btn3Idx === -1) {
    // try finding it before "Add to cart"
    let lastBtn = code.lastIndexOf("<button style={{");
    code = code.substring(0, lastBtn) + code.substring(lastBtn).replace("<button style={{", "<button onClick={handleAddToCart} style={{").replace("Add to Cart", "{currentCartItem ? `Add More (${currentCartItem.quantity})` : 'Add to Cart'}");
}

fs.writeFileSync('components/general/ProductCard.tsx', code);
console.log('SUCCESS');
