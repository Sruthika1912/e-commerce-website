// User Authentication Logic

// Register Function
function register() {
    let username = document.getElementById("reg-username").value;
    let password = document.getElementById("reg-password").value;

    if (username === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Registration successful! Please login.");
    window.location.href = "index.html";
}

// Login Function
function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let storedUsername = localStorage.getItem("username");
    let storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem("loggedIn", true);
        alert("Login successful!");
        window.location.href = "ecommerce.html";
    } else {
        alert("Invalid username or password");
    }
}

// Check if user is logged in before accessing ecommerce.html
function checkLogin() {
    if (!localStorage.getItem("loggedIn")) {
        alert("You must be logged in first!");
        window.location.href = "index.html";
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

// Load products on page load
// Ensure that products are displayed only after the DOM is fully loaded
window.onload = function() {
    if (document.getElementById("product-list")) {
        displayProducts();
    }
    if (window.location.pathname.includes("ecommerce.html")) {
        checkLogin();
    }
};

function displayProducts() {
    let productContainer = document.getElementById("product-list");

    if (!productContainer) {
        console.error("Error: product-list element not found.");
        return;
    }

    productContainer.innerHTML = ""; // Clear previous products

    let products = [
        { id: 1, name: "Laptop", price: 50000 },
        { id: 2, name: "Mobile", price: 20000 },
        { id: 3, name: "Headphones", price: 2000 },
        { id: 4, name: "Smart Watch", price: 5000 },
        { id: 5, name: "Wireless Mouse", price: 800 }
    ];

    products.forEach((product) => {
        let productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>`;
        productContainer.appendChild(productElement);
    });
}


let products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Smart Watch", price: 5000 },
    { id: 5, name: "Wireless Mouse", price: 800 },
];

let cart = [];

// Display products
function displayProducts() {
    let productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";
    
    products.forEach((product) => {
        let productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Add to Cart
function addToCart(productId) {
    let product = products.find((p) => p.id === productId);
    cart.push(product);
    document.getElementById("cart-count").innerText = cart.length;
    alert(`${product.name} added to cart!`);
}

// View Cart
function viewCart() {
    let cartModal = document.getElementById("cart-modal");
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((p) => {
        total += p.price;
        let listItem = document.createElement("li");
        listItem.innerText = `${p.name} - ₹${p.price}`;
        cartItems.appendChild(listItem);
    });

    cartTotal.innerText = `Total: ₹${total}`;
    cartModal.style.display = "block";
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order placed successfully!");
    cart = [];
    document.getElementById("cart-count").innerText = "0";
    closeCart();
}

// Cancel Order
function cancelOrder() {
    cart = [];
    document.getElementById("cart-count").innerText = "0";
    alert("Order cancelled!");
    closeCart();
}

// Close Cart
function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}
