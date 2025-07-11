document.addEventListener("DOMContentLoaded", function() {
    const placeholder = document.getElementById("menu-placeholder");
    if (!placeholder) {
        return; 
    }

    const path = window.location.pathname;
    const isItalian = path.includes('/it/');
    const menuFile = isItalian ? '/_menu-it.html' : '/_menu-en.html';

    fetch(menuFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`File del menu non trovato: ${menuFile}`);
            }
            return response.text();
        })
        .then(data => {
            placeholder.innerHTML = data;

            // Logica per evidenziare il link attivo
            const navLinks = placeholder.querySelectorAll('.sidebar-nav a');
            let isPostPageActive = false;
            navLinks.forEach(link => {
                const linkPath = link.pathname;
                if (linkPath === path || (path.endsWith('/') && linkPath === path + 'index.html')) {
                    link.classList.add('active');
                    isPostPageActive = true;
                }
            });
            if (!isPostPageActive && path.includes('/post/')) {
                const targetLang = isItalian ? '/it' : '/en';
                const postsLink = placeholder.querySelector(`.sidebar-nav a[href="${targetLang}/our-posts.html"]`);
                if (postsLink) postsLink.classList.add('active');
            }
            
            // Logica per il cambio lingua
            const langToggleLink = placeholder.querySelector('.language-toggle a');
            if (langToggleLink) {
                 const targetLang = isItalian ? '/en' : '/it';
                 const newPath = path.replace(isItalian ? '/it' : '/en', targetLang);
                 langToggleLink.href = newPath;
            }

            // Invia il segnale che il menu è pronto
            document.dispatchEvent(new CustomEvent('menuLoaded'));

            // Logica per il player podcast incorporato (solo se presente nella pagina)
            if (document.querySelector('.spreaker-player')) {
                if (!document.getElementById('spreaker-widget-script')) {
                    const spreakerScript = document.createElement('script');
                    spreakerScript.id = 'spreaker-widget-script';
                    spreakerScript.async = true;
                    spreakerScript.src = 'https://widget.spreaker.com/widgets.js';
                    document.body.appendChild(spreakerScript);
                }
            }
        })
        .catch(error => console.error("Errore critico nel caricamento del menu:", error));
});