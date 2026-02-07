// ========================================
// Portfolio Website Interactive Features
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initFormValidation();
    initScrollToTop();
    initMobileMenu();
});

// ========================================
// Navigation Features
// ========================================
function initNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const menu = document.querySelector('.menu');
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                }
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    // Create hamburger button if it doesn't exist
    const nav = document.querySelector('.navigation');
    
    if (!document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle menu');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Insert before the menu
        const menu = document.querySelector('.menu');
        nav.insertBefore(menuToggle, menu);
        
        // Toggle menu on click
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            const isExpanded = menu.classList.contains('active');
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-out');
        observer.observe(section);
    });
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('fade-out');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ========================================
// Form Validation & Submission
// ========================================
function initFormValidation() {
    const form = document.querySelector('form');
    
    if (form) {
        const emailInput = document.querySelector('#email');
        const messageInput = document.querySelector('#message');
        
        // Real-time validation
        emailInput.addEventListener('blur', function() {
            validateEmail(this);
        });
        
        messageInput.addEventListener('blur', function() {
            validateMessage(this);
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isEmailValid = validateEmail(emailInput);
            const isMessageValid = validateMessage(messageInput);
            
            if (isEmailValid && isMessageValid) {
                handleFormSubmission(form);
            }
        });
    }
}

function validateEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(input.value.trim());
    
    showValidation(input, isValid, 'Please enter a valid email address');
    return isValid;
}

function validateMessage(input) {
    const isValid = input.value.trim().length >= 10;
    
    showValidation(input, isValid, 'Message must be at least 10 characters');
    return isValid;
}

function showValidation(input, isValid, errorMessage) {
    // Remove existing validation messages
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    input.classList.remove('error', 'success');
    
    if (!isValid) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        input.parentElement.appendChild(errorDiv);
    } else {
        input.classList.add('success');
    }
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showSuccessMessage(form);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Remove validation classes
        form.querySelectorAll('.success, .error').forEach(el => {
            el.classList.remove('success', 'error');
        });
    }, 1500);
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = '✓ Message sent successfully!';
    
    form.parentElement.insertBefore(successDiv, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ========================================
// Scroll to Top Button
// ========================================
function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.innerHTML = '↑';
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Additional Interactive Features
// ========================================

// Add hover effect to project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Typing effect for banner text (optional enhancement)
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Add parallax effect to banner
window.addEventListener('scroll', function() {
    const banner = document.querySelector('.banner');
    if (banner) {
        const scrolled = window.scrollY;
        banner.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});