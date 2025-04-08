document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('category-filter');
    const productGrid = document.getElementById('product-grid');

    function fetchProducts(category = '') {
        const url = category ? `http://localhost:3000/api/products?category=${category}` : 'http://localhost:3000/api/products';
        fetch(url)
            .then(response => response.json())
            .then(products => {
                productGrid.innerHTML = '';
                products.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                        <a href="product-details.html?id=${product._id}" class="btn">View Details</a>
                    `;
                    productGrid.appendChild(card);
                });
            });
    }

    categoryFilter.addEventListener('change', () => {
        fetchProducts(categoryFilter.value);
    });

    fetchProducts();
});