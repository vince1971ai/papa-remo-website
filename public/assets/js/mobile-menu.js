document.addEventListener('menuLoaded', () => { 
    if (!document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle Menu');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        document.body.appendChild(menuToggle); 
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    document.addEventListener('click', function(event) {
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
    
    if (!document.getElementById('mobile-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-styles';
        style.textContent = `
            @media (max-width: 768px) {
                .sidebar {
                    position: fixed; top: 0; left: 0; width: 280px; height: 100vh;
                    transform: translateX(-100%); transition: transform 0.3s ease; z-index: 1000;
                }
                .sidebar.active { transform: translateX(0); }
                .menu-toggle {
                    display: block; position: fixed; top: 1rem; left: 1rem; z-index: 1001;
                    width: 40px; height: 40px; background-color: var(--ocean-blue); border: none;
                    border-radius: 4px; cursor: pointer; padding: 10px; display: flex;
                    flex-direction: column; justify-content: space-around; align-items: center;
                }
                .menu-toggle span {
                    display: block; width: 100%; height: 2px; background-color: white; transition: all 0.3s ease;
                }
                .menu-toggle.active span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
                .menu-toggle.active span:nth-child(2) { opacity: 0; }
                .menu-toggle.active span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
                body.menu-open { overflow: hidden; }
            }
            @media (min-width: 769px) { .menu-toggle { display: none; } }
        `;
        document.head.appendChild(style);
    }
});