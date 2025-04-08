document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('create-product-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const product = {
            name: document.getElementById('name').value,
            price: parseFloat(document.getElementById('price').value),
            description: document.getElementById('description').value,
            image: document.getElementById('image').value,
            category: document.getElementById('category').value,
            featured: document.getElementById('featured').checked,
        };

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(product),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Product created successfully!');
                window.location.href = 'products.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product');
        }
    });
});