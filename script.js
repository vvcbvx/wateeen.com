
const API_URL = 'https://api.jsonbin.io/v3/b/67e0f6bd8960c979a5773e65'; // استبدل YOUR_BIN_ID بـ Bin ID الخاص بك
const API_KEY = '$2a$10$y4mNOprJ8lAMY0xM8KfYTuehMVndGcLtG2f83auImdb6Oa/wmXGEC'; // استبدل YOUR_API_KEY بمفتاح API الخاص بك

const productsData = [
  { 
    id: 1,
    name: "ببسي",
    price: 0.75,
    images: [
      "pepse.jpg",
      "pepse1.jpg",
    



    ],
    description: "مشروب غازي منعش بنكهة الكولا الأصلية",
    category: "عصائر",
    available: true,
    ratings: [
      { author: "أحمد", rating: 5, text: "طعم رائع وجودة عالية" },
      { author: "سارة", rating: 4, text: "منعش ولكن يحتوي على سكر" }
    ],
    wishlist: false,
    features: ["حجم 330 مل", "خالي من الكافيين"]
  },
  { 
    id: 2,
    name: "جالكسي",
    price: 2.50,
    images: [
      "glks.jpg",
      "glks1.jpg",
     
      "glks2.jpg"
    ],
    description: "شوكولاتة كريمية فاخرة بالحليب",
    category: "حلويات",
    available: true,
    ratings: [
      { author: "ليلى", rating: 5, text: "أفضل شوكولاتة تذوقتها" }
    ],
    wishlist: false,
    features: ["وزن 45 جرام", "منتج طبيعي"]
  },
  { 
    id: 3,
    name: "ميرندا برتقال",
    price: 0.80,
    images: [
      "merorg.jpg",
      
    
    
    ],
    description: "مشروب غازي بنكهة البرتقال الطبيعي",
    category: "عصائر",
    available: true,
    ratings: [],
    wishlist: false,
    features: ["حجم 250 مل", "نسبة عصير 10%"]
  },
  { 
    id: 4,
    name: "ميلكا شوكولاتة",
    price: 3.25,
    images: [
      "melka.jpg",
   
    ],
    description: "شوكولاتة سويسرية فاخرة بالحليب الكامل",
    category: "حلويات",
    available: false,
    ratings: [
      { author: "خالد", rating: 5, text: "ناعمة وذوبان رائع" },
      { author: "نورا", rating: 4, text: "حلوة أكثر من اللازم" }
    ],
    wishlist: false,
    features: ["وزن 100 جرام", "خالي من الجلوتين"]
  },

  { 
    id: 5,
    name: "بهارات شاورما",
    price: 17.50, // السعر للكيلو
    images: ["بهارات.jpg"],
    description: "خليط بهارات الشاورما اللذيذ",
    category: "بهارات",
    available: true,
    sellByWeight: true,
    weightOptions: [
      { weight: 100, label: "100 غرام" },
      { weight: 500, label: "نصف كيلو" },
      { weight: 1000, label: "1 كيلو" }
    ],
    features: ["خليط متكامل", "مناسب لجميع اللحوم"]
  },



  { 
    id: 6,
    name: "غرفة ",
    price: 1.5, // السعر لكل 100 غرام
    images: ["بهارات.jpg"],
    description: "خليط بهارات الشاورما اللذيذ",
    category: "بهارات",
    available: true,
    sellByWeight: true,
    weightOptions: [
      { weight: 100, label: "100 غرام" },
      { weight: 250, label: "250 غرام" },
      { weight: 500, label: "نصف كيلو" },
      { weight: 1000, label: "1 كيلو" }
    ],
    features: ["والحلويات ", "  تلذذ بها مع الشاي "]
  },








   
// طلب الإذن لعرض الإشعارات إذا لم يكن مسموحاً بعد
];

// دالة لخلط المصفوفة عشوائياً (Fisher-Yates shuffle)

// دالة خلط المصفوفة عشوائياً (Fisher-Yates algorithm)


// دالة العرض الرئيسية مع تأثيرات الظهور






//         علاقات المنتجات للتوصيات الذكية
        const productRelationships = {
            1: [2, 3], // الهيل مع القرفة والقهوة
            2: [1, 3], // القرفة مع الهيل والقهوة
            3: [1, 2, 4], // القهوة مع الهيل والقرفة والكعك
            4: [3] // الكعك مع القهوة
        };

        // ============== إعدادات المتجر ==============
// ============== إعدادات المتجر ==============
let currentSlideIndexes = {}

let exchangeRate = null; // لن يتم استخدام القيم المحلية بعد الآن
let password = ""; // سيتم جلبها من السحابة
        let isDarkMode = localStorage.getItem('darkMode') === 'true';
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        let completedInvoices = JSON.parse(localStorage.getItem('completedInvoices')) || [];
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

        // ============== تهيئة المتجر ==============


// === الدوال المساعدة ===







async function initApp() {
    try {
        // 1. عرض شاشة التحميل
        showLoading(true);
        
        // 2. طلب إذن الإشعارات (بدون انتظار)
        if (Notification.permission !== "granted") {
            Notification.requestPermission().catch(e => {
                console.error("فشل في طلب إذن الإشعارات:", e);
            });
        }

        // 3. جلب البيانات الأساسية
        await Promise.all([
            fetchExchangeRate(),
            loadProducts()
        ]);

        // 4. تهيئة الواجهة
        displayProducts(productsData);
        updateCartUI();
        updateInvoicesUI();
        generateRecommendations();
        
        // 5. عرض قسم المنتجات فقط في البداية
        showSection("products");
        
        // 6. إخفاء شاشة التحميل
        showLoading(false);

    } catch (error) {
        console.error("خطأ في تهيئة التطبيق:", error);
        
        // استخدام البيانات المحلية كحل بديل
        exchangeRate = localStorage.getItem('lastExchangeRate') || 5000;
        displayProducts(productsData);
        showSection("products");
        showLoading(false);
        
        showNotification("حدث خطأ في التحميل، جاري استخدام البيانات المحلية", "warning");
    }
}

// دالة مساعدة لعرض/إخفاء شاشة التحميل
function showLoading(show) {
    const loadingContainer = document.getElementById('loadingContainer');
    if (loadingContainer) {
        if (show) {
            loadingContainer.style.display = 'flex';
            loadingContainer.style.opacity = '1';
        } else {
            loadingContainer.style.opacity = '0';
            setTimeout(() => {
                loadingContainer.style.display = 'none';
            }, 500);
        }
    }
}

// دالة مساعدة لجلب المنتجات
async function loadProducts() {
    try {
        // يمكنك هنا جلب المنتجات من API إذا كنت تستخدم واحدة
        // const response = await fetch('your-api-endpoint');
        // productsData = await response.json();
        
        // في هذا المثال نستخدم البيانات المحلية
        return Promise.resolve();
    } catch (error) {
        console.error("خطأ في جلب المنتجات:", error);
        throw error;
    }
}






