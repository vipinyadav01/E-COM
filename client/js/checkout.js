document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userDetails = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
    };
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: 'user_id_here',
            products: cart.map(item => ({ productId: item._id, quantity: item.quantity })),
            total,
        }),
    });

    const { orderId, key } = await response.json();

    const options = {
        key,
        amount: total * 100,
        currency: 'INR',
        order_id: orderId,
        name: 'Minimalist Store',
        description: 'Order Payment',
        handler: function (response) {
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        },
        prefill: {
            name: userDetails.name,
            email: userDetails.email,
        },
        theme: {
            color: '#007bff',
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function () {
        alert('Payment failed. Please try again.');
    });
    rzp.open();
});