document.addEventListener("DOMContentLoaded", function() {
    const placeholder = document.getElementById("footer-placeholder");
    if (!placeholder) {
        return; // Non fare nulla se non c'è il placeholder del footer
    }

    const path = window.location.pathname;
    const isItalian = path.includes('/it/');
    
    // Determina quale file di footer caricare
    const footerFile = isItalian ? '/_footer-it.html' : '/_footer-en.html';

    fetch(footerFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`File del footer non trovato: ${footerFile}`);
            }
            return response.text();
        })
        .then(data => {
            // Inserisci l'HTML del footer nel placeholder
            placeholder.outerHTML = data;
        })
        .catch(error => console.error("Errore critico nel caricamento del footer:", error));
});