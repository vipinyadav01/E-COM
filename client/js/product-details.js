document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = `$${product.price}`;
            document.getElementById('product-description').textContent = product.description;

            document.getElementById('add-to-cart').addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item._id === product._id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Added to cart!');
            });
        });
});