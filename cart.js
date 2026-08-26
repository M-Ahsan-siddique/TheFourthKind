// Shopping Cart System for The Fourth Kind
(function() {
    if (window.__fourthKindCartInitialized) return;
    window.__fourthKindCartInitialized = true;

    // Injected Styles for the Cart Drawer
    const style = document.createElement('style');
    style.innerHTML = `
        /* Cart Drawer styling */
        .cart-drawer {
            position: fixed;
            top: 0;
            right: -420px;
            width: 400px;
            height: 100vh;
            background-color: #ffffff;
            border-left: 1px solid #e0e0e0;
            box-shadow: -5px 0 25px rgba(0,0,0,0.15);
            z-index: 100000;
            transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            color: #000000;
            font-family: 'Kumbh Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            box-sizing: border-box;
        }
        .cart-drawer.open {
            right: 0;
        }
        .cart-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.4);
            opacity: 0;
            pointer-events: none;
            z-index: 99999;
            transition: opacity 0.3s ease;
        }
        .cart-overlay.open {
            opacity: 1;
            pointer-events: auto;
        }
        
        /* Header */
        .cart-header {
            padding: 24px;
            border-bottom: 1px solid #eeeeee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .cart-header h2 {
            margin: 0;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
            color: #000;
        }
        .cart-close-btn {
            background: none;
            border: none;
            color: #888;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            transition: color 0.2s ease;
            line-height: 1;
        }
        .cart-close-btn:hover {
            color: #000000;
        }
        
        /* Items List */
        .cart-items {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .cart-item {
            display: flex;
            gap: 16px;
            align-items: center;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 20px;
        }
        .cart-item-img {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 4px;
            background-color: #f7f7f7;
            border: 1px solid #e0e0e0;
            flex-shrink: 0;
        }
        .cart-item-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .cart-item-title {
            margin: 0;
            font-size: 15px;
            font-weight: 500;
            letter-spacing: 0.5px;
            color: #000;
        }
        .cart-item-subtitle {
            margin: 0;
            font-size: 11px;
            color: #888;
            text-transform: uppercase;
        }
        .cart-item-price {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: #000000;
        }
        
        /* Quantity Controls */
        .cart-item-controls {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 6px;
        }
        .cart-qty-btn {
            background: #f7f7f7;
            border: 1px solid #e0e0e0;
            color: #000;
            width: 24px;
            height: 24px;
            cursor: pointer;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            line-height: 1;
            transition: background 0.2s;
        }
        .cart-qty-btn:hover {
            background: #e0e0e0;
        }
        .cart-qty-num {
            font-size: 14px;
            width: 16px;
            text-align: center;
            color: #000;
        }
        .cart-remove-btn {
            background: none;
            border: none;
            color: #ff3333;
            font-size: 12px;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .cart-remove-btn:hover {
            opacity: 1;
        }
        
        /* Empty State */
        .cart-empty {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            color: #888;
            gap: 12px;
        }
        .cart-empty-icon {
            font-size: 40px;
        }
        
        /* Footer */
        .cart-footer {
            padding: 24px;
            border-top: 1px solid #eeeeee;
            display: flex;
            flex-direction: column;
            gap: 16px;
            background-color: #fbfbfb;
        }
        .cart-total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .cart-total-label {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #666;
        }
        .cart-total-val {
            font-size: 18px;
            font-weight: 700;
            color: #000000;
        }
        .cart-checkout-btn {
            background-color: #000000;
            color: #ffffff;
            border: none;
            padding: 16px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
            border-radius: 4px;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
        }
        .cart-checkout-btn:hover {
            background-color: #222222;
        }
        .cart-checkout-btn:active {
            transform: scale(0.98);
        }
        
        /* Notification badge */
        .cart-badge {
            position: absolute;
            top: -6px;
            right: -6px;
            background-color: #000000;
            color: #ffffff;
            font-size: 10px;
            font-weight: bold;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
            pointer-events: none;
            z-index: 10;
        }

        /* Suppress Frameship paywall / Framer internal cart modals */
        #frameship-cart-portal,
        .framer-fWanr,
        [id="frameship-cart-portal"],
        .frameship-contents {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }
    `;
    document.head.appendChild(style);

    // Helper: Normalize image path to root relative
    function normalizeImgPath(path) {
        if (!path) return '';
        return path.replace(/^(\.\.\/|\.\/)+/, '/');
    }

    // Cart State Management
    function getStoredCart() {
        try {
            const saved = localStorage.getItem('fourth_kind_cart');
            return saved ? JSON.parse(saved) : [];
        } catch(e) {
            return [];
        }
    }

    function saveStoredCart(cart) {
        try {
            localStorage.setItem('fourth_kind_cart', JSON.stringify(cart));
        } catch(e) {}
        updateBadge();
    }

    // Insert DOM Elements
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);

    const drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    drawer.innerHTML = `
        <div class="cart-header">
            <h2>Shopping Cart</h2>
            <button class="cart-close-btn" id="cartClose">&times;</button>
        </div>
        <div class="cart-items" id="cartItemsContainer"></div>
        <div class="cart-footer">
            <div class="cart-total-row">
                <span class="cart-total-label">Total</span>
                <span class="cart-total-val" id="cartTotalVal">$0.00</span>
            </div>
            <button class="cart-checkout-btn" id="cartCheckout">Proceed to Checkout</button>
        </div>
    `;
    document.body.appendChild(drawer);

    const itemsContainer = drawer.querySelector('#cartItemsContainer');
    const totalValEl = drawer.querySelector('#cartTotalVal');
    const closeBtn = drawer.querySelector('#cartClose');
    const checkoutBtn = drawer.querySelector('#cartCheckout');

    // UI Helper Functions
    function toggleCart(isOpen) {
        if (isOpen) {
            renderCart();
            drawer.classList.add('open');
            overlay.classList.add('open');
        } else {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
        }
    }

    closeBtn.addEventListener('click', () => toggleCart(false));
    overlay.addEventListener('click', () => toggleCart(false));

    // Parse product price string to number
    function parsePrice(priceStr) {
        if (typeof priceStr === 'number') return priceStr;
        let val = String(priceStr).replace('$', '').trim();
        if (val.toUpperCase().endsWith('K')) {
            return parseFloat(val.substring(0, val.length - 1)) * 1000;
        }
        return parseFloat(val) || 0;
    }

    // Format number to currency string
    function formatPrice(num) {
        if (num >= 1000) {
            return '$' + (num / 1000).toFixed(1) + 'K';
        }
        return '$' + Number(num).toFixed(0);
    }

    // Add item to cart
    function addItem(id, name, subtitle, price, img, quantity = 1) {
        const cart = getStoredCart();
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                id: id,
                name: name,
                subtitle: subtitle,
                price: price,
                img: normalizeImgPath(img),
                quantity: quantity
            });
        }
        saveStoredCart(cart);
        toggleCart(true);
    }

    // Remove item from cart
    function removeItem(id) {
        let cart = getStoredCart();
        cart = cart.filter(item => item.id !== id);
        saveStoredCart(cart);
        renderCart();
    }

    // Update quantity
    function updateQuantity(id, change) {
        const cart = getStoredCart();
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeItem(id);
                return;
            }
            saveStoredCart(cart);
            renderCart();
        }
    }

    // Render cart items list
    function renderCart() {
        const cart = getStoredCart();
        if (cart.length === 0) {
            itemsContainer.innerHTML = `
                <div class="cart-empty">
                    <span class="cart-empty-icon">🛒</span>
                    <span>Your cart is empty</span>
                </div>
            `;
            totalValEl.innerText = '$0.00';
            return;
        }

        itemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const priceVal = parsePrice(item.price);
            const subtotal = priceVal * item.quantity;
            total += subtotal;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img class="cart-item-img" src="${normalizeImgPath(item.img)}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-subtitle">${item.subtitle}</p>
                    <p class="cart-item-price">${item.price}</p>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn decrease-qty" data-id="${item.id}">-</button>
                        <span class="cart-qty-num">${item.quantity}</span>
                        <button class="cart-qty-btn increase-qty" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-remove-btn remove-item" data-id="${item.id}">Remove</button>
            `;
            itemsContainer.appendChild(itemEl);
        });

        totalValEl.innerText = formatPrice(total);

        // Attach listeners to quantity and remove buttons
        itemsContainer.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', () => updateQuantity(btn.dataset.id, -1));
        });
        itemsContainer.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', () => updateQuantity(btn.dataset.id, 1));
        });
        itemsContainer.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => removeItem(btn.dataset.id));
        });
    }

    // Update cart notification badge in header
    function updateBadge() {
        const cart = getStoredCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.framer-1hj4sdy-container, [data-framer-name="Shopping Bag"]').forEach(bag => {
            const oldBadge = bag.querySelector('.cart-badge');
            if (oldBadge) oldBadge.remove();

            if (totalItems > 0) {
                bag.style.position = 'relative';
                const badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.innerText = totalItems;
                bag.appendChild(badge);
            }
        });
    }

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        const cart = getStoredCart();
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }
        alert('Thank you for your order! Checkout process simulation complete.');
        saveStoredCart([]);
        toggleCart(false);
    });

    // Capture-phase global click delegation for shopping cart and internal link navigation
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.cart-drawer')) return;

        // 1. Intercept Shopping Cart button clicks
        const cartTrigger = target.closest(
            '.framer-1hj4sdy-container, [data-framer-name="Shopping Bag"], [name="Shopping Bag"], .framer-SBvaW, .framer-x7pb3g-container, .cart-icon-btn, .header-cart-btn'
        );

        if (cartTrigger) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            toggleCart(true);
            return;
        }

        // 2. Intercept ANY internal navigation link to bypass Framer React Router hijack
        const link = target.closest('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript:') && !link.target) {
                if (!href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('//') && !href.startsWith('mailto:')) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    window.location.href = href;
                }
            }
        }
    }, true);

    // Inject CSS for Vector Logo and brand header across all pages
    const logoStyles = document.createElement('style');
    logoStyles.id = 'vector-brand-logo-styles';
    logoStyles.innerHTML = `
        /* Prevent logo and brand text collision on V1 & all pages */
        .framer-SmLyV.framer-tklrn2,
        .header-logo-link {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 12px !important;
            text-decoration: none !important;
            cursor: pointer !important;
            flex-shrink: 0 !important;
            max-width: 100% !important;
        }

        .framer-SmLyV .framer-hmafz8,
        .header-logo-icon-wrap {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 28px !important;
            height: 28px !important;
            min-width: 28px !important;
            flex-shrink: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
        }

        .brand-logo-img, .header-logo-icon, .framer-hmafz8 img {
            width: 28px !important;
            height: 28px !important;
            min-width: 28px !important;
            object-fit: contain !important;
            display: block !important;
            transition: filter 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        /* Keep THE FOURTH KIND brand text visible in split screen & mobile */
        .framer-SmLyV .framer-1m4kwh8 {
            display: flex !important;
            align-items: center !important;
            flex-shrink: 0 !important;
        }

        .framer-SmLyV .framer-1m4kwh8 p,
        .framer-SmLyV .framer-text {
            font-family: 'Kumbh Sans', sans-serif !important;
            font-size: clamp(16px, 1.8vw, 24px) !important;
            font-weight: 300 !important;
            letter-spacing: 0.5px !important;
            white-space: nowrap !important;
            margin: 0 !important;
            line-height: 1.2 !important;
        }

        /* Navbar Inversion over White Section */
        .navbar-on-white .brand-logo-img,
        .navbar-on-white .header-logo-icon,
        .navbar-on-white .framer-hmafz8 img,
        .framer-14gypjf-container.navbar-on-white .framer-hmafz8 img {
            filter: invert(1) !important;
        }
    `;
    document.head.appendChild(logoStyles);

    function initBrandLogo() {
        const logoContainers = document.querySelectorAll('.framer-hmafz8');
        logoContainers.forEach(container => {
            if (!container.querySelector('.brand-logo-img')) {
                container.innerHTML = '';
                const img = document.createElement('img');
                img.className = 'brand-logo-img';
                const depth = window.location.pathname.split('/').filter(Boolean).length;
                const prefix = depth > 0 ? '../'.repeat(depth) : './';
                img.src = prefix + 'assits/logo/Vector.png';
                img.alt = 'The Fourth Kind Logo';
                container.appendChild(img);
            }
        });
    }

    // Initial badge & logo update
    function initOnLoad() {
        updateBadge();
        initBrandLogo();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnLoad);
    } else {
        initOnLoad();
    }
    window.addEventListener('load', () => {
        updateBadge();
        initBrandLogo();
    });

    // Periodically ensure logo is maintained even if React hydrates
    setTimeout(initBrandLogo, 200);
    setTimeout(initBrandLogo, 600);
    setTimeout(initBrandLogo, 1500);

    // Export AddToCart helper globally
    window.AddToCart = function(id, name, subtitle, price, img, quantity) {
        addItem(id, name, subtitle, price, img, quantity);
    };

    // Export cart opener globally
    window.openCustomCart = function() {
        toggleCart(true);
    };
})();
