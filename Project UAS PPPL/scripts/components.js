// Component-specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeChatWidget();
    initializeFAQ();
    initializeLightbox();
    initializeModal();
    initializeBlogComponents();
    initializeMapComponents();
    initializeServiceComponents();
    initializePortfolioComponents();
});

// Contact Form Validation and Submission
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, select, textarea');
    const submitBtn = document.getElementById('submit-btn');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    // Character counter for message
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 450) {
                charCount.style.color = '#ef4444';
            } else if (count > 400) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = '#6b7280';
            }
        });
    }

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearError(this);
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            submitForm();
        }
    });

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        clearError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }

        // Specific field validations
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (value && value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'phone':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (value && !phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                    errorMessage = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;

            case 'message':
                if (value && value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                } else if (value.length > 500) {
                    errorMessage = 'Message must be less than 500 characters';
                    isValid = false;
                }
                break;

            case 'subject':
                if (field.hasAttribute('required') && !value) {
                    errorMessage = 'Please select a subject';
                    isValid = false;
                }
                break;

            case 'privacy':
                if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
                    errorMessage = 'You must agree to the privacy policy';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            showError(field, errorMessage);
        }

        return isValid;
    }

    function showError(field, message) {
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        field.classList.add('error');
    }

    function clearError(field) {
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        field.classList.remove('error');
    }

    function submitForm() {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';

        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            charCount.textContent = '0';
            
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }, 2000);
    }
}

// Chat Widget
function initializeChatWidget() {
    const chatWidget = document.getElementById('chat-widget');
    const chatBody = document.getElementById('chat-body');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatToggleIcon = document.getElementById('chat-toggle-icon');

    if (!chatWidget) return;

    let isOpen = false;

    window.toggleChat = function() {
        isOpen = !isOpen;
        
        if (isOpen) {
            chatBody.style.display = 'block';
            setTimeout(() => {
                chatBody.style.opacity = '1';
                chatBody.style.transform = 'translateY(0)';
            }, 10);
            chatToggleIcon.style.transform = 'rotate(180deg)';
        } else {
            chatBody.style.opacity = '0';
            chatBody.style.transform = 'translateY(20px)';
            setTimeout(() => {
                chatBody.style.display = 'none';
            }, 300);
            chatToggleIcon.style.transform = 'rotate(0deg)';
        }
    };

    window.sendMessage = function() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "Thank you for your message! A representative will be with you shortly.",
                "I understand you need help. Let me connect you with a specialist.",
                "That's a great question! Our team can provide detailed information about that.",
                "I'm here to help! What specific information are you looking for?",
                "Thanks for reaching out! We'll make sure to address your concern."
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 2000);
    };

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `
            <p>${text}</p>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
        `;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        chatMessages.appendChild(messageDiv);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// FAQ Functionality
function initializeFAQ() {
    const faqSearch = document.getElementById('faq-search');
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) return;

    // Toggle FAQ items
    window.toggleFAQ = function(element) {
        const faqItem = element.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = element.querySelector('i');
        
        faqItem.classList.toggle('active');
        
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        } else {
            answer.style.maxHeight = '0';
            icon.style.transform = 'rotate(0deg)';
        }
    };

    // Search functionality
    if (faqSearch) {
        faqSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                const keywords = item.getAttribute('data-keywords') || '';
                
                const isVisible = question.includes(searchTerm) || 
                                answer.includes(searchTerm) || 
                                keywords.includes(searchTerm);
                
                item.style.display = isVisible ? 'block' : 'none';
            });
        });
    }
}

