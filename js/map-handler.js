/**
 * Papa Remo Beach Website - Map Handler
 * Handles map integration for the contact page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize map if the map container exists
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        initializeMap();
    }
});

/**
 * Initialize the map with Leaflet.js
 */
function initializeMap() {
    // Coordinates for Watamu, Kenya (based on research)
    // Using the coordinates we found for Watamu as Papa Remo Beach is located there
    const lat = -3.3540;
    const lng = 40.0139;
    
    // Create map centered on Watamu
    const map = L.map('map').setView([lat, lng], 15);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add marker for Papa Remo Beach
    const marker = L.marker([lat, lng]).addTo(map);
    
    // Add popup with information
    marker.bindPopup(`
        <strong>Papa Remo Beach</strong><br>
        Jacaranda Road<br>
        Watamu, Kenya<br>
        <a href="tel:+254707010527">+254 707 010527</a>
    `).openPopup();
    
    // Make the map responsive
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });
    
    // Fix for map not rendering correctly in some browsers
    setTimeout(function() {
        map.invalidateSize();
    }, 500);
}