function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    const itemCount = Object.keys(cart).reduce((sum, id) => sum + cart[id].quantity, 0);
    
    // إزالة أي شارة موجودة مسبقاً
    const existingBadge = cartIcon.querySelector('.cart-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // إذا كان هناك عناصر في السلة، أضف شارة العدد
    if (itemCount > 0) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = itemCount;
        badge.style.cssText = `
            position: absolute;
            top: -5px;
            left: -5px;
            background-color: var(--secondary-color);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.7rem;
            font-weight: bold;
        `;
        cartIcon.appendChild(badge);
    }
}





        // ============== نظام التحميل ==============
        function simulateProgress() {
            const bar = document.getElementById('progressBar');
            let width = 0;
            const interval = setInterval(() => {
                width += 2;
                bar.style.width = width + '%';
                if (width >= 100) clearInterval(interval);
            }, 50);
        }

        // ============== عرض المنتجات ==============
        function displayProducts(products) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products" style="grid-column:1/-1; text-align:center; padding:2rem;">
                <i class="fas fa-box-open" style="font-size:2rem; color:var(--primary-color);"></i>
                <p style="margin-top:1rem;">لا توجد منتجات متاحة حالياً</p>
            </div>
        `;
        return;
    }

    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.className = `product ${!product.available ? 'unavailable' : ''}`;
        productDiv.setAttribute("data-id", product.id);
        productDiv.style.animationDelay = `${index * 0.1}s`;

        // حساب الأسعار (بالدولار والليرة السورية)
        let priceHTML, actionButton;
        
        if (product.sellByWeight) {
            // حساب الأسعار للمنتجات المباعة بالوزن
            const pricePer100g = (product.price / 10).toFixed(2);
            const pricePer100gLira = Math.round(product.price * (exchangeRate || 5000) / 10);
            const pricePerKiloLira = Math.round(product.price * (exchangeRate || 5000));

            priceHTML = `
                <div class="price-container">
                    <div class="price-row">
                        <span class="price-label">سعر الكيلو:</span>
                        <span class="price-value">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="price-row">
                        <span class="price-label">100 غرام:</span>
                        <span class="price-value">$${pricePer100g}</span>
                    </div>
                    <div class="syp-price">
                        <span>${pricePer100gLira} - ${pricePerKiloLira} ل.س</span>
                    </div>
                </div>
            `;

            actionButton = `
                <button onclick="showQuickView(${product.id})" ${!product.available ? 'disabled' : ''}>
                    <i class="fas fa-weight-hanging"></i> اختر الوزن
                </button>
            `;
        } else {
            // المنتجات العادية
            const priceLira = Math.round(product.price * (exchangeRate || 5000));
            
            priceHTML = `
                <div class="price-container">
                    <div class="price-row">
                        <span class="price-label">السعر:</span>
                        <span class="price-value">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="syp-price">
                        <span>${priceLira} ل.س</span>
                    </div>
                </div>
            `;

            actionButton = `
                <button onclick="addToCart(${product.id})" ${!product.available ? 'disabled' : ''}>
                    <i class="fas fa-cart-plus"></i> أضف للسلة
                </button>
            `;
        }

        productDiv.innerHTML = `
            <div class="product-header">
                <button class="wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}" 
                        onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
                ${!product.available ? '<span class="product-badge">غير متوفر</span>' : ''}
                ${product.sellByWeight ? '<span class="weight-badge"><i class="fas fa-weight-hanging"></i> بالوزن</span>' : ''}
            </div>
            
            <div class="product-image-container">
                ${createImageGallery(product.images || ['default-product.jpg'], product.id).outerHTML}
            </div>
            
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="category">${product.category}</div>
                
                ${priceHTML}
                
                ${product.features && product.features.length > 0 ? `
                    <div class="product-features">
                        <h4>مميزات المنتج:</h4>
                        <ul>
                            ${product.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="product-actions">
                    ${actionButton}
                    <button class="secondary" onclick="showQuickView(${product.id})">
                        <i class="fas fa-eye"></i> معاينة سريعة
                    </button>
                </div>
            </div>
        `;

        productsContainer.appendChild(productDiv);
    });

    // إعادة ربط أحداث معرض الصور
    setTimeout(() => {
        document.querySelectorAll('.gallery-nav').forEach(btn => {
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr) {
                btn.onclick = null;
                const match = onclickAttr.match(/changeSlide\((\d+),\s*(-?\d+)\)/);
                if (match) {
                    const productId = parseInt(match[1]);
                    const direction = parseInt(match[2]);
                    btn.addEventListener('click', () => changeSlide(productId, direction));
                }
            }
        });
        
        document.querySelectorAll('.gallery-dots .dot').forEach(dot => {
            const onclickAttr = dot.getAttribute('onclick');
            if (onclickAttr) {
                dot.onclick = null;
                const match = onclickAttr.match(/goToSlide\((\d+),\s*(\d+)\)/);
                if (match) {
                    const productId = parseInt(match[1]);
                    const slideIndex = parseInt(match[2]);
                    dot.addEventListener('click', () => goToSlide(productId, slideIndex));
                }
            }
        });
    }, 100);
}
// دالة مساعدة لإنشاء معرض الصور
function createImageGallery(images, productId) {
    const gallery = document.createElement('div');
    gallery.className = 'product-gallery';
    
    // تهيئة الفهرس إذا لم يكن موجوداً
    if (currentSlideIndexes[productId] === undefined) {
        currentSlideIndexes[productId] = 0;
    }

    gallery.innerHTML = `
        <div class="gallery-container">
            ${images.map((img, index) => `
                <div class="gallery-slide ${index === currentSlideIndexes[productId] ? 'active' : ''}">
                    <img src="${img}" alt="صورة المنتج" loading="lazy" onclick="zoomImage('${img}', ${productId})">
                </div>
            `).join('')}
        </div>
        
        ${images.length > 1 ? `
            <button class="gallery-nav prev" onclick="changeSlide(${productId}, -1)">
                <i class="fas fa-chevron-right"></i>
            </button>
            <button class="gallery-nav next" onclick="changeSlide(${productId}, 1)">
                <i class="fas fa-chevron-left"></i>
            </button>
            
            <div class="gallery-dots">
                ${images.map((_, index) => `
                    <span class="dot ${index === currentSlideIndexes[productId] ? 'active' : ''}" 
                          onclick="goToSlide(${productId}, ${index})"></span>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    return gallery;
}

// دالة مساعدة لإنشاء عناصر التقييم
function createRatingStars(product) {
    const avgRating = product.ratings?.length > 0 
        ? product.ratings.reduce((sum, r) => sum + r.rating, 0) / product.ratings.length 
        : 0;
    
    return `
        <div class="rating-container">
            <div class="stars">
                ${[1, 2, 3, 4, 5].map(i => `
                    <i class="fas fa-star ${i <= Math.round(avgRating) ? 'active' : ''}" 
                       onclick="rateProduct(${product.id}, ${i})"></i>
                `).join('')}
            </div>
            <div class="rating-info">
                <span class="average">${avgRating.toFixed(1)}</span>
                <span class="count">(${product.ratings?.length || 0} تقييم)</span>
            </div>
        </div>
    `;
}
        // ============== نظام التوصيات الذكية ==============
        function generateRecommendations() {
            const recommendationsList = document.getElementById("recommendationsList");
            
            if (purchaseHistory.length === 0) {
                // إذا لم يكن هناك مشتريات سابقة، نعرض منتجات عشوائية
                const shuffledProducts = [...productsData]
                    .filter(p => p.available)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                
                if (shuffledProducts.length > 0) {
                    let recommendationsHTML = '';
                    shuffledProducts.forEach(product => {
                        recommendationsHTML += `
                            <div class="recommendation-item" onclick="addToCart(${product.id})">
                                <img src="${product.image}" alt="${product.name}">
                                <h4>${product.name}</h4>
                                <div class="price">$${product.price}</div>
                                <div class="recommendation-score">الأكثر مبيعاً</div>
                            </div>
                        `;
                    });
                    recommendationsList.innerHTML = recommendationsHTML;
                } else {
                    recommendationsList.innerHTML = '<p style="grid-column:1/-1; text-align:center">لا توجد توصيات متاحة حالياً</p>';
                }
                return;
            }
            
            // تحليل المشتريات السابقة لتقديم توصيات ذكية
            const lastPurchase = purchaseHistory[purchaseHistory.length - 1];
            const recommendedIds = productRelationships[lastPurchase] || [2, 3, 1]; // منتجات افتراضية إذا لم توجد علاقات
            
            const recommendedProducts = recommendedIds
                .map(id => productsData.find(p => p.id === id && p.available))
                .filter(Boolean)
                .slice(0, 3); // الحد الأقصى 3 منتجات
            
            if (recommendedProducts.length > 0) {
                let recommendationsHTML = '';
                recommendedProducts.forEach(product => {
                    recommendationsHTML += `
                        <div class="recommendation-item" onclick="addToCart(${product.id})">
                            <img src="${product.image}" alt="${product.name}">
                            <h4>${product.name}</h4>
                            <div class="price">$${product.price}</div>
                            <div class="recommendation-score">موصى به</div>
                        </div>
                    `;
                });
                recommendationsList.innerHTML = recommendationsHTML;
            } else {
                recommendationsList.innerHTML = '<p style="grid-column:1/-1; text-align:center">لا توجد توصيات متاحة حالياً</p>';
            }
        }

        // ============== نظام التقييمات ==============
        function rateProduct(productId, rating) {
            const product = productsData.find(p => p.id === productId);
            if (!product) return;
            
            const userName = prompt("فضلاً أدخل اسمك للتقييم:");
            if (!userName) return;
            
            const reviewText = prompt("اكتب تعليقك عن المنتج (اختياري):");
            
            product.ratings.push({
                author: userName,
                rating: rating,
                text: reviewText || "لا يوجد تعليق"
            });
            
            showNotification("شكراً لتقييمك للمنتج!", "success");
            displayProducts(productsData);
        }

        // ============== نظام المفضلة ==============

        function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
        showNotification("تمت إضافة المنتج إلى المفضلة", "success");
    } else {
        wishlist.splice(index, 1);
        showNotification("تمت إزالة المنتج من المفضلة", "info");
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // تحديث عرض المفضلة إذا كان القسم مفتوحاً
    if (document.getElementById('favorites').style.display === 'block') {
        showFavorites();
    }
}
        function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product || !product.available) return;

    if (product.sellByWeight) {
        showWeightSelector(product);
    } else {
        if (cart[productId]) {
            cart[productId].quantity += 1;
            showNotification(`تم زيادة كمية ${product.name} في السلة`, "success");
        } else {
            cart[productId] = { 
                ...product, 
                quantity: 1,
                isWeightProduct: false
            };
            showNotification(`تم إضافة ${product.name} إلى السلة`, "success");
        }
        updateCartUI();
        saveCart();
    }
}
function updateCartUI() {
    const cartContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("cartTotal");
    cartContainer.innerHTML = "";
    let total = 0;

    for (const productId in cart) {
        const item = cart[productId];
        let itemTotal, itemDisplay;
        
        if (item.isWeightProduct) {
            // حساب السعر للمنتجات بالوزن (بناءً على الكيلو)
            const pricePerKilo = item.pricePerKilo || item.price * 10; // للتوافق مع البيانات القديمة
            itemTotal = (pricePerKilo * item.quantity) / 1000;
            const pricePer100g = pricePerKilo / 10;
            const pricePer100gLira = Math.round(pricePerKilo * (exchangeRate || 5000) / 10);

            itemDisplay = `
                <div class="item-info">
                    <div class="item-name">${item.name} (${item.weightLabel})</div>
                    <div class="item-price">
                        <span>$${pricePer100g.toFixed(2)} لكل 100غ</span>
                        <small>${pricePer100gLira} ل.س</small>
                    </div>
                    <div class="item-quantity">
                        <button onclick="adjustWeight(${item.id}, -100)">
                            <i class="fas fa-minus"></i> -100غ
                        </button>
                        <span>${item.quantity} غرام</span>
                        <button onclick="adjustWeight(${item.id}, 100)">
                            <i class="fas fa-plus"></i> +100غ
                        </button>
                    </div>
                </div>
                <div class="item-total">$${itemTotal.toFixed(2)}</div>
            `;
        } else {
            // المنتجات العادية
            itemTotal = item.price * item.quantity;
            itemDisplay = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                    <div class="item-quantity">
                        <button onclick="decreaseQuantity(${item.id})"><i class="fas fa-minus"></i></button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
                <div class="item-total">$${itemTotal.toFixed(2)}</div>
            `;
        }
        
        total += itemTotal;
        
        const li = document.createElement("li");
        li.innerHTML = itemDisplay + `
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i> حذف
            </button>
        `;
        cartContainer.appendChild(li);
    }
    
    totalPriceElement.textContent = total.toFixed(2);
    updateCartIcon();
}

        function increaseQuantity(productId) {
            if (cart[productId]) {
                cart[productId].quantity += 1;
                updateCartUI();
                saveCart();
            }
        }

        function decreaseQuantity(productId) {
            if (cart[productId]) {
                if (cart[productId].quantity > 1) {
                    cart[productId].quantity -= 1;
                } else {
                    delete cart[productId];
                }
                updateCartUI();
                saveCart();
            }
        }

        function removeFromCart(productId) {
            delete cart[productId];
            updateCartUI();
            saveCart();
            showNotification("تم إزالة المنتج من السلة", "info");
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function clearCart() {
            cart = {};
            saveCart();
            updateCartUI();
        }

        // ============== نظام الفواتير ==============
        function updateInvoicesUI() {
            const invoicesContainer = document.getElementById("invoicesList");
            invoicesContainer.innerHTML = "";
            
            if (completedInvoices.length === 0) {
                invoicesContainer.innerHTML = `
                    <div style="text-align:center; padding:2rem;">
                        <i class="fas fa-receipt" style="font-size:3rem; color:var(--primary-color); opacity:0.5;"></i>
                        <p style="margin-top:1rem;">لا توجد فواتير مكتملة</p>
                    </div>
                `;
                return;
            }
            
            completedInvoices.reverse().forEach(invoice => {
                const invoiceDiv = document.createElement("div");
                invoiceDiv.className = "invoice-item";
                
                let itemsHTML = invoice.items.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.price}</td>
                        <td>$${item.total.toFixed(2)}</td>
                    </tr>
                `).join("");
                
                const sypTotal = (invoice.total * exchangeRate).toFixed(0);
                
                invoiceDiv.innerHTML = `
                    <div class="invoice-header">
                        <div class="invoice-id">فاتورة #${invoice.id}</div>
                        <div class="invoice-date">${invoice.date}</div>
                    </div>
                    <div class="invoice-customer">
                        <strong>اسم المستلم:</strong> ${invoice.customerName}
                    </div>
                    <table class="invoice-table">
                        <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>الكمية</th>
                                <th>السعر ($)</th>
                                <th>المجموع ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHTML}
                        </tbody>
                    </table>
                    <div class="invoice-totals">
                        <div class="invoice-total">
                            <span class="total-label">المجموع الفرعي:</span>
                            <span class="total-value">$${invoice.total.toFixed(2)}</span>
                        </div>
                        <div class="invoice-total">
                            <span class="total-label">المجموع بالليرة السورية:</span>
                            <span class="total-value">${sypTotal} ل.س</span>
                        </div>
                    </div>
                `;
                invoicesContainer.appendChild(invoiceDiv);
            });
        }

        // ============== نظام الدفع ==============
        function openCheckoutForm() {
            if (Object.keys(cart).length === 0) {
                showNotification("السلة فارغة! أضف منتجات أولاً", "error");
                return;
            }
            document.getElementById("checkoutForm").style.display = "flex";
        }

        function closeCheckoutForm() {
            document.getElementById("checkoutForm").style.display = "none";
            document.getElementById("customerName").value = "";
            document.getElementById("customerPhone").value = "";
            document.getElementById("customerAddress").value = "";
        }
        function processCheckout() {
    if (Object.keys(cart).length === 0) {
        showNotification("السلة فارغة! أضف منتجات أولاً", "error");
        return;
    }

    const customerName = document.getElementById("customerName").value.trim();
    const customerPhone = document.getElementById("customerPhone").value.trim();
    
    if (!customerName) {
        showNotification("يجب إدخال اسم المستلم!", "error");
        return;
    }
    
    if (!customerPhone) {
        showNotification("يجب إدخال رقم الهاتف!", "error");
        return;
    }
    
    const customerAddress = document.getElementById("customerAddress").value.trim();
    
    const invoice = {
        id: Date.now(),
        date: new Date().toLocaleString('ar-SY', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        customerName,
        customerPhone,
        customerAddress,
        items: Object.values(cart).map(item => ({
            name: item.isWeightProduct ? `${item.name} (${item.weightLabel})` : item.name,
            price: item.isWeightProduct ? (item.price / 100) : item.price, // السعر لكل غرام للمنتجات بالوزن
            quantity: item.isWeightProduct ? item.quantity : item.quantity, // الكمية بالغرام للمنتجات بالوزن
            total: item.isWeightProduct ? item.totalPrice : (item.price * item.quantity),
            isWeightProduct: item.isWeightProduct || false,
            weight: item.isWeightProduct ? item.quantity : null
        })),
        total: Object.values(cart).reduce((sum, item) => sum + (item.isWeightProduct ? item.totalPrice : (item.price * item.quantity)), 0),
        exchangeRate: exchangeRate || 0
    };
    
    completedInvoices.push(invoice);
    localStorage.setItem('completedInvoices', JSON.stringify(completedInvoices));
    
    // إرسال الفاتورة إلى Telegram
    sendInvoiceToTelegram(invoice);
    
    showNotification(`تم إكمال الشراء بنجاح! رقم الفاتورة: ${invoice.id}`, "success");
    showDesktopNotification("تم إنشاء فاتورة جديدة", `تم تسجيل فاتورة رقم ${invoice.id}`);
    
    clearCart();
    closeCheckoutForm();
    updateInvoicesUI();
}
const botToken = "7388387809:AAHgsBR0z-avEVjjN2boGyXXwO2TR_T7hXA";
    const chatId = "6068899411";

      
    async function sendInvoiceToTelegram(invoice) {
        const botToken = "7388387809:AAHgsBR0z-avEVjjN2boGyXXwO2TR_T7hXA";
        const chatId = "6068899411";
    
    let message = `📋 *فاتورة جديدة #${invoice.id}* \n`;
    message += `📅 ${invoice.date}\n\n`;
    message += `👤 *الاسم:* ${invoice.customerName}\n`;
    message += `📞 *الهاتف:* ${invoice.customerPhone}\n`;
    
    if (invoice.customerAddress) {
        message += `🏠 *العنوان:* ${invoice.customerAddress}\n\n`;
    } else {
        message += `\n`;
    }
    
    message += `🛍️ *المنتجات:*\n`;
    message += `\`\`\`\n`;
    message += `#   المنتج                 الكمية     السعر      المجموع\n`;
    message += `─────────────────────────────────────────────────────\n`;
    
    invoice.items.forEach((item, index) => {
        const rowNumber = (index + 1).toString().padEnd(3);
        const productName = truncate(item.name, 20).padEnd(20);
        const quantity = item.isWeightProduct 
            ? `${item.quantity}غ`.padEnd(8)
            : `${item.quantity}x`.padEnd(8);
        const price = item.isWeightProduct 
            ? `$${(item.price * 100).toFixed(2)}/100غ`.padEnd(10)
            : `$${item.price.toFixed(2)}`.padEnd(10);
        const total = `$${item.total.toFixed(2)}`;
        
        message += `${rowNumber} ${productName} ${quantity} ${price} ${total}\n`;
    });
    
    message += `\`\`\`\n\n`;
    
    message += `💰 *المجموع الفرعي:* $${invoice.total.toFixed(2)}\n`;
    message += `💱 *سعر الصرف:* ${invoice.exchangeRate} ل.س/$\n`;
    message += `💵 *المجموع بالليرة:* ${Math.round(invoice.total * invoice.exchangeRate)} ل.س\n\n`;
    message += `⚡ *شكراً لثقتكم بمتجر الوتين*`;
    
    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });
    } catch (error) {
        console.error("حدث خطأ أثناء إرسال الفاتورة:", error);
        showNotification("فشل في إرسال الفاتورة إلى Telegram", "error");
    }
}
// دالة مساعدة لقص النص إذا كان طويلاً
function truncate(str, maxLength) {
    return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
}

        // ============== نظام سعر الصرف ==============
        async function saveExchangeRateAndSettings() {
    const newExchangeRate = parseFloat(document.getElementById("exchangeRate").value);
    const newPassword = document.getElementById("newPassword").value;
    
    if (!newExchangeRate || isNaN(newExchangeRate)) {
        showNotification("يجب إدخال سعر صرف صحيح", "error");
        return;
    }
    
    const saveBtn = document.querySelector('.save-settings-btn');
    const originalBtnText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
    saveBtn.disabled = true;
    
    try {
        // تحديث ملف JSON على jsonbin.io
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({
                exchangeRate: newExchangeRate,
                password: newPassword || password
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            exchangeRate = newExchangeRate;
            if (newPassword) password = newPassword;
            
            showDesktopNotification("تم التحديث", "تم حفظ الإعدادات بنجاح على السحابة");
            showNotification("تم حفظ الإعدادات بنجاح!", "success");
            document.getElementById('currentExchangeRate').textContent = exchangeRate;
            updatePricesDisplay();
        } else {
            throw new Error('Failed to update');
        }
    } catch (error) {
        console.error("Error updating settings:", error);
        showNotification("حدث خطأ أثناء حفظ الإعدادات على السحابة", "error");
    } finally {
        saveBtn.innerHTML = originalBtnText;
        saveBtn.disabled = false;
    }
    
    closePasswordForm();
}

        // ============== نظام كلمة المرور ==============
        function openPasswordForm(section) {
            document.getElementById("passwordForm").style.display = "flex";
            document.getElementById("passwordForm").dataset.section = section;
        }

        function closePasswordForm() {
            document.getElementById("passwordForm").style.display = "none";
            document.getElementById("passwordInput").value = "";
        }

        function checkPassword() {
            const inputPassword = document.getElementById("passwordInput").value;
            if (inputPassword === password) {
                const section = document.getElementById("passwordForm").dataset.section;
                showSection(section);
                closePasswordForm();
            } else {
                showNotification("كلمة المرور غير صحيحة!", "error");
            }
        }

   

      
      
        // ============== نظام المعاينة السريعة ==============
       // ============== تكبير الصور ==============
 
        // ============== فلترة المنتجات ==============
        function filterProducts(category) {
    // تحديث الأزرار النشطة
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    let productsToDisplay;
    
    if (category === 'all') {
        productsToDisplay = productsData;
    } else {
        productsToDisplay = productsData.filter(p => p.category === category);
    }
    
    // عرض المنتجات مع خلط عشوائي
    displayProducts(productsToDisplay);
}
        // ============== البحث عن المنتجات ==============
        function searchProducts() {
            const query = document.getElementById("searchInput").value.toLowerCase();
            if (query.length < 2) {
                displayProducts(productsData);
                return;
            }
            
            const filteredProducts = productsData.filter(product =>
                product.name.toLowerCase().includes(query) ||
                (product.description && product.description.toLowerCase().includes(query)) ||
                product.category.toLowerCase().includes(query)
            );
            
            if (filteredProducts.length > 0) {
                displayProducts(filteredProducts);
            } else {
                showNotification('لم يتم العثور على منتجات تطابق بحثك', 'info');
                displayProducts(productsData);
            }
        }

        // ============== إدارة الواجهة ==============
        function toggleSidebar() {
            document.getElementById("sidebar").classList.toggle("show-sidebar");
            document.getElementById("shoppingCart").classList.remove("show-cart");
        }

        function toggleCart() {
            document.getElementById("shoppingCart").classList.toggle("show-cart");
            document.getElementById("sidebar").classList.remove("show-sidebar");
        }

        function toggleSearch() {
            const searchInput = document.getElementById("searchInput");
            searchInput.classList.toggle("show-search");
            if (searchInput.classList.contains("show-search")) {
                searchInput.focus();
            }
        }


        function showSection(sectionId) {
    // إخفاء جميع الأقسام
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });
    
    // إظهار القسم المطلوب
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
    
    // إذا كان القسم هو المفضلة، قم بعرضها
    if (sectionId === 'favorites') {
        showFavorites();
    }
    
    // إغلاق القوائم الجانبية
    document.getElementById("sidebar").classList.remove("show-sidebar");
    document.getElementById("shoppingCart").classList.remove("show-cart");
    
    // إغلاق النماذج
    document.getElementById("checkoutForm").style.display = "none";
    document.getElementById("passwordForm").style.display = "none";
    
    // التمرير إلى أعلى الصفحة
    window.scrollTo(0, 0);
}

            
        

        // ============== نظام الإشعارات ==============
        function showNotification(message, type = 'info') {
    // الإشعار الداخلي (كما هو موجود حالياً)
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon;
    switch(type) {
        case 'success': icon = 'fa-check-circle'; break;
        case 'error': icon = 'fa-times-circle'; break;
        case 'warning': icon = 'fa-exclamation-circle'; break;
        default: icon = 'fa-info-circle';
    }
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // إضافة الإشعار الخارجي
    const notificationTitle = type === 'success' ? 'تم بنجاح' : 
                            type === 'error' ? 'حدث خطأ' : 
                            type === 'warning' ? 'تحذير' : 'إشعار';
    
    showDesktopNotification(notificationTitle, message);
}
        // ============== أدوات مساعدة ==============
        function hideWarning() {
            document.getElementById('warningMessage').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('warningMessage').style.display = 'none';
            }, 300);
        }

        function handleScroll() {
            const backToTopButton = document.getElementById('backToTop');
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
            
            // تأثيرات الحركة عند التمرير
            const animatedElements = document.querySelectorAll('.product, .recommendation-item');
            animatedElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    el.classList.add('animate');
                }
            });
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        function addToPurchaseHistory(productId) {
            purchaseHistory.push(productId);
            localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
        }



        // ... (other JavaScript code remains unchanged) ...

        // ============== تحسين عرض الصور والتكبير ==============
        function zoomImage(imageUrl, productId) {
            // إزالة أي صورة مكبرة موجودة
            const existingZoom = document.querySelector('.zoomed-image');
            if (existingZoom) {
                existingZoom.remove();
            }

            const zoomDiv = document.createElement('div');
            zoomDiv.className = 'zoomed-image';
            zoomDiv.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            `;
            zoomDiv.innerHTML = `
                <img src="${imageUrl}" 
                     style="max-width:90%; max-height:90%; object-fit:contain; border-radius:8px;">
                <button onclick="this.parentElement.remove()" 
                        style="position:absolute; top:20px; right:20px; background:none; border:none; color:white; font-size:2rem; cursor:pointer;">
                    &times;
                </button>
            `;
            document.body.appendChild(zoomDiv);

            // إضافة تأثير التكبير عند النقر على الصورة مرة أخرى
            const imgElement = zoomDiv.querySelector('img');
            let isZoomed = false;
            imgElement.addEventListener('click', () => {
                if (!isZoomed) {
                    imgElement.style.transform = 'scale(1.5)';
                    isZoomed = true;
                } else {
                    imgElement.style.transform = 'scale(1)';
                    isZoomed = false;
                }
            });
        }

        // ============== تحسين المعاينة السريعة ==============
   /**
 * دالة المعاينة السريعة للمنتجات
 * @param {number} productId - معرّف المنتج
 */
 function showQuickView(productId) {
    try {
        // 1. البحث عن المنتج في قاعدة البيانات
        const product = productsData.find(p => p.id === productId);
        if (!product) {
            console.error("المنتج غير موجود! ID:", productId);
            showNotification("المنتج غير متاح حاليًا", "error");
            return;
        }

        // 2. حساب الأسعار بناءً على الكيلو
        const pricePerKilo = product.price;
        const pricePer100g = (product.price / 10).toFixed(2);
        const pricePerKiloLira = Math.round(product.price * (exchangeRate || 5000));
        const pricePer100gLira = Math.round(pricePerKiloLira / 10);

        // 3. إنشاء عنصر المعاينة
        const quickView = document.createElement('div');
        quickView.className = 'quick-view-modal';
        quickView.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // 4. إنشاء معرض الصور
        const gallery = createImageGallery(product.images || ['default-product.jpg'], productId);

        // 5. إنشاء قسم خيارات الوزن (إذا كان المنتج مباعًا بالوزن)
        let weightOptionsHTML = '';
        if (product.sellByWeight && product.weightOptions) {
            weightOptionsHTML = `
                <div class="weight-options" style="margin: 1.5rem 0; text-align: right;">
                    <h3 style="color: var(--accent-color); border-bottom: 1px dashed var(--accent-color); padding-bottom: 0.5rem;">
                        <i class="fas fa-weight-hanging"></i> اختر الكمية:
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.5rem;">
                        ${product.weightOptions.map(option => {
                            const price = (pricePerKilo * option.weight / 1000).toFixed(2);
                            const priceLira = Math.round(pricePerKiloLira * option.weight / 1000);
                            return `
                                <button 
                                    onclick="
                                        addWeightedProductToCart(${product.id}, ${option.weight});
                                        this.closest('.quick-view-modal').remove();
                                    "
                                    style="
                                        background: var(--primary-color);
                                        color: white;
                                        border: none;
                                        padding: 0.7rem;
                                        border-radius: 8px;
                                        cursor: pointer;
                                        transition: all 0.3s;
                                        text-align: center;
                                    "
                                    onmouseover="this.style.transform='scale(1.05)'"
                                    onmouseout="this.style.transform='scale(1)'"
                                >
                                    ${option.label}<br>
                                    <small>
                                        $${price} | 
                                        ${priceLira} ل.س
                                    </small>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        // 6. بناء محتوى المعاينة
        quickView.innerHTML = `
            <div class="quick-view-content" style="
                background: var(--card-color);
                border-radius: 12px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 5px 30px rgba(0,0,0,0.3);
                border: 1px solid var(--border-color);
            ">
                <!-- زر الإغلاق -->
                <button class="close-btn" style="
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: var(--error-color);
                    color: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: none;
                    font-size: 1rem;
                    cursor: pointer;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    &times;
                </button>

                <!-- معرض الصور -->
                <div style="padding: 1rem;">
                    ${gallery.outerHTML}
                </div>

                <!-- معلومات المنتج -->
                <div style="padding: 0 1.5rem 1.5rem;">
                    <h2 style="color: var(--primary-color); margin-top: 0; text-align: center;">
                        ${product.name}
                    </h2>

                    <div style="display: flex; justify-content: space-between; align-items: center; margin: 1rem 0;">
                        <div style="text-align: right;">
                            <div style="font-size: 1.3rem; color: var(--primary-color);">
                                ${product.sellByWeight ? 
                                    `لكل كيلو: $${pricePerKilo.toFixed(2)}` : 
                                    `السعر: $${product.price.toFixed(2)}`
                                }
                            </div>
                            <div style="font-size: 0.9rem; color: var(--secondary-color);">
                                ${pricePerKiloLira} ليرة سورية
                            </div>
                            ${product.sellByWeight ? `
                                <div style="font-size: 0.9rem; margin-top: 0.5rem;">
                                    <small>لكل 100غ: $${pricePer100g} | ${pricePer100gLira} ل.س</small>
                                </div>
                            ` : ''}
                        </div>

                        ${!product.sellByWeight ? `
                            <button 
                                onclick="
                                    addToCart(${product.id});
                                    this.closest('.quick-view-modal').remove();
                                "
                                style="
                                    background: var(--accent-color);
                                    color: white;
                                    border: none;
                                    padding: 0.7rem 1.5rem;
                                    border-radius: 8px;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                "
                                ${!product.available ? 'disabled' : ''}
                            >
                                <i class="fas fa-cart-plus"></i> أضف للسلة
                            </button>
                        ` : ''}
                    </div>

                    ${product.description ? `
                        <div style="margin: 1.5rem 0; text-align: right;">
                            <h3 style="color: var(--primary-color);">وصف المنتج:</h3>
                            <p style="line-height: 1.7; color: var(--text-color);">
                                ${product.description}
                            </p>
                        </div>
                    ` : ''}

                    ${product.features && product.features.length > 0 ? `
                        <div style="margin: 1.5rem 0; text-align: right;">
                            <h3 style="color: var(--primary-color);">مميزات المنتج:</h3>
                            <ul style="padding-right: 15px;">
                                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}

                    ${weightOptionsHTML}
                </div>
            </div>
        `;

        // 7. إضافة إلى DOM وإظهارها بسلاسة
        document.body.appendChild(quickView);
        setTimeout(() => { quickView.style.opacity = '1'; }, 10);

        // 8. ربط أحداث الإغلاق
        quickView.querySelector('.close-btn').addEventListener('click', () => {
            quickView.style.opacity = '0';
            setTimeout(() => quickView.remove(), 300);
        });

        // 9. إغلاق عند النقر خارج المحتوى
        quickView.addEventListener('click', (e) => {
            if (e.target === quickView) {
                quickView.style.opacity = '0';
                setTimeout(() => quickView.remove(), 300);
            }
        });

    } catch (error) {
        console.error("خطأ في عرض المعاينة السريعة:", error);
        showNotification("حدث خطأ تقني أثناء عرض المنتج", "error");
    }
}
   
        // ============== نظام التقييمات المحدث ==============
        function rateProduct(productId) {
            const product = productsData.find(p => p.id === productId);
            if (!product) return;

            const ratingForm = document.createElement('div');
            ratingForm.className = 'rating-form';
            ratingForm.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            `;

            ratingForm.innerHTML = `
                <div class="form-container" style="
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                ">
                    <button onclick="this.parentElement.parentElement.remove()" 
                            style="position:absolute; top:10px; right:10px; background:none; border:none; font-size:1.5rem; cursor:pointer; color:#333;">
                        &times;
                    </button>
                    <h3 style="color:var(--primary-color); margin-top:0;">تقييم المنتج: ${product.name}</h3>
                    <div style="display:flex; justify-content:center; gap:0.5rem; margin-bottom:1rem;">
                        ${[1,2,3,4,5].map(i => `
                            <i class="fas fa-star rating-star" data-rating="${i}" 
                               style="font-size:2rem; color:#ddd; cursor:pointer;"></i>
                        `).join('')}
                    </div>
                    <input type="text" id="reviewName" placeholder="اسمك" 
                           style="width:100%; padding:0.8rem; border:1px solid var(--border-color); border-radius:8px; margin-bottom:1rem;">
                    <textarea id="reviewText" placeholder="اكتب تعليقك (اختياري)" rows="3"
                              style="width:100%; padding:0.8rem; border:1px solid var(--border-color); border-radius:8px; margin-bottom:1rem;"></textarea>
                    <button onclick="submitRating(${productId})"
                            style="background-color:var(--primary-color); color:white; border:none; padding:0.8rem; border-radius:8px; width:100%; cursor:pointer;">
                        إرسال التقييم
                    </button>
                </div>
            `;
            document.body.appendChild(ratingForm);

            // إضافة تفاعلات النجوم
            ratingForm.querySelectorAll('.rating-star').forEach(star => {
                star.addEventListener('click', () => {
                    const rating = parseInt(star.getAttribute('data-rating'));
                    ratingForm.querySelectorAll('.rating-star').forEach((s, i) => {
                        s.style.color = i < rating ? '#FFD700' : '#ddd';
                    });
                    ratingForm.setAttribute('data-selected-rating', rating);
                });
            });
        }

        function submitRating(productId) {
            const ratingForm = document.querySelector('.rating-form');
            const selectedRating = parseInt(ratingForm.getAttribute('data-selected-rating'));
            const userName = ratingForm.querySelector('#reviewName').value.trim();
            const reviewText = ratingForm.querySelector('#reviewText').value.trim();

            if (!userName || !selectedRating) {
                showNotification("يرجى إدخال اسمك واختيار تقييم!", "error");
                return;
            }

            const product = productsData.find(p => p.id === productId);
            if (product) {
                product.ratings.push({
                    author: userName,
                    rating: selectedRating,
                    text: reviewText || "لا يوجد تعليق"
                });
                showNotification("شكراً لتقييمك للمنتج!", "success");
                displayProducts(productsData);
                ratingForm.remove();
            }
        }

        // ============== نظام الإشعارات للمستخدمين ==============
        let lastExchangeRate = exchangeRate;
        let originalProductsCount = productsData.length;

        function checkForUpdates() {
            // التحقق من تغير سعر الصرف
            if (exchangeRate !== lastExchangeRate) {
                showNotification(`تم تحديث سعر الصرف إلى ${exchangeRate} ليرة سورية`, "info");
                lastExchangeRate = exchangeRate;
            }

            // التحقق من إضافة منتجات جديدة
            if (productsData.length > originalProductsCount) {
                showNotification(`تمت إضافة ${productsData.length - originalProductsCount} منتجات جديدة!`, "success");
                originalProductsCount = productsData.length;
            }

            setTimeout(checkForUpdates, 5000); // التحقق كل 5 ثواني
        }

        // بدء التحقق عند تحميل الصفحة
        window.onload = () => {
            initApp();
            checkForUpdates();
        };

        // ... (other JavaScript code remains unchanged) ...

        function updatePricesDisplay() {
    if (exchangeRate) {
        displayProducts(productsData); // تحديث عرض المنتجات
        updateCartUI(); // تحديث السلة
        updateInvoicesUI(); // تحديث الفواتير
    } else {
        document.querySelectorAll('.syp-price').forEach(el => {
            el.innerHTML = '<span>بالليرة:</span> <span>لم يصدر بعد</span>';
        });
    }
}
/**
 * جلب سعر الصرف من API الخارجي
 * @returns {Promise<boolean>} يعيد true إذا نجح الجلب، false إذا فشل
 */
 async function fetchExchangeRate() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY,
                'X-Bin-Meta': 'false'
            },
            timeout: 5000 // مهلة 5 ثواني
        });

        if (!response.ok) {
            throw new Error(`خطأ في الشبكة: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || typeof data.exchangeRate === 'undefined') {
            throw new Error('بيانات سعر الصرف غير موجودة');
        }

        exchangeRate = data.exchangeRate;
        password = data.password || password;
        
        // تحديث الواجهة
        updateExchangeRateDisplay(exchangeRate);
        localStorage.setItem('lastExchangeRate', exchangeRate.toString());
        
        return true;
        
    } catch (error) {
        console.error("فشل في جلب سعر الصرف:", error);
        updateExchangeRateDisplay(null); // عرض "لم يصدر"
        return false;
    }
}
function updatePricesDisplay() {
    if (exchangeRate) {
        // عرض الأسعار عند توفر سعر الصرف
        document.querySelectorAll('.syp-price').forEach(el => {
            const productId = el.closest('.product')?.getAttribute('data-id');
            if (productId) {
                const product = productsData.find(p => p.id == productId);
                if (product) {
                    el.innerHTML = `
                        <span class="price-label">بالليرة:</span>
                        <span class="price-value">${Math.round(product.price * exchangeRate)} ل.س</span>
                    `;
                }
            }
        });
        
        // تحديث السلة والفواتير
        updateCartUI();
        updateInvoicesUI();
    } else {
        // عرض رسالة "لم يصدر بعد" عند عدم توفر سعر الصرف
        document.querySelectorAll('.syp-price').forEach(el => {
            el.innerHTML = `
                <span class="price-label">بالليرة:</span>
                <span class="price-value">لم يصدر سعر الدولار</span>
            `;
        });
        
        document.getElementById('currentExchangeRate').textContent = "لم يصدر بعد";
    }
}



function showDesktopNotification(title, message) {
    // التحقق من دعم المتصفح للإشعارات
    if (!("Notification" in window)) {
        console.log("هذا المتصفح لا يدعم إشعارات سطح المكتب");
        return;
    }
    
    // أيقونة الموقع - تأكد من وجود ملف logo.png في مجلد الصور
    const iconUrl = 'logo.png';
    
    // اسم التطبيق (سيظهر في الإشعار)
    const appName = 'متجر الوتين';
    
    // التحقق من وجود إذن لعرض الإشعارات
    if (Notification.permission === "granted") {
        const notification = new Notification(`${appName} - ${title}`, {
            body: message,
            icon: iconUrl,
            dir: 'rtl', // لجعل النص من اليمين لليسار
            badge: iconUrl // للأجهزة المحمولة
        });
        
        // إغلاق الإشعار تلقائياً بعد 5 ثواني
        setTimeout(() => notification.close(), 5000);
        
        // عند النقر على الإشعار، يتم التركيز على نافذة المتجر
        notification.onclick = () => {
            window.focus();
        };
    }
    else if (Notification.permission !== "denied") {
        // طلب الإذن إذا لم يكن محدداً
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                showDesktopNotification(title, message);
            }
        });
    }
}





