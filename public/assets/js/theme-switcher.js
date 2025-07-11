(function() {
    const theme = localStorage.getItem('theme') || 'dark'; 
    document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('menuLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
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