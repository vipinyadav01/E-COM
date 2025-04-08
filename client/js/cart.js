let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

document.addEventListener('DOMContentLoaded', displayCart);