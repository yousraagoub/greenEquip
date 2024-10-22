function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get existing cart or initialize as empty array
    cart.push(product); // Add the new product to the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Store the updated cart in localStorage
    updateCartCount(); // Update the cart count badge
    alert(`${product.name} has been added to your cart!`);
}

// Function to load the cart items from localStorage and display them
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ""; // Clear previous items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price;
        cartItemsContainer.innerHTML += `
            <div class="card mt-2">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Price: $${item.price.toFixed(2)}</p>
                </div>
            </div>
        `;
    });

    document.getElementById('total').innerHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    loadCart(); // Refresh the cart display
    updateCartCount(); // Update the cart count badge
    document.getElementById('total').innerHTML = `<h4>Total: $0.00</h4>`; // Reset total price display to zero
}

// Function to update the cart count badge
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.length;
    document.querySelector('.badge').textContent = cartCount; // Update the badge with the number of items
}

// Load the cart items when the page is loaded
window.onload = function () {  
    updateCartCount(); // Update the cart count badge
    loadCart();        // Call the existing loadCart function
};


// Form submission handler
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    let form = event.target;
    let formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Thank you for your message! We will get back to you soon.");
            form.reset();
            
        } else {
            alert("Oops! There was a problem submitting your form.");
        }
    }).catch(error => {
        alert("Oops! There was a problem submitting your form.");
    });
});


