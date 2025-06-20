// Funzione per applicare il tema all'avvio
(function() {
    // Se un tema è salvato, usa quello, altrimenti imposta 'dark' come predefinito
    const theme = localStorage.getItem('theme') || 'dark'; 
    document.documentElement.setAttribute('data-theme', theme);
})();

// Logica per gestire l'interruttore
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        // Imposta lo stato dell'interruttore in base al tema corrente al caricamento della pagina
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }

        // Aggiungi un listener per l'evento 'change' sull'interruttore
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});