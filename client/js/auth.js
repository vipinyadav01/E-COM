document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();

    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    });

    document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                window.location.href = 'login.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Signup failed. Please try again.');
        }
    });

    if (window.location.pathname.includes('profile.html')) {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        fetch('http://localhost:3000/api/auth/profile', {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(response => response.json())
            .then(user => {
                document.getElementById('profile-name').textContent = user.name;
                document.getElementById('profile-email').textContent = user.email;
            })
            .catch(() => {
                alert('Failed to load profile');
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            });
    }
});

