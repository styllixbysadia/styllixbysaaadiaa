/* =========================================================
   STYLLIX BY SADIA - COMPLETE SCRIPT.JS
   PREMIUM E-COMMERCE WEBSITE
========================================================= */


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = {

    bag1: {
        name: "Luxury Handbag",
        category: "bag",
        price: 4499,
        image: "images/bag1.jpg",
        badge: "NEW",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Elegant premium handbag for everyday luxury."
    },

    bag2: {
        name: "Classic Handbag",
        category: "bag",
        price: 2999,
        image: "images/bag2.jpg",
        badge: "HOT",
        rating: "⭐⭐⭐⭐☆",
        description:
            "Modern handbag with elegant black finish."
    },

    bag3: {
        name: "Premium Bag",
        category: "bag",
        price: 3499,
        image: "images/bag3.jpg",
        badge: "SALE",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Luxury handbag with premium quality design."
    },

    bag4: {
        name: "Leather Bag",
        category: "bag",
        price: 4999,
        image: "images/bag4.jpg",
        badge: "PREMIUM",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Premium leather bag with stylish finish."
    },


    watch1: {
        name: "Luxury Watch",
        category: "watch",
        price: 2499,
        image: "images/watch1.jpg",
        badge: "BEST",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Premium wrist watch with elegant luxury design."
    },

    watch2: {
        name: "Classic Watch",
        category: "watch",
        price: 2999,
        image: "images/watch2.jpg",
        badge: "NEW",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Classic watch designed for a timeless and elegant look."
    },

    watch3: {
        name: "Gold Watch",
        category: "watch",
        price: 3499,
        image: "images/watch3.jpg",
        badge: "HOT",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Elegant gold-tone watch for a premium fashion look."
    },

    watch4: {
        name: "Silver Watch",
        category: "watch",
        price: 4999,
        image: "images/watch4.jpg",
        badge: "PREMIUM",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Premium silver-tone watch with a stylish modern design."
    },


    jewelry1: {
        name: "Gold Jewelry Set",
        category: "jewelry",
        price: 2999,
        image: "images/jewelry1.jpg",
        badge: "NEW",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Beautiful gold jewelry set perfect for special occasions."
    },

    jewelry2: {
        name: "Silver Jewelry",
        category: "jewelry",
        price: 3999,
        image: "images/jewelry2.jpg",
        badge: "PREMIUM",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Elegant silver jewelry designed to complete your luxury look."
    }

};


/* =========================================================
   CART DATA
========================================================= */

let cart =
    JSON.parse(
        localStorage.getItem("styllixCart")
    ) || [];


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "styllixCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   UPDATE CART COUNT
========================================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) return;


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;

}


/* =========================================================
   ADD PRODUCT TO CART
========================================================= */

function addToCart(
    productId,
    quantity = 1
) {

    const product =
        products[productId];

    if (!product) return;


    const existingProduct =
        cart.find(
            item =>
                item.id === productId
        );


    if (existingProduct) {

        existingProduct.quantity +=
            quantity;

    } else {

        cart.push({

            id: productId,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: quantity

        });

    }


    saveCart();

    updateCartCount();

    renderCart();


    alert(
        product.name +
        " added to your cart!"
    );

}


/* =========================================================
   REMOVE PRODUCT FROM CART
========================================================= */