function manageNotifications() {
    if (Notification.permission === "granted") {
        showNotification("الإشعارات مفعلة بالفعل", "info");
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                showNotification("تم تفعيل الإشعارات بنجاح", "success");
            } else {
                showNotification("لم يتم تفعيل الإشعارات", "warning");
            }
        });
    }
}



function showFavorites() {
    const favoritesContainer = document.getElementById('favoritesList');
    favoritesContainer.innerHTML = '';
    
    if (wishlist.length === 0) {
        favoritesContainer.innerHTML = `
            <div style="text-align:center; padding:2rem; grid-column:1/-1">
                <i class="fas fa-heart" style="font-size:2rem; color:var(--secondary-color);"></i>
                <p>لا توجد منتجات في المفضلة</p>
            </div>
        `;
        return;
    }
    
    const favoriteProducts = productsData.filter(p => wishlist.includes(p.id));
    
    favoritesContainer.innerHTML = '<div class="products-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:1.5rem; width:100%;"></div>';
    const gridContainer = favoritesContainer.querySelector('.products-grid');
    
    favoriteProducts.forEach((product, index) => {
        // تهيئة الفهرس إذا لم يكن موجوداً
        if (currentSlideIndexes[product.id] === undefined) {
            currentSlideIndexes[product.id] = 0;
        }
        
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.setAttribute('data-id', product.id);
        productDiv.style.animationDelay = `${index * 0.1}s`;
        
        // إنشاء معرض الصور
        const gallery = createImageGallery(product.images || ['default-product.jpg'], product.id);
        
        productDiv.innerHTML = `
            <div class="product-header">
                <button class="wishlist-btn active" onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
                ${!product.available ? '<span class="product-badge">غير متوفر</span>' : ''}
            </div>
            
            <div class="product-image-container">
                ${gallery.outerHTML}
            </div>
            
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="category">${product.category}</div>
                
                <div class="price-container">
                    <div class="price">
                        <span class="price-label">السعر:</span>
                        <span class="price-value">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="syp-price">
                        <span class="price-label">بالليرة:</span>
                        <span class="price-value">${Math.round(product.price * (exchangeRate || 5000))} ل.س</span>
                    </div>
                </div>
                
                <div class="product-actions">
                    <button onclick="addToCart(${product.id})" ${!product.available ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> أضف للسلة
                    </button>
                    <button class="secondary" onclick="showQuickView(${product.id})">
                        <i class="fas fa-eye"></i> معاينة سريعة
                    </button>
                </div>
            </div>
        `;
        
        gridContainer.appendChild(productDiv);
    });
    
    // إعادة ربط الأحداث يدوياً بعد إضافة العناصر إلى DOM
    setTimeout(() => {
        document.querySelectorAll('.gallery-nav').forEach(btn => {
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr) {
                btn.onclick = null; // إزالة المعالج القديم أولاً
                const match = onclickAttr.match(/changeSlide\((\d+),\s*(-?\d+)\)/);
                if (match) {
                    const productId = parseInt(match[1]);
                    const direction = parseInt(match[2]);
                    btn.addEventListener('click', () => changeSlide(productId, direction));
                }
            }
        });
        
        document.querySelectorAll('.gallery-dots .dot').forEach(dot => {
            const onclickAttr = dot.getAttribute('onclick');
            if (onclickAttr) {
                dot.onclick = null;
                const match = onclickAttr.match(/goToSlide\((\d+),\s*(\d+)\)/);
                if (match) {
                    const productId = parseInt(match[1]);
                    const slideIndex = parseInt(match[2]);
                    dot.addEventListener('click', () => goToSlide(productId, slideIndex));
                }
            }
        });
    }, 100);
}


    


