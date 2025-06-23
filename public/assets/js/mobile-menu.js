/**
 * Mobile Menu Toggle Functionality
 * For Papa Remo Beach Bar Website
 */

// MODIFICA: Aspetta il nostro segnale 'menuLoaded' invece di 'DOMContentLoaded'
document.addEventListener('menuLoaded', function() { 
    // Create mobile menu toggle button if it doesn't exist
    if (!document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle Menu');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        // Append to body for global fixed positioning
        document.body.appendChild(menuToggle); 
    }
    
    // Add mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(event) {
        // Ensure menuToggle exists before trying to use .contains on it
        if (menuToggle && sidebar && sidebar.classList.contains('active')) {
            const isClickInsideMenu = sidebar.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Add additional mobile-specific styles, but only if they haven't been added before
    if (!document.getElementById('mobile-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-styles'; // Give an ID to prevent re-injection
        style.textContent = `
            @media (max-width: 768px) {
                .sidebar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 280px;
                    height: 100vh;
                    transform: translateX(-100%); /* Nascosta a sinistra */
                    transition: transform 0.3s ease;
                    z-index: 1000; /* Assicura che sia sopra altro contenuto */
                }
                
                .sidebar.active {
                    transform: translateX(0); /* Mostra la sidebar */
                }
                
                .menu-toggle {
                    display: block; /* Assicura che il bottone sia visibile su mobile */
                    position: fixed; /* Bottone fisso rispetto alla viewport */
                    top: 1rem;
                    left: 1rem;
                    z-index: 1001; /* Sopra la sidebar */
                    width: 40px;
                    height: 40px;
                    background-color: var(--ocean-blue);
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    padding: 10px;
                }
                
                .menu-toggle span {
                    display: block;
                    width: 100%;
                    height: 2px;
                    background-color: white;
                    transition: all 0.3s ease;
                }
                
                .menu-toggle.active span:nth-child(1) {
                    transform: translateY(6px) rotate(45deg);
                }
                
                .menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .menu-toggle.active span:nth-child(3) {
                    transform: translateY(-6px) rotate(-45deg);
                }
                
                .main-content {
                    padding-top: 60px; 
                }
                
                body.menu-open {
                    overflow: hidden; /* Impedisce lo scroll del body quando il menu è aperto */
                }
            }
            
            @media (min-width: 769px) {
                .menu-toggle {
                    display: none; /* Nasconde il bottone hamburger su desktop */
                }
            }
        `;
        
        document.head.appendChild(style);
    }
});