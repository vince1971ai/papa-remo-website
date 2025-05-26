/**
 * Language Toggle Functionality
 * For Papa Remo Beach Bar Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Language data
    const translations = {
        'en': {
            'home': 'Home',
            'story': 'Papa Remo Story',
            'restaurant': 'Restaurant',
            'wedding': 'Wedding',
            'events': 'Events',
            'village': 'Paparemo Village',
            'podcast': 'Podcast',
            'contact': 'Contact',
            'contactUs': 'Contact Us',
            'location': 'Jacaranda Road, Watamu, Kenya',
            'phone': '+254 707 010527',
            'email': 'reservation@paparemobeach.com',
            'bookNow': 'Book Now',
            'languageToggle': 'Italiano',
            'copyright': '© 2025 Papa Remo Beach Bar. All rights reserved.',
            'followUs': 'Follow Us'
        },
        'it': {
            'home': 'Home',
            'story': 'Storia di Papa Remo',
            'restaurant': 'Ristorante',
            'wedding': 'Matrimonio',
            'events': 'Eventi',
            'village': 'Villaggio Paparemo',
            'podcast': 'Podcast',
            'contact': 'Contatti',
            'contactUs': 'Contattaci',
            'location': 'Jacaranda Road, Watamu, Kenya',
            'phone': '+254 707 010527',
            'email': 'reservation@paparemobeach.com',
            'bookNow': 'Prenota Ora',
            'languageToggle': 'English',
            'copyright': '© 2025 Papa Remo Beach Bar. Tutti i diritti riservati.',
            'followUs': 'Seguici'
        }
    };

    // Get language toggle element
    const languageToggle = document.querySelector('.language-toggle');
    
    // Set default language
    let currentLanguage = 'en';
    
    // Function to update text based on language
    function updateLanguage(lang) {
        // Update navigation items
        document.querySelectorAll('.sidebar-nav a').forEach((link, index) => {
            const key = ['home', 'story', 'restaurant', 'wedding', 'events', 'village', 'podcast', 'contact'][index];
            link.textContent = translations[lang][key];
        });
        
        // Update contact section
        const contactTitle = document.querySelector('.sidebar-contact h3');
        if (contactTitle) {
            contactTitle.textContent = translations[lang]['contactUs'];
        }
        
        // Update book now button
        const bookNowBtn = document.querySelector('.book-now-btn');
        if (bookNowBtn) {
            bookNowBtn.textContent = translations[lang]['bookNow'];
        }
        
        // Update language toggle text
        const langText = document.querySelector('.language-toggle span');
        if (langText) {
            langText.textContent = translations[lang]['languageToggle'];
        }
        
        // Update footer content
        const footerTitle = document.querySelector('.footer-column h3:first-child');
        if (footerTitle) {
            footerTitle.textContent = 'Papa Remo Beach Bar';
        }
        
        const followUs = document.querySelector('.footer-column h3:last-child');
        if (followUs) {
            followUs.textContent = translations[lang]['followUs'];
        }
        
        const copyright = document.querySelector('.copyright p');
        if (copyright) {
            copyright.textContent = translations[lang]['copyright'];
        }
        
        // Store the current language preference
        localStorage.setItem('papaRemoLanguage', lang);
        currentLanguage = lang;
    }
    
    // Check if there's a stored language preference
    const storedLanguage = localStorage.getItem('papaRemoLanguage');
    if (storedLanguage) {
        updateLanguage(storedLanguage);
        if (storedLanguage === 'it') {
            document.documentElement.classList.add('lang-it');
        }
    }
    
    // Add click event to language toggle
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            const newLanguage = currentLanguage === 'en' ? 'it' : 'en';
            document.documentElement.classList.toggle('lang-it');
            updateLanguage(newLanguage);
        });
    }
});