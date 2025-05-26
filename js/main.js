/**
 * Papa Remo Beach Website - Main JavaScript
 * Handles dynamic elements and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
    
    // Image slider functionality
    initializeSliders();
    
    // Initialize YouTube video integration
    initializeYouTubeVideos();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Active navigation highlighting
    highlightCurrentPage();
});

/**
 * Initialize all image sliders on the page
 */
function initializeSliders() {
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const dotsContainer = slider.querySelector('.slider-dots');
        let currentSlide = 0;
        let slideInterval;
        
        // If no slides found, exit
        if (slides.length === 0) return;
        
        // Create dots if container exists
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('slider-dot');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        // Set up initial state
        updateSlider();
        
        // Start automatic sliding
        startSlideShow();
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => startSlideShow());
        
        // Previous and next buttons
        const prevButton = slider.querySelector('.slider-prev');
        const nextButton = slider.querySelector('.slider-next');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlider();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
            });
        }
        
        // Helper functions
        function updateSlider() {
            // Hide all slides first
            slides.forEach(slide => {
                slide.style.opacity = 0;
                slide.style.zIndex = 0;
            });
            
            // Show current slide with fade effect
            slides[currentSlide].style.opacity = 1;
            slides[currentSlide].style.zIndex = 1;
            
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.slider-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                    dot.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
                });
            }
        }
        
        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }
        
        function startSlideShow() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
            }, 5000); // Change slide every 5 seconds
        }
    });
}

/**
 * Initialize YouTube video integration
 */
function initializeYouTubeVideos() {
    // Get all YouTube video containers
    const videoContainers = document.querySelectorAll('.youtube-video-container');
    
    videoContainers.forEach(container => {
        const videoId = container.dataset.videoId;
        
        if (!videoId) return;
        
        // Create the iframe element
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        
        // Add responsive class
        iframe.classList.add('responsive-iframe');
        
        // Append to container
        container.appendChild(iframe);
    });
}

/**
 * Highlight the current page in the navigation menu
 */
function highlightCurrentPage() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentPage.endsWith(linkPath) || 
            (linkPath !== '../index.html' && linkPath !== 'index.html' && currentPage.includes(linkPath))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Lazy load images when they enter the viewport
 */
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});