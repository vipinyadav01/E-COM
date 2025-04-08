// Ensure JWT decode is available
if (typeof jwt_decode === 'undefined') {
    console.error('JWT decode library not loaded. Please check your script includes.');
}

document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    setupMobileNavToggle();

    // Login
    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Login failed');
        }
    });

    // Signup
    document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                window.location.href = 'login.html';
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Signup failed');
        }
    });

    // Profile page
    if (window.location.pathname.includes('profile.html')) {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        fetch('http://localhost:3000/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(user => {
                document.getElementById('profile-name').textContent = user.name;
                document.getElementById('profile-email').textContent = user.email;
            })
            .catch(err => {
                console.error('Error loading profile:', err);
                alert('Session expired. Please log in again.');
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            });
    }
});

// Setup mobile navigation toggle
function setupMobileNavToggle() {
    const hamburgerBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('open');
        });
        
        // Close mobile menu when clicking on a link
        const navLinkElements = navLinks.querySelectorAll('a');
        navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('open');
            });
        });
    }
}

// Navbar update based on login
function updateNavbar() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) {
        console.error('Navigation links element not found');
        return;
    }
    
    // Create basic navigation links
    const basicLinks = `
        <li><a href="index.html">Home</a></li>
        <li><a href="products.html">Products</a></li>
        <li><a href="cart.html">Cart</a></li>
    `;
    
    const token = localStorage.getItem('token');

    if (token && typeof jwt_decode !== 'undefined') {
        try {
            const decoded = jwt_decode(token);
            navLinks.innerHTML = basicLinks + `
                <li><span>Hello, ${decoded.name}</span></li>
                <li><a href="profile.html">Profile</a></li>
                <li><a href="create-product.html">Create Product</a></li>
                <li><a href="#" id="logout">Logout</a></li>
            `;
            document.getElementById('logout')?.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                window.location.href = 'index.html';
            });
        } catch (err) {
            console.error('Invalid token:', err);
            localStorage.removeItem('token');
            navLinks.innerHTML = basicLinks + getDefaultAuthLinks();
        }
    } else {
        navLinks.innerHTML = basicLinks + getDefaultAuthLinks();
    }
}

function getDefaultAuthLinks() {
    return `
        <li><a href="login.html">Login</a></li>
        <li><a href="signup.html">Signup</a></li>
    `;
}

// Sticky navbar effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});