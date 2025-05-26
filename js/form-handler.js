/**
 * Papa Remo Beach Website - Form Handler
 * Manages form submissions and validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all forms that need validation
    const forms = document.querySelectorAll('.needs-validation');
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        setupFormValidation(contactForm);
        
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm(this)) {
                // Simulate form submission (in a real implementation, this would send data to a server)
                const formData = new FormData(this);
                const submitButton = this.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                const formResponse = document.getElementById('form-response');
                
                // Collect form data for display
                const name = formData.get('name');
                const email = formData.get('email');
                const inquiryType = formData.get('inquiry-type');
                
                // Show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Hide any existing response
                formResponse.style.display = 'none';
                
                // Simulate server request with timeout
                setTimeout(() => {
                    // Reset form
                    this.reset();
                    
                    // Remove validation classes
                    const inputs = this.querySelectorAll('input, textarea, select');
                    inputs.forEach(input => {
                        input.classList.remove('is-valid');
                    });
                    
                    // Show success message
                    formResponse.className = 'alert alert-success';
                    formResponse.innerHTML = `
                        <i class="fas fa-check-circle"></i> Thank you, ${name}! Your message has been sent successfully!<br>
                        We will get back to you at ${email} regarding your ${getInquiryTypeText(inquiryType)} inquiry as soon as possible.
                    `;
                    formResponse.style.display = 'block';
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    
                    // Scroll to response message
                    formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Remove success message after 10 seconds
                    setTimeout(() => {
                        formResponse.style.display = 'none';
                    }, 10000);
                }, 1500);
            }
        });
    }
    
    // Booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        setupFormValidation(bookingForm);
        
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm(this)) {
                // Simulate form submission (in a real implementation, this would send data to a server)
                const formData = new FormData(this);
                const submitButton = this.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                
                // Show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                
                // Simulate server request with timeout
                setTimeout(() => {
                    // Reset form
                    this.reset();
                    
                    // Remove validation classes
                    const inputs = this.querySelectorAll('input, textarea, select');
                    inputs.forEach(input => {
                        input.classList.remove('is-valid');
                    });
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success';
                    successMessage.role = 'alert';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your booking request has been received! We will confirm your reservation shortly.';
                    
                    this.parentNode.insertBefore(successMessage, this.nextSibling);
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Remove success message after 10 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 10000);
                }, 1500);
            }
        });
    }
    
    /**
     * Set up form validation for a specific form
     * @param {HTMLFormElement} form - The form to set up validation for
     */
    function setupFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add blur event to validate when user leaves a field
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Add input event to validate as user types (for immediate feedback)
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
            
            // For select elements, add change event
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', function() {
                    validateField(this);
                });
            }
        });
    }
    
    /**
     * Validate an individual form field
     * @param {HTMLElement} field - The field to validate
     * @returns {boolean} - Whether the field is valid
     */
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Check if required
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'This field is required';
        } 
        // Email validation
        else if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        // Phone validation
        else if (field.type === 'tel' && value !== '') {
            const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        // Date validation
        else if (field.type === 'date' && value !== '') {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                isValid = false;
                errorMessage = 'Please select a future date';
            }
        }
        // Checkbox validation
        else if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
            isValid = false;
            errorMessage = 'You must check this box to proceed';
        }
        // Select validation
        else if (field.tagName === 'SELECT' && field.hasAttribute('required') && (value === '' || field.selectedIndex === 0 && field.options[0].disabled)) {
            isValid = false;
            errorMessage = 'Please select an option';
        }
        
        // Update field styling based on validation
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            
            // Find error message element
            const errorElement = field.nextElementSibling;
            if (errorElement && errorElement.classList.contains('invalid-feedback')) {
                errorElement.style.display = 'none';
            }
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
            
            // Find or create error message element
            let errorElement = field.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
                errorElement = document.createElement('div');
                errorElement.className = 'invalid-feedback';
                field.parentNode.insertBefore(errorElement, field.nextSibling);
            }
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
        
        return isValid;
    }
    
    /**
     * Validate an entire form
     * @param {HTMLFormElement} form - The form to validate
     * @returns {boolean} - Whether the form is valid
     */
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    /**
     * Get readable text for inquiry type
     * @param {string} inquiryType - The inquiry type value
     * @returns {string} - Human-readable inquiry type
     */
    function getInquiryTypeText(inquiryType) {
        const types = {
            'reservation': 'Restaurant Reservation',
            'wedding': 'Wedding/Event',
            'village': 'Village/Accommodation',
            'general': 'General'
        };
        
        return types[inquiryType] || inquiryType;
    }
    
    // Pre-fill subject if provided in URL parameters
    function prePopulateFormFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const subject = urlParams.get('subject');
        
        if (subject && contactForm) {
            const inquiryTypeSelect = contactForm.querySelector('#inquiry-type');
            
            if (inquiryTypeSelect) {
                // Map URL parameter to select option
                const mapping = {
                    'reservation': 'reservation',
                    'dining': 'reservation',
                    'wedding': 'wedding',
                    'event': 'wedding',
                    'accommodation': 'village',
                    'village': 'village',
                    'general': 'general'
                };
                
                const value = mapping[subject.toLowerCase()] || 'general';
                
                // Set the select value
                for (let i = 0; i < inquiryTypeSelect.options.length; i++) {
                    if (inquiryTypeSelect.options[i].value === value) {
                        inquiryTypeSelect.selectedIndex = i;
                        break;
                    }
                }
                
                // Validate the field
                validateField(inquiryTypeSelect);
            }
        }
    }
    
    // Call pre-populate function
    prePopulateFormFromUrl();
});