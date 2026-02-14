/**
 * Language Toggle Functionality
 * Corretto per evitare conflitti con il tema
 */

document.addEventListener('DOMContentLoaded', function() {
    // Selezioniamo il link dentro il div language-toggle
    const langLink = document.querySelector('.language-toggle a');
    
    if (langLink) {
        langLink.addEventListener('click', function(e) {
            // Impedisce che il click attivi il cambio tema nella sidebar
            e.stopPropagation();

            // Salviamo la preferenza della lingua nel localStorage
            // Se l'URL contiene /en/ salviamo 'en', altrimenti 'it'
            const nextLang = this.getAttribute('href').includes('/en/') ? 'en' : 'it';
            localStorage.setItem('papaRemoLanguage', nextLang);
            
            console.log("Lingua impostata su: " + nextLang);
            // Il browser seguirà il link normalmente verso la nuova pagina
        });
    }
});