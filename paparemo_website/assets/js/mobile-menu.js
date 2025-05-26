/**
 * Mobile Menu Toggle Functionality
 * For Papa Remo Beach Bar Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button if it doesn't exist
    if (!document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle Menu');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert the toggle button at the beginning of the main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.insertBefore(menuToggle, mainContent.firstChild);
        }
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
        const isClickInsideMenu = sidebar.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Add additional mobile-specific styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
                z-index: 1000;
            }
            
            .sidebar.active {
                transform: translateX(0);
            }
            
            .menu-toggle {
                display: block;
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1001;
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
                transform: translateY(8px) rotate(45deg);
            }
            
            .menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
            
            .main-content {
                padding-top: 60px;
            }
            
            body.menu-open {
                overflow: hidden;
            }
        }
        
        @media (min-width: 769px) {
            .menu-toggle {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
});