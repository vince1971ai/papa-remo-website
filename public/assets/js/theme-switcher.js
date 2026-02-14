/**
 * Theme Switcher Functionality
 * Isolato per evitare attivazioni accidentali
 */

(function() {
    // Inizializzazione immediata del tema per evitare il "flash" bianco
    const theme = localStorage.getItem('theme') || 'dark'; 
    document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('menuLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        // Imposta lo stato iniziale del checkbox
        themeToggle.checked = (currentTheme === 'dark');

        // Ascolta SOLO il cambiamento del checkbox
        themeToggle.addEventListener('change', function(e) {
            // Blocca la propagazione così il click non disturba la lingua
            e.stopPropagation();

            const newTheme = this.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            console.log("Tema cambiato correttamente in: " + newTheme);
        });
    }
});