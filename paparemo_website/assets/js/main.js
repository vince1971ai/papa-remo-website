/**
 * Papa Remo Beach Bar Website
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Language toggle functionality
    const languageToggle = document.querySelector('.language-toggle');
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            // This would be replaced with actual language switching logic
            // For now, just toggle a class for demonstration
            document.documentElement.classList.toggle('lang-it');
            
            // Update text on the toggle button
            const langText = document.querySelector('.language-toggle span');
            if (langText) {
                langText.textContent = document.documentElement.classList.contains('lang-it') ? 'English' : 'Italiano';
            }
        });
    }
    
    // Reservation form validation
    const reservationForm = document.getElementById('reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = reservationForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = reservationForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // In a real implementation, this would send the form data to the server
                // For now, just show a success message
                const formData = new FormData(reservationForm);
                const formObject = {};
                
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // This would be replaced with an actual AJAX call to send the form data
                
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'Reservation request sent successfully! We will contact you shortly.';
                
                reservationForm.parentNode.insertBefore(successMessage, reservationForm);
                reservationForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Weather widget functionality
    // This would be replaced with an actual API call to get weather data
    function loadWeatherWidget() {
        const weatherWidget = document.querySelector('.weather-widget');
        
        if (weatherWidget) {
            // In a real implementation, this would fetch data from a weather API
            // For now, just show placeholder data
            const weatherData = {
                location: 'Watamu, Kenya',
                temperature: '28°C',
                condition: 'Sunny',
                icon: '☀️'
            };
            
            weatherWidget.innerHTML = `
                <div class="weather-icon">${weatherData.icon}</div>
                <div class="weather-info">
                    <div class="weather-location">${weatherData.location}</div>
                    <div class="weather-temp">${weatherData.temperature}</div>
                    <div class="weather-condition">${weatherData.condition}</div>
                </div>
            `;
        }
    }
    
    // Initialize weather widget
    loadWeatherWidget();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});