// Lightbox functionality
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    window.openLightbox = function(imageSrc) {
        const lightboxImage = document.getElementById('lightbox-image');
        lightboxImage.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Close on backdrop click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('portfolio-modal');
    if (!modal) return;

    const portfolioData = {
        techstart: {
            title: 'TechStart Payment Gateway',
            category: 'Startup',
            description: 'We implemented a comprehensive payment processing solution for TechStart, a rapidly growing e-commerce platform. The solution included multi-currency support, fraud detection, and seamless integration with their existing systems.',
            results: [
                'Reduced payment processing time by 60%',
                'Increased conversion rate by 35%',
                'Decreased transaction fees by 20%',
                'Achieved 99.9% uptime'
            ],
            technologies: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'Stripe API'],
            timeline: '3 months',
            testimonial: 'FinFlow transformed our payment processing completely. The integration was seamless and the results exceeded our expectations.'
        },
        globalbank: {
            title: 'Global Bank Digital Transformation',
            category: 'Banking',
            description: 'Led a comprehensive digital transformation project for Global Bank, modernizing their core banking systems and implementing new digital services for their customers.',
            results: [
                'Modernized core banking infrastructure',
                'Improved customer satisfaction by 45%',
                'Reduced operational costs by 30%',
                'Enhanced security protocols'
            ],
            technologies: ['Java', 'Spring Boot', 'Oracle', 'Angular', 'Docker'],
            timeline: '18 months',
            testimonial: 'The digital transformation exceeded all our expectations and positioned us for future growth.'
        },
        // Add more portfolio data as needed
    };

    window.openModal = function(projectId) {
        const data = portfolioData[projectId];
        if (!data) return;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>${data.title}</h2>
            <div class="modal-meta">
                <span class="category ${data.category.toLowerCase()}">${data.category}</span>
                <span class="timeline"><i class="fas fa-clock"></i> ${data.timeline}</span>
            </div>
            <p class="project-description">${data.description}</p>
            
            <h3>Key Results</h3>
            <ul class="results-list">
                ${data.results.map(result => `<li>${result}</li>`).join('')}
            </ul>
            
            <h3>Technologies Used</h3>
            <div class="tech-tags">
                ${data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <div class="client-testimonial">
                <h3>Client Testimonial</h3>
                <blockquote>"${data.testimonial}"</blockquote>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Blog Components
function initializeBlogComponents() {
    initializeBlogSearch();
    initializeBlogFilters();
    initializePagination();
    initializeSocialShare();
    initializeNewsletterSignup();
}

function initializeBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    const articles = document.querySelectorAll('.article-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            const category = article.querySelector('.category').textContent.toLowerCase();
            
            const isVisible = title.includes(searchTerm) || 
                            content.includes(searchTerm) || 
                            category.includes(searchTerm);
            
            article.style.display = isVisible ? 'block' : 'none';
        });
    });
}

function initializeBlogFilters() {
    const filterButtons = document.querySelectorAll('.blog-filters .filter-btn');
    const articles = document.querySelectorAll('.article-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles
            articles.forEach(article => {
                const category = article.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    article.style.display = 'block';
                    setTimeout(() => {
                        article.style.opacity = '1';
                        article.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    article.style.opacity = '0';
                    article.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        article.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializePagination() {
    const pageNumbers = document.querySelectorAll('.page-number');
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');

    if (!pageNumbers.length) return;

    let currentPage = 1;
    const totalPages = 8;

    window.previousPage = function() {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    window.nextPage = function() {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    function goToPage(page) {
        currentPage = page;
        
        // Update active page number
        pageNumbers.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-page="${page}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Update prev/next button states
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }
        
        // Simulate page content loading
        const articlesGrid = document.getElementById('articles-grid');
        if (articlesGrid) {
            articlesGrid.style.opacity = '0.5';
            setTimeout(() => {
                articlesGrid.style.opacity = '1';
            }, 300);
        }
    }

    // Initialize page number click handlers
    pageNumbers.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = parseInt(this.getAttribute('data-page'));
            goToPage(page);
        });
    });
}

function initializeSocialShare() {
    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const articleTitle = this.closest('.article-card').querySelector('h3').textContent;
            const currentUrl = window.location.href;

            let shareUrl = '';
            
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

function initializeNewsletterSignup() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletter-email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate newsletter signup
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Map Components
function initializeMapComponents() {
    const officeCards = document.querySelectorAll('.office-card');
    
    window.showLocation = function(office) {
        // Remove active class from all cards
        officeCards.forEach(card => card.classList.remove('active'));
        
        // Add active class to selected card
        const selectedCard = document.querySelector(`[data-office="${office}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
        }
        
        // In a real implementation, you would update the map view here
        console.log(`Showing location: ${office}`);
    };
}

// Service Components
function initializeServiceComponents() {
    // Already initialized in main.js, but add any additional service-specific functionality here
}

// Portfolio Components  
function initializePortfolioComponents() {
    // Portfolio filtering is already handled in main.js
    // Add any additional portfolio-specific functionality here
}