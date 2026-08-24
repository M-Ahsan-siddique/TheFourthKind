// Shopping Cart System for The Fourth Kind
(function() {
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
            z-index: 10000;
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
            z-index: 9999;
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
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
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
        }
    `;
    document.head.appendChild(style);

    // Initial state
    let cart = [];
    try {
        const savedCart = localStorage.getItem('fourth_kind_cart');
        if (savedCart) cart = JSON.parse(savedCart);
    } catch(e) {
        console.error("Failed to load cart data:", e);
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

    const itemsContainer = document.getElementById('cartItemsContainer');
    const totalValEl = document.getElementById('cartTotalVal');
    const closeBtn = document.getElementById('cartClose');

    // UI Helper Functions
    function toggleCart(isOpen) {
        if (isOpen) {
            drawer.classList.add('open');
            overlay.classList.add('open');
            renderCart();
        } else {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
        }
    }

    // Close listeners
    closeBtn.addEventListener('click', () => toggleCart(false));
    overlay.addEventListener('click', () => toggleCart(false));

    // Save cart state
    function saveCart() {
        localStorage.setItem('fourth_kind_cart', JSON.stringify(cart));
        updateBadge();
    }

    // Parse product price string to number
    function parsePrice(priceStr) {
        let val = priceStr.replace('$', '').trim();
        if (val.toUpperCase().endsWith('K')) {
            return parseFloat(val.substring(0, val.length - 1)) * 1000;
        }
        return parseFloat(val);
    }

    // Format number to currency string
    function formatPrice(num) {
        if (num >= 1000) {
            return '$' + (num / 1000).toFixed(1) + 'K';
        }
        return '$' + num;
    }

    // Add item to cart
    function addItem(id, name, subtitle, price, img, quantity = 1) {
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ id, name, subtitle, price, img, quantity });
        }
        saveCart();
        toggleCart(true);
    }

    // Remove item from cart
    function removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
    }

    // Update quantity
    function updateQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeItem(id);
            } else {
                saveCart();
                renderCart();
            }
        }
    }

    // Render cart items list
    function renderCart() {
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
                <img class="cart-item-img" src="${item.img}" alt="${item.name}">
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

        // Attach listeners to items controls
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', () => updateQuantity(btn.dataset.id, -1));
        });
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', () => updateQuantity(btn.dataset.id, 1));
        });
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => removeItem(btn.dataset.id));
        });
    }

    // Update cart notification badge in header
    function updateBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('[data-framer-name="Shopping Bag"]').forEach(bag => {
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

    // Checkout alert
    document.getElementById('cartCheckout').addEventListener('click', () => {
        alert('Thank you for your order! Checkout process simulation complete.');
        cart = [];
        saveCart();
        toggleCart(false);
    });

    // Initialize Header Cart Buttons and intercept product link transitions
    setTimeout(() => {
        document.querySelectorAll('[data-framer-name="Shopping Bag"]').forEach(bag => {
            bag.style.cursor = 'pointer';
            bag.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCart(true);
            });
        });
        
        // Force direct page reload for product links to bypass React routing intercept
        document.querySelectorAll('a[href*="shop/"], a[href*="contact/"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = link.getAttribute('href');
            }, true); // Use capture phase to intercept before React router
        });
        
        updateBadge();
    }, 1000);

    // Export AddToCart helper globally
    window.AddToCart = function(id, name, subtitle, price, img, quantity) {
        addItem(id, name, subtitle, price, img, quantity);
    };
})();
