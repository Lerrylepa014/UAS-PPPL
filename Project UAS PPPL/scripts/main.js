// Main JavaScript functionality

// Global variables
let currentTestimonial = 1;
let testimonialInterval;
let isScrolling = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHero();
    initializeAnimations();
    initializeTestimonials();
    initializeScrollEffects();
    initializeFeatureCards();
    initializeCounters();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Hero section functionality
function initializeHero() {
    initializeTypingEffect();
    initializeParallax();
}

function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.getAttribute('data-text');
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(() => {
                index = 0;
                typingElement.textContent = '';
                setTimeout(typeText, 500);
            }, 3000);
        }
    }
    
    typeText();
}

function initializeParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
            const yPos = -(scrollTop * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Animation initialization
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .feature-card, .service-card, .portfolio-item, .value-card, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));
}

// Testimonial carousel
function initializeTestimonials() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialSlides.length === 0) return;

    function showTestimonial(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (n > testimonialSlides.length) currentTestimonial = 1;
        if (n < 1) currentTestimonial = testimonialSlides.length;
        
        testimonialSlides[currentTestimonial - 1].classList.add('active');
        if (dots[currentTestimonial - 1]) {
            dots[currentTestimonial - 1].classList.add('active');
        }
    }

    function nextTestimonial() {
        currentTestimonial++;
        showTestimonial(currentTestimonial);
    }

    function previousTestimonial() {
        currentTestimonial--;
        showTestimonial(currentTestimonial);
    }

    // Auto-rotate testimonials
    function startTestimonialRotation() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopTestimonialRotation() {
        clearInterval(testimonialInterval);
    }

    // Start auto-rotation
    startTestimonialRotation();

    // Pause on hover
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', stopTestimonialRotation);
        testimonialCarousel.addEventListener('mouseleave', startTestimonialRotation);
    }

    // Global functions for buttons
    window.nextTestimonial = nextTestimonial;
    window.previousTestimonial = previousTestimonial;
    window.currentTestimonial = function(n) {
        currentTestimonial = n;
        showTestimonial(currentTestimonial);
    };
}

// Scroll effects
function initializeScrollEffects() {
    // Smooth scroll for CTA buttons
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
}

// Feature cards interaction
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('[data-target]');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function updateCounter() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    updateCounter();
}

// Filter functionality for services and portfolio
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Price calculator
function initializePriceCalculator() {
    const amountInput = document.getElementById('transfer-amount');
    const typeSelect = document.getElementById('transfer-type');
    const currencySelect = document.getElementById('currency-pair');
    
    if (!amountInput) return;

    function updateCalculation() {
        const amount = parseFloat(amountInput.value) || 0;
        const type = typeSelect.value;
        const currency = currencySelect.value;
        
        let fee = 2.99;
        let rate = 1.08;
        
        // Calculate based on transfer type
        switch(type) {
            case 'international':
                fee = Math.max(5.99, amount * 0.01);
                break;
            case 'express':
                fee = Math.max(9.99, amount * 0.015);
                break;
        }
        
        // Calculate based on currency
        switch(currency) {
            case 'usd-eur':
                rate = 0.85;
                break;
            case 'usd-gbp':
                rate = 0.73;
                break;
            case 'usd-jpy':
                rate = 110.25;
                break;
            case 'eur-gbp':
                rate = 0.86;
                break;
        }
        
        const totalSend = amount + fee;
        const receive = amount * rate;
        
        document.getElementById('transfer-fee').textContent = `$${fee.toFixed(2)}`;
        document.getElementById('exchange-rate').textContent = rate.toFixed(2);
        document.getElementById('send-amount').textContent = `$${totalSend.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
        
        const currencySymbol = currency.includes('eur') ? '€' : currency.includes('gbp') ? '£' : currency.includes('jpy') ? '¥' : '$';
        document.getElementById('receive-amount').textContent = `${currencySymbol}${receive.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    }
    
    [amountInput, typeSelect, currencySelect].forEach(element => {
        element.addEventListener('change', updateCalculation);
        element.addEventListener('input', updateCalculation);
    });
    
    updateCalculation();
}

// Package customization
function initializePackageCustomization() {
    const form = document.getElementById('customization-form');
    if (!form) return;

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    const selectedServices = document.getElementById('selected-services');
    const totalPrice = document.getElementById('total-price');

    function updatePackage() {
        let total = 0;
        const services = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseFloat(checkbox.getAttribute('data-price')) || 0;
                const serviceName = checkbox.parentElement.textContent.trim();
                
                total += price;
                services.push({
                    name: serviceName,
                    price: price
                });
            }
        });

        selectedServices.innerHTML = services.map(service => 
            `<div class="service-item">${service.name} - ${service.price > 0 ? `$${service.price}/month` : 'Free'}</div>`
        ).join('');

        totalPrice.textContent = `$${total.toFixed(2)}`;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePackage);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest! We will contact you with a custom quote.');
    });

    updatePackage();
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize filters if on services or portfolio page
    if (document.querySelector('.filter-btn')) {
        initializeFilters();
    }
    
    // Initialize price calculator if on services page
    if (document.getElementById('transfer-amount')) {
        initializePriceCalculator();
    }
    
    // Initialize package customization if on services page
    if (document.getElementById('customization-form')) {
        initializePackageCustomization();
    }
});

// Utility functions
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

// Performance optimization
window.addEventListener('scroll', debounce(() => {
    // Handle scroll events with debouncing
}, 10));