function removeFromCart(
    productId
) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeCartQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            product =>
                product.id === productId
        );


    if (!item) return;


    item.quantity +=
        change;


    if (item.quantity <= 0) {

        removeFromCart(
            productId
        );

        return;

    }


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (!cartItems) return;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>

        `;


        if (cartTotal) {

            cartTotal.textContent =
                "Rs. 0";

        }


        return;

    }


    let total = 0;


    cartItems.innerHTML =
        "";


    cart.forEach(
        item => {

            total +=
                item.price *
                item.quantity;


            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        Rs. ${item.price.toLocaleString()}
                    </p>

                    <div class="cart-quantity">

                        <button
                            onclick="
                                changeCartQuantity(
                                    '${item.id}',
                                    -1
                                )
                            "
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="
                                changeCartQuantity(
                                    '${item.id}',
                                    1
                                )
                            "
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-cart"
                    onclick="
                        removeFromCart(
                            '${item.id}'
                        )
                    "
                    aria-label="Remove product"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );


    if (cartTotal) {

        cartTotal.textContent =
            "Rs. " +
            total.toLocaleString();

    }

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

    const cartSidebar =
        document.getElementById(
            "cartSidebar"
        );


    const cartOverlay =
        document.getElementById(
            "cartOverlay"
        );


    if (cartSidebar) {

        cartSidebar.classList.add(
            "active"
        );

    }


    if (cartOverlay) {

        cartOverlay.classList.add(
            "active"
        );

    }

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    const cartSidebar =
        document.getElementById(
            "cartSidebar"
        );


    const cartOverlay =
        document.getElementById(
            "cartOverlay"
        );


    if (cartSidebar) {

        cartSidebar.classList.remove(
            "active"
        );

    }


    if (cartOverlay) {

        cartOverlay.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   PRODUCT DETAIL PAGE
========================================================= */

function loadProductDetails() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        params.get("id");


    if (!productId) return;


    const product =
        products[productId];


    if (!product) return;


    const productImage =
        document.getElementById(
            "productImage"
        );


    const productName =
        document.getElementById(
            "productName"
        );


    const productPrice =
        document.getElementById(
            "productPrice"
        );


    const productDescription =
        document.getElementById(
            "productDescription"
        );


    const productRating =
        document.getElementById(
            "productRating"
        );


    const productBadge =
        document.getElementById(
            "productBadge"
        );


    if (productImage) {

        productImage.src =
            product.image;

        productImage.alt =
            product.name;

    }


    if (productName) {

        productName.textContent =
            product.name;

    }


    if (productPrice) {

        productPrice.textContent =
            "Rs. " +
            product.price.toLocaleString();

    }


    if (productDescription) {

        productDescription.textContent =
            product.description;

    }


    if (productRating) {

        productRating.textContent =
            product.rating;

    }


    if (productBadge) {

        productBadge.textContent =
            product.badge;

    }


    /* =====================================================
       ADD TO CART BUTTON
    ===================================================== */

    const addToCartBtn =
        document.getElementById(
            "addToCartBtn"
        );


    if (addToCartBtn) {

        addToCartBtn.onclick =
            function () {

                const quantityElement =
                    document.getElementById(
                        "quantity"
                    );


                const quantity =
                    parseInt(
                        quantityElement
                            ?.textContent
                    ) || 1;


                addToCart(
                    productId,
                    quantity
                );

            };

    }


    /* =====================================================
       WHATSAPP PRODUCT ORDER
    ===================================================== */

    const whatsappBtn =
        document.getElementById(
            "whatsappBtn"
        );


    if (whatsappBtn) {

        whatsappBtn.onclick =
            function () {

                const quantityElement =
                    document.getElementById(
                        "quantity"
                    );


                const quantity =
                    parseInt(
                        quantityElement
                            ?.textContent
                    ) || 1;


                const totalPrice =
                    product.price *
                    quantity;


                const message =
                    `Hello STYLLIX BY SADIA!%0A%0AI want to order:%0A${product.name}%0AQuantity: ${quantity}%0APrice: Rs. ${totalPrice.toLocaleString()}`;


                window.open(
                    `https://wa.me/923281820980?text=${message}`,
                    "_blank"
                );

            };

    }

}


/* =========================================================
   QUANTITY SYSTEM
========================================================= */

function setupQuantity() {

    const minusBtn =
        document.getElementById(
            "minusBtn"
        );


    const plusBtn =
        document.getElementById(
            "plusBtn"
        );


    const quantityElement =
        document.getElementById(
            "quantity"
        );


    if (
        !minusBtn ||
        !plusBtn ||
        !quantityElement
    ) {

        return;

    }


    let quantity = 1;


    plusBtn.onclick =
        function () {

            quantity++;


            quantityElement.textContent =
                quantity;

        };


    minusBtn.onclick =
        function () {

            if (quantity > 1) {

                quantity--;


                quantityElement.textContent =
                    quantity;

            }

        };

}


/* =========================================================
   PRODUCT CARD ADD TO CART
========================================================= */

