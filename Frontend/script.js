// ========================================
// SMART CITY GUIDE - JAVASCRIPT
// ========================================

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    const start = parseFloat(element.textContent) || 0;
    const isDecimal = target % 1 !== 0;
    const increment = (target - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }, 16);
}

// Trigger counters when visible
const stats = document.querySelectorAll('.stat-number');
if (stats.length > 0) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseFloat(entry.target.dataset.target);
                animateCounter(entry.target, target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

// Search Functionality
function searchCities() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
        // Store search query and redirect to cities page
        sessionStorage.setItem('searchQuery', searchInput.value);
        window.location.href = 'cities.html';
    } else {
        window.location.href = 'cities.html';
    }
}

// Search on Enter key
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchCities();
        }
    });
}

// Filter cities on cities page
if (window.location.pathname.includes('cities.html')) {
    const searchQuery = sessionStorage.getItem('searchQuery');
    if (searchQuery) {
        filterCities(searchQuery);
        sessionStorage.removeItem('searchQuery');
    }
}

function filterCities(query) {
    const cards = document.querySelectorAll('.city-card');
    const searchLower = query.toLowerCase();

    cards.forEach(card => {
        const name = card.querySelector('.city-name')?.textContent.toLowerCase();
        const desc = card.querySelector('.city-desc')?.textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.attraction-tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');

        const matches = name?.includes(searchLower) ||
            desc?.includes(searchLower) ||
            tags.includes(searchLower);

        const parentCol = card.closest('[class*="col-"]');
        if (parentCol) {
            parentCol.style.display = matches ? 'block' : 'none';
        } else {
            card.style.display = matches ? 'block' : 'none';
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade In Animation on Scroll
const fadeElements = document.querySelectorAll('.city-card, .section');
if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
}

// Contact Form Validation
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Success message
        alert(`Thank you ${name}! Your message has been sent successfully. We'll get back to you soon at ${email}`);
        contactForm.reset();
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize - Run on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Smart City Guide loaded successfully!');

    // Add active class to current page nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
