/**
 * Papa Remo Beach Bar Website
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    // NOTA: Questa parte è stata spostata in mobile-menu.js e può essere rimossa se quel file è ancora in uso.
    // La lascio qui per sicurezza, nel caso tu abbia unito i file.
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Language toggle functionality
    // NOTA: Questa parte è stata spostata in language-toggle.js e può essere rimossa se quel file è ancora in uso.
    const languageToggle = document.querySelector('.language-toggle');
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('lang-it');
            
            const langText = document.querySelector('.language-toggle span');
            if (langText) {
                langText.textContent = document.documentElement.classList.contains('lang-it') ? 'English' : 'Italiano';
            }
        });
    }

    // IL BLOCCO DI CODICE CHE CAUSAVA IL PROBLEMA È STATO RIMOSSO DA QUI.

    // Weather widget functionality
    // Questa funzione è gestita dal file weather-widget.js
    function loadWeatherWidget() {
        const weatherWidget = document.querySelector('.weather-widget');
        
        if (weatherWidget) {
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
    // Questa funzione è gestita dal file weather-widget.js
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