// عرض المنتجات المفضلة
function createImageGallery(images, productId) {
  const gallery = document.createElement('div');
  gallery.className = 'product-gallery';
  gallery.innerHTML = `
    <div class="gallery-container">
      ${images.map((img, index) => `
        <div class="gallery-slide ${index === 0 ? 'active' : ''}">
          <img src="${img}" alt="صورة المنتج ${index + 1}" onclick="zoomImage('${img}')">
        </div>
      `).join('')}
    </div>
    <button class="gallery-prev" onclick="changeSlide(${productId}, -1)">
      <i class="fas fa-chevron-right"></i>
    </button>
    <button class="gallery-next" onclick="changeSlide(${productId}, 1)">
      <i class="fas fa-chevron-left"></i>
    </button>
  `;
  return gallery;
}





// أضف هذا مع المتغيرات العامة في بداية الكود
// تأكد من وجود هذه الدوال بنفس الشكل
function changeSlide(productId, direction) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    if (!productElement) return;
    
    const slides = productElement.querySelectorAll('.gallery-slide');
    const dots = productElement.querySelectorAll('.dot');
    
    let currentIndex = currentSlideIndexes[productId] || 0;
    let newIndex = (currentIndex + direction + slides.length) % slides.length;
    
    slides[currentIndex].classList.remove('active');
    slides[newIndex].classList.add('active');
    
    if (dots.length > 0) {
        dots[currentIndex].classList.remove('active');
        dots[newIndex].classList.add('active');
    }
    
    currentSlideIndexes[productId] = newIndex;
}

