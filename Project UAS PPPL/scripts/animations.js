// Animation and interaction effects

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeHoverEffects();
    initializeLoadingStates();
    initializeProgressBars();
});

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const slideUpObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                slideUpObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for slide-up animation
    const slideUpElements = document.querySelectorAll('.feature-card, .service-card, .value-card, .testimonial-card, .portfolio-item, .article-card');
    slideUpElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        slideUpObserver.observe(el);
    });

    // Timeline animation
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Stats animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatCard(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statCards = document.querySelectorAll('.stat-card, .stat-item');
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
}

// Animate stat cards
function animateStatCard(card) {
    const number = card.querySelector('.stat-number, [data-target]');
    if (!number) return;

    const target = parseInt(number.getAttribute('data-target')) || parseInt(number.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function updateNumber() {
        current += step;
        if (current < target) {
            number.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateNumber);
        } else {
            number.textContent = target.toLocaleString();
        }
    }

    // Add bounce effect to the card
    card.style.transform = 'scale(0.9)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    setTimeout(() => {
        card.style.transform = 'scale(1)';
        updateNumber();
    }, 200);
}

// Hover effects
function initializeHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .service-card, .portfolio-item, .value-card, .team-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'all 0.3s ease';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Icon hover effects
    const icons = document.querySelectorAll('.feature-icon, .service-icon, .value-icon');
    
    icons.forEach(icon => {
        const parent = icon.closest('.feature-card, .service-card, .value-card');
        
        if (parent) {
            parent.addEventListener('mouseenter', function() {
                icon.style.transform = 'scale(1.1) rotate(10deg)';
                icon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            });

            parent.addEventListener('mouseleave', function() {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });

    // Social link hover effects
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(10deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Loading states
function initializeLoadingStates() {
    // Simulate loading for dynamic content
    const loadingElements = document.querySelectorAll('[data-loading]');
    
    loadingElements.forEach(element => {
        element.classList.add('loading');
        
        // Remove loading state after random delay
        setTimeout(() => {
            element.classList.remove('loading');
            element.classList.add('loaded');
        }, Math.random() * 1000 + 500);
    });
}

// Progress bars
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress') || '0';
                
                bar.style.width = '0%';
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
                
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Parallax scrolling effect
function initializeParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', debounce(updateParallax, 10));
}

// Floating animation
function initializeFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        element.style.animation = `floating 3s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Add floating keyframes
const floatingKeyframes = `
@keyframes floating {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}
`;

// Inject keyframes into stylesheet
function injectFloatingKeyframes() {
    const style = document.createElement('style');
    style.textContent = floatingKeyframes;
    document.head.appendChild(style);
}

// Ripple effect for buttons
function initializeRippleEffect() {
    const rippleButtons = document.querySelectorAll('.cta-button, .filter-btn');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple styles
const rippleStyles = `
.cta-button, .filter-btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

function injectRippleStyles() {
    const style = document.createElement('style');
    style.textContent = rippleStyles;
    document.head.appendChild(style);
}

// Smooth reveal animation
function initializeSmoothReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Magnetic effect for certain elements
function initializeMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.transition = 'transform 0.3s ease';
        });
    });
}

// Text animation effects
function initializeTextAnimations() {
    const animatedTexts = document.querySelectorAll('.animate-text');
    
    const textObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                const letters = text.textContent.split('');
                text.innerHTML = '';
                
                letters.forEach((letter, index) => {
                    const span = document.createElement('span');
                    span.textContent = letter === ' ' ? '\u00A0' : letter;
                    span.style.opacity = '0';
                    span.style.transform = 'translateY(50px)';
                    span.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
                    text.appendChild(span);
                    
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, 100);
                });
                
                textObserver.unobserve(text);
            }
        });
    }, { threshold: 0.5 });
    
    animatedTexts.forEach(text => {
        textObserver.observe(text);
    });
}

// Initialize all animation effects
document.addEventListener('DOMContentLoaded', function() {
    injectFloatingKeyframes();
    injectRippleStyles();
    initializeFloatingAnimation();
    initializeRippleEffect();
    initializeSmoothReveal();
    initializeMagneticEffect();
    initializeTextAnimations();
    initializeParallaxScrolling();
});

// Utility function for debouncing
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