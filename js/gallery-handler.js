/**
 * Gallery and Booking Functionality for Papa Remo Beach Website
 * 
 * This script handles:
 * 1. Image gallery lightbox functionality
 * 2. Booking button interactions
 * 3. Form validation for booking requests
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightbox if it exists on the page
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': "Image %1 of %2",
            'fadeDuration': 300,
            'imageFadeDuration': 300,
            'positionFromTop': 100
        });
    }
    
    // Handle booking buttons
    const bookingButtons = document.querySelectorAll('.book-table-btn, .book-wedding-btn, .btn');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // If the button doesn't link directly to contact.html, prevent default
            if (!this.getAttribute('href') || !this.getAttribute('href').includes('contact.html')) {
                e.preventDefault();
                
                // Store booking information in session storage to pre-fill the contact form
                const buttonText = this.textContent.trim();
                let bookingType = '';
                
                if (buttonText.includes('Lunch')) {
                    bookingType = 'Lunch Reservation';
                } else if (buttonText.includes('Dinner')) {
                    bookingType = 'Dinner Reservation';
                } else if (buttonText.includes('Wedding') || buttonText.includes('Package')) {
                    bookingType = 'Wedding Inquiry';
                } else if (buttonText.includes('Table')) {
                    bookingType = 'Table Reservation';
                } else {
                    bookingType = 'General Inquiry';
                }
                
                // Store the booking type to be used on the contact page
                sessionStorage.setItem('bookingType', bookingType);
                
                // Redirect to contact page
                window.location.href = 'contact.html';
            }
        });
    });
    
    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-caption').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-caption').style.transform = 'translateY(100%)';
        });
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add responsive menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('active');
            
            // Change icon based on state
            const icon = this.querySelector('i');
            if (expanded) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }
});

// Function to validate booking form
function validateBookingForm(form) {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const date = form.querySelector('input[name="date"]');
    
    let isValid = true;
    
    // Simple validation
    if (!name.value.trim()) {
        markInvalid(name, 'Please enter your name');
        isValid = false;
    } else {
        markValid(name);
    }
    
    if (!email.value.trim()) {
        markInvalid(email, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        markInvalid(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        markValid(email);
    }
    
    if (date && !date.value) {
        markInvalid(date, 'Please select a date');
        isValid = false;
    } else if (date) {
        markValid(date);
    }
    
    return isValid;
}

// Helper function to validate email format
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Helper functions to mark form fields as valid or invalid
function markInvalid(field, message) {
    field.classList.add('invalid');
    
    // Create or update error message
    let errorMessage = field.parentNode.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        field.parentNode.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

function markValid(field) {
    field.classList.remove('invalid');
    
    // Remove error message if it exists
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}