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

            // --- INIZIO NUOVA LOGICA PER CAMBIO LINGUA ---
            const langToggleLink = placeholder.querySelector('.language-toggle a');
            if (langToggleLink) {
                const currentPath = window.location.pathname;
                const isPostPage = currentPath.includes('/post/');
                let targetPath = '';

                if (isPostPage) {
                    const postTranslations = {
                        // Mappa: [file italiano]: [file inglese]
                        'sogni.html': 'dreams.html',
                        'The_New_Season_in_Watamu.html': 'The_New_Season_in_Watamu.html',
                        'Events_Under_the_Kenyan_Sky.html': 'Events_Under_the_Kenyan_Sky.html'
                    };
                    
                    const currentFilename = currentPath.split('/').pop();
                    
                    if (isItalian) {
                        const englishFilename = postTranslations[currentFilename];
                        if (englishFilename) {
                            targetPath = `/en/post/${englishFilename}`;
                        }
                    } else { // Se è inglese
                        // Cerca la chiave (file IT) che ha il file EN come valore
                        const italianFilename = Object.keys(postTranslations).find(key => postTranslations[key] === currentFilename);
                        if (italianFilename) {
                            targetPath = `/it/post/${italianFilename}`;
                        }
                    }
                }

                // Se non è una pagina di post o non è stata trovata una traduzione, usa il metodo vecchio
                if (!targetPath) {
                    const targetLang = isItalian ? '/en/' : '/it/';
                    const pageFilename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
                    targetPath = targetLang + pageFilename;
                }
                
                langToggleLink.href = targetPath;
            }
            // --- FINE NUOVA LOGICA ---

            // Il resto dello script rimane invariato...
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
            
            document.dispatchEvent(new CustomEvent('menuLoaded'));
        })
        .catch(error => console.error("Errore critico nel caricamento del menu:", error));
});