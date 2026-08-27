// Master-Detail Shared Layout Animation for Coffee Origins
// The Fourth Kind — Coffee Terroir & Origin Exploration

(function() {
    'use strict';

    // 1. ORIGIN DATA SCHEMA & DATASET
    const ORIGINS_DATA = {
        'ethiopian-origin': {
            id: 'ethiopian-origin',
            productKey: 'double-pendant-necklace',
            name: 'Aurora Protocol',
            originTitle: 'Ethiopian Origin',
            subtitle: 'Single Origin Heirloom',
            country: 'Ethiopia',
            flag: '🇪🇹',
            region: 'Yirgacheffe, Gedeo Highlands',
            altitude: '1,900 – 2,200m',
            altitudePercent: 92,
            altitudeDesc: 'High-Altitude Misty Alpine Volcanic Soil',
            process: 'Washed · African Raised Sun Beds',
            roastLevel: 'Light – Medium',
            roastDots: 2, // out of 5
            price: '$1.1K',
            flavorNotes: ['Bergamot', 'Lemon Blossom', 'Wild Honey', 'Jasmine Tea', 'Peach Nectar'],
            description: 'Nestled in the misty high-altitude plateaus of Yirgacheffe, ancient heirloom varieties flourish in fertile volcanic loam. Hand-harvested at peak brix, cherries are gently de-pulped, fermented in spring water, and dried on shaded African beds. Yields an exquisite tea-like elegance with vibrant floral aromatics and lingering sweet honey nectar.',
            coordinates: '6.1629° N, 38.2058° E',
            harvestSeason: 'November – January',
            variety: 'Heirloom Ethiopian Typica (Kurume & Dega)',
            acidity: 'High / Crisp Citrus',
            body: 'Silky & Delicate',
            accentColor: '#D4A373',
            accentGlow: 'rgba(212, 163, 115, 0.25)',
            mediaUrl: '/site-assets/images/first_coffee.png',
            bgPhoto: '/site-assets/images/GcYwhsR3AxAPP83jIFGm7LROKDU.jpg',
            productPageUrl: 'shop/double-pendant-necklace/index.html'
        },
        'brazilian-origin': {
            id: 'brazilian-origin',
            productKey: 'charm-link-bracelet',
            name: 'Event Horizon',
            originTitle: 'Brazilian Origin',
            subtitle: 'Sun-Cured Estate Micro-Lot',
            country: 'Brazil',
            flag: '🇧🇷',
            region: 'Cerrado Mineiro, Minas Gerais',
            altitude: '1,100 – 1,400m',
            altitudePercent: 62,
            altitudeDesc: 'Highland Savanna Sun-Drenched Terroir',
            process: 'Natural · Sun-Cured Patio Fermentation',
            roastLevel: 'Medium – Dark',
            roastDots: 4,
            price: '$1.1K',
            flavorNotes: ['Dark Chocolate', 'Toasted Hazelnut', 'Cane Sugar', 'Caramel Fudge', 'Roasted Almond'],
            description: 'Cultivated across the sun-drenched volcanic plateaus of Cerrado Mineiro, where consistent climate and distinct dry harvest seasons allow whole cherries to naturally cure on expansive brick patios. Delivers profound velvety mouthfeel, deep bittersweet cocoa complexity, and a luxurious hazelnut praline finish.',
            coordinates: '18.9186° S, 48.2772° W',
            harvestSeason: 'May – August',
            variety: 'Yellow Bourbon & Mundo Novo',
            acidity: 'Low / Smooth Round',
            body: 'Heavy & Velvety',
            accentColor: '#2ECC71',
            accentGlow: 'rgba(46, 204, 113, 0.25)',
            mediaUrl: '/site-assets/images/second_coffee.png',
            bgPhoto: '/site-assets/images/JrcX0HaQhQ36bO1hTj1SpMOI9d0.jpg',
            productPageUrl: 'shop/charm-link-bracelet/index.html'
        },
        'colombian-origin': {
            id: 'colombian-origin',
            productKey: 'teardrop-dangle-earrings',
            name: 'Nebula Drift',
            originTitle: 'Colombian Origin',
            subtitle: 'Anaerobic Reserve Lot',
            country: 'Colombia',
            flag: '🇨🇴',
            region: 'Huila, San Agustín Andean Slopes',
            altitude: '1,650 – 1,980m',
            altitudePercent: 82,
            altitudeDesc: 'Precipitous Andean Mountain Slope Terroir',
            process: '72hr Anaerobic Cold Fermentation',
            roastLevel: 'Medium Roast',
            roastDots: 3,
            price: '$850',
            flavorNotes: ['Dark Cherry', 'Cocoa Nibs', 'Brown Sugar', 'Black Currant', 'Spiced Plum'],
            description: 'Perched on the steep Andean ridges of San Agustín, Huila, this micro-lot benefits from extreme diurnal temperature shifts. After selective hand-picking, whole cherries undergo sealed anaerobic maceration for 72 hours before slow drying under parabolic canopies, producing a dense, wine-like fruit complexity with dark cocoa and rich brown sugar finish.',
            coordinates: '1.8795° N, 76.2690° W',
            harvestSeason: 'October – February',
            variety: 'Castillo & Pink Bourbon',
            acidity: 'Medium-High / Juicy Berry',
            body: 'Round & Syrupy',
            accentColor: '#E74C3C',
            accentGlow: 'rgba(231, 76, 60, 0.25)',
            mediaUrl: '/site-assets/images/third_coffee.png',
            bgPhoto: '/site-assets/images/NEEsxWV5lydRvranaCcqiAhxmHw.jpg',
            productPageUrl: 'shop/teardrop-dangle-earrings/index.html'
        }
    };

    // 2. INJECT CSS FOR MASTER-DETAIL SHARED LAYOUT ANIMATION
    const styleEl = document.createElement('style');
    styleEl.id = 'origins-master-detail-styles';
    styleEl.innerHTML = `
        /* Cursor pointer and card hover lift for origin cards */
        .fk-oxezyj a,
        [data-fk-name="Collections"] a {
            cursor: pointer !important;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Backdrop Overlay */
        .origin-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.82);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 99990;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .origin-backdrop.active {
            opacity: 1;
            pointer-events: auto;
        }

        /* Master-Detail Expanded Dialog Container */
        .origin-modal-container {
            position: fixed;
            inset: 0;
            z-index: 99995;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            pointer-events: none;
            box-sizing: border-box;
        }
        .origin-modal-container.active {
            pointer-events: auto;
        }

        /* Shared-element Morphing Card */
        .origin-detail-card {
            position: relative;
            width: 100%;
            max-width: 960px;
            max-height: 90vh;
            background: #0d0d0d;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px -10px var(--origin-glow, rgba(255, 255, 255, 0.1));
            overflow-y: auto;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            color: #ffffff;
            font-family: 'Kumbh Sans', 'Inter', -apple-system, sans-serif;
            opacity: 0;
            transform: scale(0.92) translateY(20px);
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform, opacity;
            box-sizing: border-box;
        }
        .origin-detail-card.active {
            opacity: 1;
            transform: scale(1) translateY(0);
        }

        /* Custom Scrollbar for Modal */
        .origin-detail-card::-webkit-scrollbar {
            width: 6px;
        }
        .origin-detail-card::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
        }
        .origin-detail-card::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
        }

        /* Close Button */
        .origin-close-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            color: #ffffff;
            font-size: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 20;
            transition: background 0.2s, transform 0.2s, color 0.2s;
            outline: none;
        }
        .origin-close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.08);
            color: #ffffff;
        }
        .origin-close-btn:focus-visible {
            box-shadow: 0 0 0 2px var(--origin-accent, #fff);
        }

        /* Modal Inner Grid */
        .origin-detail-grid {
            display: grid;
            grid-template-columns: 1fr 1.15fr;
            min-height: 520px;
        }

        @media (max-width: 820px) {
            .origin-detail-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Left Media Showcase Column */
        .origin-media-col {
            position: relative;
            background: #141414;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 30px;
            overflow: hidden;
            border-right: 1px solid rgba(255, 255, 255, 0.08);
        }
        .origin-media-bg-glow {
            position: absolute;
            width: 280px;
            height: 280px;
            border-radius: 50%;
            background: var(--origin-glow, rgba(255, 255, 255, 0.15));
            filter: blur(60px);
            pointer-events: none;
            opacity: 0.7;
        }
        .origin-can-img {
            position: relative;
            width: 220px;
            max-width: 80%;
            height: auto;
            object-fit: contain;
            filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.8));
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 2;
        }
        .origin-can-img:hover {
            transform: scale(1.05) translateY(-4px);
        }
        .origin-coords-pill {
            margin-top: 24px;
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.6);
            background: rgba(255, 255, 255, 0.05);
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 2;
        }

        /* Right Content Column */
        .origin-content-col {
            padding: 40px;
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        @media (max-width: 580px) {
            .origin-content-col {
                padding: 24px 20px;
            }
        }

        /* Header info */
        .origin-badge-row {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .origin-country-tag {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--origin-accent, #ffffff);
        }
        .origin-dot-separator {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
        }
        .origin-region-tag {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
        }
        .origin-title-main {
            font-size: 32px;
            font-weight: 300;
            letter-spacing: 2px;
            margin: 0;
            text-transform: uppercase;
            line-height: 1.15;
            color: #ffffff;
        }
        .origin-coffee-name {
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1.5px;
            color: var(--origin-accent, #ffffff);
            text-transform: uppercase;
            margin-top: -16px;
        }

        /* Terroir Stats Grid */
        .origin-stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 16px;
        }
        .origin-stat-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .origin-stat-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: rgba(255, 255, 255, 0.45);
        }
        .origin-stat-val {
            font-size: 13px;
            font-weight: 600;
            color: #ffffff;
        }

        /* Altitude Gauge */
        .origin-altitude-box {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .origin-altitude-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
        }
        .origin-altitude-title {
            color: rgba(255, 255, 255, 0.6);
            text-transform: uppercase;
            font-size: 10px;
            letter-spacing: 1.5px;
        }
        .origin-altitude-meter {
            color: #ffffff;
            font-weight: 600;
        }
        .origin-altitude-bar-wrap {
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 3px;
            overflow: hidden;
        }
        .origin-altitude-bar-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #666666, var(--origin-accent, #ffffff));
            border-radius: 3px;
            transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }

        /* Roast Level Dots */
        .origin-roast-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .origin-roast-dots {
            display: flex;
            gap: 6px;
        }
        .roast-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            transition: background 0.3s;
        }
        .roast-dot.filled {
            background: var(--origin-accent, #ffffff);
            box-shadow: 0 0 8px var(--origin-glow, rgba(255, 255, 255, 0.4));
        }

        /* Flavor Tags (Staggered Children) */
        .origin-flavors-box {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .origin-flavors-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: rgba(255, 255, 255, 0.45);
        }
        .origin-flavor-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .origin-flavor-pill {
            font-size: 12px;
            padding: 6px 14px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            color: #ffffff;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s;
        }
        .origin-flavor-pill:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--origin-accent, rgba(255, 255, 255, 0.3));
        }
        .origin-detail-card.active .origin-flavor-pill {
            opacity: 1;
            transform: translateY(0);
        }

        /* Narrative Story */
        .origin-story-text {
            font-size: 13px;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.7);
            margin: 0;
        }

        /* Bottom Actions */
        .origin-actions-row {
            display: flex;
            gap: 14px;
            margin-top: auto;
            padding-top: 10px;
        }
        .origin-cta-cart {
            flex: 1;
            background: #ffffff;
            color: #000000;
            border: none;
            padding: 14px 20px;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        .origin-cta-cart:hover {
            background: #f0f0f0;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 255, 255, 0.15);
        }
        .origin-cta-product {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #ffffff;
            padding: 14px 20px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            border-radius: 8px;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s, border-color 0.2s;
        }
        .origin-cta-product:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
        }
    `;
    document.head.appendChild(styleEl);

    // 3. CREATE MASTER-DETAIL MODAL DOM STRUCTURE
    const backdrop = document.createElement('div');
    backdrop.className = 'origin-backdrop';
    document.body.appendChild(backdrop);

    const modalContainer = document.createElement('div');
    modalContainer.className = 'origin-modal-container';
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-modal', 'true');
    modalContainer.setAttribute('aria-labelledby', 'originModalTitle');
    modalContainer.innerHTML = `
        <div class="origin-detail-card" id="originDetailCard">
            <button class="origin-close-btn" id="originCloseBtn" aria-label="Close Origin Experience">&times;</button>
            <div class="origin-detail-grid" id="originDetailGrid">
                <!-- Dynamically Populated by showOriginDetail() -->
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);

    const cardEl = document.getElementById('originDetailCard');
    const gridEl = document.getElementById('originDetailGrid');
    const closeBtn = document.getElementById('originCloseBtn');

    // 4. STATE MANAGEMENT & ACTIVE SELECTION
    let selectedOriginId = null;
    let lastFocusedElement = null;

    function getOriginDataById(id) {
        return ORIGINS_DATA[id] || null;
    }

    // Resolve Origin ID from clicked target or href
    function resolveOriginIdFromElement(el) {
        if (!el) return null;
        const href = el.getAttribute('href') || '';
        const text = (el.textContent || '').toLowerCase();

        if (href.includes('minimalist-elegance') || text.includes('ethiop') || text.includes('euthop') || text.includes('aurora')) {
            return 'ethiopian-origin';
        }
        if (href.includes('bridal-bliss') || text.includes('brazil') || text.includes('event horizon')) {
            return 'brazilian-origin';
        }
        if (href.includes('timeless-classics') || text.includes('colomb') || text.includes('nebula')) {
            return 'colombian-origin';
        }
        return null;
    }

    // 5. MASTER-DETAIL SHARED ELEMENT EXPANSION ANIMATION
    function openOriginDetail(originId, triggerElement) {
        const data = getOriginDataById(originId);
        if (!data) return;

        selectedOriginId = originId;
        lastFocusedElement = triggerElement || document.activeElement;

        // Apply theme colors
        cardEl.style.setProperty('--origin-accent', data.accentColor);
        cardEl.style.setProperty('--origin-glow', data.accentGlow);

        // Generate roast level dots HTML
        let roastDotsHtml = '';
        for (let i = 1; i <= 5; i++) {
            roastDotsHtml += `<span class="roast-dot ${i <= data.roastDots ? 'filled' : ''}"></span>`;
        }

        // Generate staggered flavor pills HTML
        const flavorsHtml = data.flavorNotes.map((note, idx) => {
            return `<span class="origin-flavor-pill" style="transition-delay: ${0.15 + (idx * 0.06)}s">${note}</span>`;
        }).join('');

        // Build Inner Detail Content
        gridEl.innerHTML = `
            <div class="origin-media-col">
                <div class="origin-media-bg-glow"></div>
                <img src="${data.mediaUrl}" alt="${data.name} ${data.originTitle}" class="origin-can-img">
                <span class="origin-coords-pill">${data.coordinates}</span>
            </div>
            <div class="origin-content-col">
                <div class="origin-badge-row">
                    <span class="origin-country-tag">${data.flag} ${data.country}</span>
                    <span class="origin-dot-separator"></span>
                    <span class="origin-region-tag">${data.region}</span>
                </div>

                <h2 class="origin-title-main" id="originModalTitle">${data.originTitle}</h2>
                <div class="origin-coffee-name">${data.name} &bull; ${data.subtitle}</div>

                <div class="origin-stats-grid">
                    <div class="origin-stat-item">
                        <span class="origin-stat-label">Process Method</span>
                        <span class="origin-stat-val">${data.process}</span>
                    </div>
                    <div class="origin-stat-item">
                        <span class="origin-stat-label">Harvest Period</span>
                        <span class="origin-stat-val">${data.harvestSeason}</span>
                    </div>
                    <div class="origin-stat-item">
                        <span class="origin-stat-label">Variety</span>
                        <span class="origin-stat-val">${data.variety}</span>
                    </div>
                    <div class="origin-stat-item">
                        <span class="origin-stat-label">Profile</span>
                        <span class="origin-stat-val">${data.acidity} Acidity / ${data.body}</span>
                    </div>
                </div>

                <div class="origin-altitude-box">
                    <div class="origin-altitude-header">
                        <span class="origin-altitude-title">Elevation Range</span>
                        <span class="origin-altitude-meter">${data.altitude}</span>
                    </div>
                    <div class="origin-altitude-bar-wrap">
                        <div class="origin-altitude-bar-fill" id="altitudeFillBar"></div>
                    </div>
                </div>

                <div class="origin-roast-box">
                    <span class="origin-stat-label">Roast Profile (${data.roastLevel})</span>
                    <div class="origin-roast-dots">${roastDotsHtml}</div>
                </div>

                <div class="origin-flavors-box">
                    <span class="origin-flavors-label">Distinct Terroir Notes</span>
                    <div class="origin-flavor-tags">${flavorsHtml}</div>
                </div>

                <p class="origin-story-text">${data.description}</p>

                <div class="origin-actions-row">
                    <button class="origin-cta-cart" id="originAddToCartBtn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Add to Cart &bull; ${data.price}
                    </button>
                    <a href="${data.productPageUrl}" class="origin-cta-product">Explore Lot</a>
                </div>
            </div>
        `;

        // Lock background scroll
        document.body.style.overflow = 'hidden';

        // Trigger Shared Element Animation
        backdrop.classList.add('active');
        modalContainer.classList.add('active');

        requestAnimationFrame(() => {
            cardEl.classList.add('active');
            const altitudeFill = document.getElementById('altitudeFillBar');
            if (altitudeFill) {
                setTimeout(() => {
                    altitudeFill.style.width = data.altitudePercent + '%';
                }, 100);
            }
        });

        // Wire Add to Cart button inside the expanded modal
        const addCartBtn = document.getElementById('originAddToCartBtn');
        if (addCartBtn) {
            addCartBtn.addEventListener('click', () => {
                if (window.AddToCart) {
                    window.AddToCart(
                        data.productKey,
                        data.name,
                        data.originTitle,
                        data.price,
                        data.mediaUrl,
                        1
                    );
                    closeOriginDetail();
                }
            });
        }

        // Trap focus to close button
        setTimeout(() => closeBtn.focus(), 200);
    }

    // 6. DISMISS & COLLAPSE ANIMATION
    function closeOriginDetail() {
        if (!selectedOriginId) return;

        cardEl.classList.remove('active');
        backdrop.classList.remove('active');

        setTimeout(() => {
            modalContainer.classList.remove('active');
            document.body.style.overflow = '';
            selectedOriginId = null;
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }, 350);
    }

    // 7. EVENT LISTENERS: BACKDROP, ESCAPE KEY, CLOSE BUTTON
    closeBtn.addEventListener('click', closeOriginDetail);
    backdrop.addEventListener('click', closeOriginDetail);

    // Escape Key Listener
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && selectedOriginId) {
            closeOriginDetail();
        }
    });

    // 8. GLOBAL CAPTURE INTERCEPTOR FOR ORIGIN CARDS & COLLECTION LINKS
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        // Check if inside modal
        if (e.target.closest('.origin-modal-container') || e.target.closest('.cart-drawer')) return;

        const originId = resolveOriginIdFromElement(link);
        if (originId) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            openOriginDetail(originId, link);
        }
    }, true); // Capture phase - fires before FK navigation

    // Export globally for external calls
    window.openOriginExperience = function(originId) {
        openOriginDetail(originId, null);
    };

})();
