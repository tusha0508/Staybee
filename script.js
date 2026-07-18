// ===================== FORM SUBMISSION =====================
function showFormMessage(form, text, type) {
    const existing = form.querySelector('.form-message');
    if (existing) {
        existing.remove();
    }
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    form.insertBefore(message, form.firstChild);
}

async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const btn = form.querySelector('.submit-btn');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.classList.add('loading');
    btn.textContent = 'Sending...';

    const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim(),
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Unable to send message.');
        }

        showFormMessage(form, '✓ We have received your enquiry. We will get in touch with you in 3 working days.', 'success');
        form.reset();
    } catch (error) {
        console.error(error);
        showFormMessage(form, 'Sorry, there was a problem sending your message. Please try again later.', 'error');
    } finally {
        btn.disabled = false;
        btn.classList.remove('loading');
        btn.textContent = originalText;
    }
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
}

// ===================== SMOOTH SCROLL ENHANCEMENT =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===================== INTERSECTION OBSERVER FOR ANIMATIONS =====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = getAnimation(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function getAnimation(element) {
    if (element.classList.contains('service-card')) {
        return 'slideUp 0.6s ease forwards';
    } else if (element.classList.contains('feature-item')) {
        return 'slideUp 0.6s ease forwards';
    } else if (element.classList.contains('pricing-card')) {
        return 'slideUp 0.6s ease forwards';
    } else if (element.classList.contains('stat-item')) {
        return 'slideUp 0.6s ease forwards';
    } else if (element.classList.contains('info-item')) {
        return 'slideUp 0.6s ease forwards';
    }
    return 'none';
}

// Observe all animatable elements
document.querySelectorAll('.service-card, .feature-item, .pricing-card, .stat-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===================== NAVBAR BACKGROUND ON SCROLL =====================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ===================== COUNTER ANIMATION =====================
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const targets = [500, 4.9, 95, 2];
    const suffixes = ['+', '/5', '%', '+'];
    const labels = ['Properties', 'Rating', 'Occupancy', 'Revenue'];
    
    statNumbers.forEach((element, index) => {
        const target = targets[index];
        const suffix = suffixes[index];
        const isDecimal = target % 1 !== 0;
        
        let current = 0;
        const increment = target / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            element.textContent = isDecimal 
                ? current.toFixed(1) + suffix 
                : Math.floor(current) + suffix;
        }, 30);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
let counterStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counterStarted) {
        counterStarted = true;
        animateCounters();
    }
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================== RESPONSIVE MOBILE MENU =====================
// Add mobile menu toggle if needed
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const menu = document.querySelector('.nav-menu');
    
    // Check if we need mobile menu (this is optional)
    if (window.innerWidth > 768) {
        return;
    }
    
    // Mobile menu logic can be added here if needed
}

window.addEventListener('load', setupMobileMenu);
window.addEventListener('resize', setupMobileMenu);

// ===================== LAZY LOADING IMAGES =====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================== UTILITY: SMOOTH SCROLL POLYFILL =====================
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScroll = function(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    window.smoothScroll = smoothScroll;
}

// ===================== KEYBOARD NAVIGATION =====================
document.addEventListener('keydown', (e) => {
    // Escape key to close any modals (if added in future)
    if (e.key === 'Escape') {
        // Handle escape key
    }
    
    // Tab key for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('outline-visible');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('outline-visible');
});

// ===================== PERFORMANCE: DEBOUNCE SCROLL =====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================== ACCESSIBILITY: FOCUS MANAGEMENT =====================
function manageA11y() {
    const buttons = document.querySelectorAll('button, a[href]');
    
    buttons.forEach(btn => {
        btn.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary)';
        });
        
        btn.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

window.addEventListener('load', manageA11y);

// ===================== PERFORMANCE MONITORING =====================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    });
}

// ===================== SERVICE WORKER (PWA SUPPORT) =====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the line below if you add a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ===================== MEMORY LEAK PREVENTION =====================
window.addEventListener('beforeunload', () => {
    // Clean up any large objects or timers
    document.querySelectorAll('[data-cleanup]').forEach(el => {
        el.remove();
    });
});

// ===================== ANALYTICS PLACEHOLDER =====================
// Add your analytics tracking here
function trackEvent(category, action, label) {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track CTA button clicks
document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('engagement', 'cta_click', 'main_cta');
    });
});

console.log('🏡 Staybee website loaded successfully!');