function goToSlide(productId, index) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    if (!productElement) return;
    
    const slides = productElement.querySelectorAll('.gallery-slide');
    const dots = productElement.querySelectorAll('.dot');
    const currentIndex = currentSlideIndexes[productId] || 0;
    
    slides[currentIndex].classList.remove('active');
    slides[index].classList.add('active');
    
    if (dots.length > 0) {
        dots[currentIndex].classList.remove('active');
        dots[index].classList.add('active');
    }
    
    currentSlideIndexes[productId] = index;
}



// دالة إنشاء معرض الصور

// دالة تكبير الصورة

function createImageGallery(images, productId) {
    const gallery = document.createElement('div');
    gallery.className = 'product-gallery';
    
    // تهيئة الفهرس إذا لم يكن موجوداً
    if (currentSlideIndexes[productId] === undefined) {
        currentSlideIndexes[productId] = 0;
    }

    gallery.innerHTML = `
        <div class="gallery-container">
            ${images.map((img, index) => `
                <div class="gallery-slide ${index === currentSlideIndexes[productId] ? 'active' : ''}">
                    <img src="${img}" alt="صورة المنتج" loading="lazy" onclick="zoomImage('${img}', ${productId})">
                </div>
            `).join('')}
        </div>
        
        ${images.length > 1 ? `
            <button class="gallery-nav prev" onclick="changeSlide(${productId}, -1)">
                <i class="fas fa-chevron-right"></i>
            </button>
            <button class="gallery-nav next" onclick="changeSlide(${productId}, 1)">
                <i class="fas fa-chevron-left"></i>
            </button>
            
            <div class="gallery-dots">
                ${images.map((_, index) => `
                    <span class="dot ${index === currentSlideIndexes[productId] ? 'active' : ''}" 
                          onclick="goToSlide(${productId}, ${index})"></span>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    return gallery;
}
// دالة خلط عشوائي محسنة (Fisher-Yates مع ضمان عدم التكرار)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}




function showWeightSelector(product) {
    const modal = document.createElement('div');
    modal.className = 'weight-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-weight-modal" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h3><i class="fas fa-weight-hanging"></i> اختر كمية ${product.name}</h3>
            <div class="weight-grid">
                ${product.weightOptions.map(option => {
                    const priceInDollar = (product.price * option.weight / 100).toFixed(2);
                    const priceInLira = exchangeRate ? Math.round(product.price * exchangeRate * option.weight / 100) : '...';
                    return `
                        <div class="weight-option" onclick="addWeightedProductToCart(${product.id}, ${option.weight})">
                            <div class="weight-amount">${option.label}</div>
                            <div class="weight-price">
                                <span class="dollar">$${priceInDollar}</span>
                                <span> | </span>
                                <span class="lira">${priceInLira} ل.س</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}


function addWeightedProductToCart(productId, weight) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const selectedOption = product.weightOptions?.find(o => o.weight === weight) || { 
        weight, 
        label: `${weight} غرام` 
    };

    // السعر يعتمد على الكيلو
    const pricePerKilo = product.price;
    const totalPrice = (pricePerKilo * weight) / 1000; // تحويل الوزن من غرام إلى كيلو

    if (cart[productId]) {
        cart[productId].quantity += weight;
        cart[productId].totalPrice += totalPrice;
    } else {
        cart[productId] = {
            ...product,
            quantity: weight,
            totalPrice: totalPrice,
            isWeightProduct: true,
            selectedWeight: weight,
            weightLabel: selectedOption.label,
            pricePerKilo: pricePerKilo // حفظ سعر الكيلو
        };
    }

    updateCartUI();
    saveCart();
    showNotification(`تمت إضافة ${selectedOption.label} من ${product.name} إلى السلة`, "success");
}
function adjustWeight(productId, amount) {
    const item = cart[productId];
    if (!item || !item.isWeightProduct) return;
    
    const newWeight = item.quantity + amount;
    const minWeight = 100; // الحد الأدنى 100 غرام
    
    if (newWeight < minWeight) {
        if (confirm(`الحد الأدنى للشراء هو ${minWeight} غرام. هل تريد إزالة المنتج من السلة؟`)) {
            removeFromCart(productId);
        }
        return;
    }
    
    const pricePerKilo = item.pricePerKilo || item.price * 10; // للتوافق مع البيانات القديمة
    item.quantity = newWeight;
    item.totalPrice = (pricePerKilo * newWeight) / 1000;
    
    // تحديث التسمية إذا تطابق مع أحد الخيارات المحددة مسبقاً
    const product = productsData.find(p => p.id === productId);
    if (product) {
        const matchedOption = product.weightOptions.find(o => o.weight === newWeight);
        if (matchedOption) {
            item.weightLabel = matchedOption.label;
        } else {
            item.weightLabel = `${newWeight} غرام`;
        }
    }
    
    updateCartUI();
    saveCart();
}

function showWeightSelector(product) {
    const modal = document.createElement('div');
    modal.className = 'weight-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-weight-modal" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h3><i class="fas fa-weight-hanging"></i> اختر كمية ${product.name}</h3>
            <div class="weight-grid">
                ${product.weightOptions.map(option => {
                    const priceInDollar = (product.price * option.weight / 1000).toFixed(2);
                    const priceInLira = exchangeRate ? Math.round(product.price * exchangeRate * option.weight / 1000) : '...';
                    return `
                        <div class="weight-option" onclick="addWeightedProductToCart(${product.id}, ${option.weight})">
                            <div class="weight-amount">${option.label}</div>
                            <div class="weight-price">
                                <span class="dollar">$${priceInDollar}</span>
                                <span> | </span>
                                <span class="lira">${priceInLira} ل.س</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}




function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode.toString());
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon";
    
    // تطبيق الوضع الليلي فوراً
    applyDarkMode();
}

function applyDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDark);
    
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    }
}

// استدعاء هذه الدالة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', applyDarkMode);

function updateExchangeRateDisplay(rate) {
    const rateElement = document.getElementById('currentExchangeRate');
    const rateInput = document.getElementById('exchangeRate');
    
    if (rate) {
        // إذا كان السعر متاحاً
        rateElement.textContent = rate;
        if (rateInput) rateInput.value = rate;
        
        // تحديث جميع أسعار المنتجات
        document.querySelectorAll('.syp-price').forEach(el => {
            const productId = el.closest('.product')?.getAttribute('data-id');
            if (productId) {
                const product = productsData.find(p => p.id == productId);
                if (product) {
                    el.innerHTML = `
                        <span class="price-label">بالليرة:</span>
                        <span class="price-value">${Math.round(product.price * rate)} ل.س</span>
                    `;
                }
            }
        });
    } else {
        // إذا فشل جلب السعر
        rateElement.textContent = 'لم يصدر';
        if (rateInput) rateInput.placeholder = 'لم يصدر سعر الصرف';
        
        // عرض "لم يصدر" لجميع المنتجات
        document.querySelectorAll('.syp-price').forEach(el => {
            el.innerHTML = `
                <span class="price-label">بالليرة:</span>
                <span class="price-value">لم يصدر</span>
            `;
        });
    }
}
let failedLoginAttempts = 0;
let lastFailedAttemptTime = 0;

function checkPassword(inputPassword) {
    const now = Date.now();
    const cooldownPeriod = 30000; // 30 ثانية
    
    // إعادة تعيين العداد إذا مر أكثر من فترة التهدئة
    if (now - lastFailedAttemptTime > cooldownPeriod) {
        failedLoginAttempts = 0;
    }
    
    if (inputPassword === password) {
        failedLoginAttempts = 0;
        return true;
    }
    
    failedLoginAttempts++;
    lastFailedAttemptTime = now;
    
    if (failedLoginAttempts >= 3) {
        const timeLeft = Math.ceil((cooldownPeriod - (now - lastFailedAttemptTime)) / 1000);
        showNotification(`تم حظرك مؤقتًا. الرجاء المحاولة بعد ${timeLeft} ثانية`, "error");
        document.getElementById('passwordInput').disabled = true;
        
        setTimeout(() => {
            document.getElementById('passwordInput').disabled = false;
            failedLoginAttempts = 0;
        }, cooldownPeriod);
        
        return false;
    }
    
    showNotification(`كلمة المرور غير صحيحة! لديك ${3 - failedLoginAttempts} محاولات متبقية`, "error");
    return false;
}

const themeColors = {
    default: {
        primary: '#4a6b8a',
        secondary: '#e67e22',
        accent: '#16a085'
    },
    dark: {
        primary: '#3a4d6b',
        secondary: '#d2691e',
        accent: '#138a72'
    },
    light: {
        primary: '#5a7b9a',
        secondary: '#f68e32',
        accent: '#18b295'
    }
};

function applyCustomTheme(theme) {
    const root = document.documentElement;
    const colors = themeColors[theme] || themeColors.default;
    
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--accent-color', colors.accent);
    
    localStorage.setItem('userTheme', theme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('userTheme') || 'default';
    applyCustomTheme(savedTheme);
    
    // إنشاء واجهة اختيار الألوان
    const themePicker = document.createElement('div');
    themePicker.className = 'theme-picker';
    themePicker.innerHTML = `
        <button onclick="applyCustomTheme('default')">افتراضي</button>
        <button onclick="applyCustomTheme('dark')">داكن</button>
        <button onclick="applyCustomTheme('light')">فاتح</button>
    `;
    document.body.appendChild(themePicker);
}

// استدعاء عند تحميل الصفحة:
initTheme();
document.addEventListener('DOMContentLoaded', () => {
    initFuzzySearch();
    initTheme();
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }
});
        // ============== تهيئة المتجر عند التحميل ==============
        window.onload = initApp; 