function setupProductCards() {

    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    productCards.forEach(
        card => {

            const addButton =
                card.querySelector(
                    ".cart-btn"
                );


            if (!addButton) return;


            addButton.onclick =
                function () {

                    const titleElement =
                        card.querySelector(
                            "h3"
                        );


                    if (!titleElement) return;


                    const productName =
                        titleElement
                            .textContent
                            .trim();


                    const productId =
                        Object.keys(
                            products
                        ).find(
                            id =>
                                products[id]
                                    .name ===
                                productName
                        );


                    if (productId) {

                        addToCart(
                            productId,
                            1
                        );

                    }

                };

        }
    );

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterCategory(
    category
) {

    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    cards.forEach(
        card => {

            const cardCategory =
                card.dataset.category;


            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display =
                    "block";

            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   SEARCH SYSTEM
========================================================= */

function setupSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const searchBtn =
        document.getElementById(
            "searchBtn"
        );


    if (!searchInput) return;


    function searchProducts() {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();


        const cards =
            document.querySelectorAll(
                ".product-card"
            );


        cards.forEach(
            card => {

                const text =
                    card.textContent
                        .toLowerCase();


                if (
                    text.includes(
                        searchTerm
                    )
                ) {

                    card.style.display =
                        "block";

                } else {

                    card.style.display =
                        "none";

                }

            }
        );

    }


    searchInput.addEventListener(
        "input",
        searchProducts
    );


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            searchProducts
        );

    }

}


/* =========================================================
   WISHLIST
========================================================= */

function setupWishlist() {

    const wishlistButtons =
        document.querySelectorAll(
            ".wishlist-btn"
        );


    wishlistButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    this.classList.toggle(
                        "active"
                    );


                    const icon =
                        this.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.classList.toggle(
                            "fa-regular"
                        );

                        icon.classList.toggle(
                            "fa-solid"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   HERO SLIDER
========================================================= */

function setupHeroSlider() {

    const slides =
        document.querySelectorAll(
            ".slide"
        );


    if (
        slides.length === 0
    ) {

        return;

    }


    let currentSlide = 0;


    /* Make first slide active */

    slides.forEach(
        slide =>
            slide.classList.remove(
                "active"
            )
    );


    slides[0].classList.add(
        "active"
    );


    setInterval(
        function () {

            slides[
                currentSlide
            ].classList.remove(
                "active"
            );


            currentSlide =
                (
                    currentSlide + 1
                ) %
                slides.length;


            slides[
                currentSlide
            ].classList.add(
                "active"
            );

        },
        4000
    );

}


/* =========================================================
   CART EVENTS
========================================================= */

function setupCart() {

    const cartIcon =
        document.getElementById(
            "cartIcon"
        );


    const closeCartBtn =
        document.getElementById(
            "closeCart"
        );


    const cartOverlay =
        document.getElementById(
            "cartOverlay"
        );


    if (cartIcon) {

        cartIcon.addEventListener(
            "click",
            openCart
        );

    }


    if (closeCartBtn) {

        closeCartBtn.addEventListener(
            "click",
            closeCart
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCart
        );

    }

}


/* =========================================================
   WHATSAPP CART CHECKOUT
========================================================= */

function setupCheckout() {

    const checkoutBtn =
        document.getElementById(
            "checkoutBtn"
        );


    if (!checkoutBtn) return;


    checkoutBtn.onclick =
        function () {

            if (
                cart.length === 0
            ) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }


            let message =
                "Hello STYLLIX BY SADIA!%0A%0AI want to order:%0A%0A";


            let total = 0;


            cart.forEach(
                item => {

                    const itemTotal =
                        item.price *
                        item.quantity;


                    total +=
                        itemTotal;


                    message +=
                        `${item.name} - Qty: ${item.quantity} - Rs. ${itemTotal.toLocaleString()}%0A`;

                }
            );


            message +=
                `%0ATotal: Rs. ${total.toLocaleString()}`;


            window.open(
                `https://wa.me/923281820980?text=${message}`,
                "_blank"
            );

        };

}


/* =========================================================
   CATEGORY BUTTON EVENTS
========================================================= */

function setupCategoryButtons() {

    const categoryButtons =
        document.querySelectorAll(
            "[data-filter]"
        );


    categoryButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    const category =
                        this.dataset.filter;


                    if (category) {

                        filterCategory(
                            category
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   ESC KEY - CLOSE CART
========================================================= */

function setupEscapeKey() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeCart();

            }

        }
    );

}


/* =========================================================
   START WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* CART */

        updateCartCount();

        renderCart();

        setupCart();

        setupCheckout();


        /* PRODUCTS */

        setupProductCards();

        setupCategoryButtons();


        /* SEARCH */

        setupSearch();


        /* WISHLIST */

        setupWishlist();


        /* HERO */

        setupHeroSlider();


        /* PRODUCT DETAIL */

        loadProductDetails();

        setupQuantity();


        /* KEYBOARD */

        setupEscapeKey();

    }
);