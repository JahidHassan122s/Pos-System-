let cart = [];

// Add product to cart
function addToCart(productName, price) {
    let existing = cart.find(item => item.name === productName);
    if (existing) {
        existing.qty += 1;
        existing.total = existing.qty * existing.price;
    } else {
        cart.push({ name: productName, qty: 1, price: price, total: price });
    }
    renderCart();
}

// Render cart table
function renderCart() {
    let cartBody = document.getElementById("cart-body");
    cartBody.innerHTML = "";
    let subtotal = 0;
    cart.forEach((item, index) => {
        subtotal += item.total;
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <input type="number" value="${item.qty}" min="1" onchange="updateQty(${index}, this.value)">
            </td>
            <td>${item.price}</td>
            <td>${item.total}</td>
        `;
        cartBody.appendChild(row);
    });
    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("total").innerText = subtotal; // Discount can be added later
}

// Update quantity
function updateQty(index, qty) {
    cart[index].qty = parseInt(qty);
    cart[index].total = cart[index].qty * cart[index].price;
    renderCart();
}

// Payment buttons
function pay(method) {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    let total = parseFloat(document.getElementById("total").innerText);
    alert(`Payment of ${total} BDT received via ${method}`);
    cart = []; // Clear cart after payment
    renderCart();
}

// Attach Add buttons dynamically if using product panel
document.querySelectorAll(".product-item button").forEach((btn) => {
    btn.addEventListener("click", () => {
        let productDiv = btn.parentElement;
        let [name, price] = productDiv.textContent.split(" - ");
        price = parseFloat(price.replace(" BDT", ""));
        addToCart(name.trim(), price);
    });
});

// Attach payment buttons
document.querySelectorAll(".payment-buttons button").forEach((btn) => {
    btn.addEventListener("click", () => pay(btn.textContent));
});