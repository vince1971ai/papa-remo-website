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
        // Note: Its position will be fixed by CSS, so DOM placement is less critical for layout
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            // Placing it as a direct child of body or a specific header container might be cleaner
            // but inserting before main-content also works if CSS positions it fixed.
            // For simplicity, let's ensure it's outside the sidebar if sidebar is also fixed.
            // Best to append to body or a dedicated menu-controls container if one exists.
            // Or, ensure it's created and styled correctly by CSS irrespective of DOM location for flow.
            // Current CSS makes it position:fixed, so its DOM location for flow is not an issue.
            document.body.appendChild(menuToggle); // Append to body for global fixed positioning
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
    
    // Add additional mobile-specific styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .sidebar {
                /* --- MODIFICHE CHIAVE QUI --- */
                position: fixed; /* Togliamo la sidebar dal flusso normale della pagina */
                top: 0;
                left: 0;
                width: 280px; /* Larghezza del menu quando appare (puoi aggiustarla, es. 80% o 290px) */
                height: 100vh; /* Altezza completa della viewport */
                /* Il padding: 1rem; e overflow-y: auto; da main.css verranno ereditati o applicati */
                /* background-color e color da main.css verranno ereditati o applicati */
                /* display:flex e flex-direction:column da main.css verranno ereditati o applicati */
                
                /* --- Stili esistenti dal tuo JS --- */
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
                top: 1rem;  /* O 20px, o come preferisci */
                left: 1rem; /* O 20px, o come preferisci */
                z-index: 1001; /* Sopra la sidebar quando è chiusa, e sempre visibile */
                width: 40px;
                height: 40px;
                background-color: var(--ocean-blue); /* Usa le tue variabili di colore */
                border: none;
                border-radius: 4px;
                cursor: pointer;
                padding: 0; /* Rimuovi padding se le span interne lo gestiscono */
                display: flex;
                flex-direction: column;
                justify-content: space-around; /* Per le linee dell'hamburger */
                align-items: center;
                padding: 10px; /* Padding interno per le barre dell'hamburger */
            }
            
            .menu-toggle span {
                display: block;
                width: 100%; /* Prende la larghezza del padding del bottone */
                height: 2px; /* Spessore delle barre */
                background-color: white;
                transition: all 0.3s ease;
            }
            
            .menu-toggle.active span:nth-child(1) {
                transform: translateY(6px) rotate(45deg); /* Ajusta translateY per centrare la X */
            }
            
            .menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active span:nth-child(3) {
                transform: translateY(-6px) rotate(-45deg); /* Ajusta translateY per centrare la X */
            }
            
            .main-content {
                /* Questo padding-top era per non far andare il contenuto sotto il bottone fisso */
                /* o sotto la sidebar quando era 'position: relative'. */
                /* Con la sidebar 'position: fixed', il .main-content occuperà lo spazio da cima. */
                /* Il padding: 2rem; originale da main.css include già un padding-top. */
                /* Valuta se 60px è ancora necessario o se il padding originale di main.css è sufficiente. */
                /* Per ora lo manteniamo per dare spazio al bottone hamburger se i contenuti iniziano subito. */
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
            /* Su desktop, la sidebar torna agli stili di main.css (position:fixed, etc.) */
        }
    `;
    
    document.head.appendChild(style);
});