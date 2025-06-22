// Questa prima parte rimane invariata e imposta il tema all'avvio per evitare sfarfallii
(function() {
    const theme = localStorage.getItem('theme') || 'dark'; 
    document.documentElement.setAttribute('data-theme', theme);
})();

// --- MODIFICA PRINCIPALE ---
// Sostituisco 'DOMContentLoaded' con il nostro evento personalizzato 'menuLoaded'
document.addEventListener('menuLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        // Imposta lo stato dell'interruttore in base al tema corrente
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