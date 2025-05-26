/**
 * Weather Widget Functionality
 * For Papa Remo Beach Bar Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create weather widget if it doesn't exist
    if (!document.querySelector('.weather-widget')) {
        const weatherWidget = document.createElement('div');
        weatherWidget.className = 'weather-widget';
        
        // Insert the weather widget in the sidebar
        const sidebar = document.querySelector('.sidebar');
        const languageToggle = document.querySelector('.language-toggle');
        
        if (sidebar && languageToggle) {
            sidebar.insertBefore(weatherWidget, languageToggle);
        }
        
        // Add some styling for the weather widget
        const style = document.createElement('style');
        style.textContent = `
            .weather-widget {
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 1rem;
                margin: 1rem 0;
                color: var(--text-light);
                text-align: center;
            }
            
            .weather-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            
            .weather-info {
                font-size: 0.9rem;
            }
            
            .weather-location {
                font-weight: 600;
                margin-bottom: 0.25rem;
            }
            
            .weather-temp {
                font-size: 1.2rem;
                font-weight: 700;
                margin-bottom: 0.25rem;
            }
            
            .weather-condition {
                font-style: italic;
            }
            
            .weather-loading {
                font-style: italic;
                opacity: 0.8;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Function to load weather data
    function loadWeatherWidget() {
        const weatherWidget = document.querySelector('.weather-widget');
        
        if (weatherWidget) {
            // Show loading state
            weatherWidget.innerHTML = '<div class="weather-loading">Loading weather data...</div>';
            
            // OpenWeatherMap API endpoint for Watamu, Kenya
            // Note: In a production environment, the API key should be kept secure
            // and requests should be proxied through a server-side component
            const apiKey = 'YOUR_API_KEY'; // Replace with actual API key in production
            const location = 'Watamu,Kenya';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
            
            // Fetch weather data from API
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Weather data unavailable');
                    }
                    return response.json();
                })
                .then(data => {
                    // Process the weather data
                    const weatherData = {
                        location: 'Watamu, Kenya',
                        temperature: Math.round(data.main.temp) + '°C',
                        condition: data.weather[0].description,
                        icon: getWeatherIcon(data.weather[0].id)
                    };
                    
                    // Update the widget with the fetched data
                    weatherWidget.innerHTML = `
                        <div class="weather-icon">${weatherData.icon}</div>
                        <div class="weather-info">
                            <div class="weather-location">${weatherData.location}</div>
                            <div class="weather-temp">${weatherData.temperature}</div>
                            <div class="weather-condition">${weatherData.condition}</div>
                        </div>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    
                    // Fallback to static data if API fails
                    const fallbackData = {
                        location: 'Watamu, Kenya',
                        temperature: '28°C',
                        condition: 'Sunny',
                        icon: '☀️'
                    };
                    
                    weatherWidget.innerHTML = `
                        <div class="weather-icon">${fallbackData.icon}</div>
                        <div class="weather-info">
                            <div class="weather-location">${fallbackData.location}</div>
                            <div class="weather-temp">${fallbackData.temperature}</div>
                            <div class="weather-condition">${fallbackData.condition}</div>
                            <div class="weather-loading">Live data unavailable</div>
                        </div>
                    `;
                });
        }
    }
    
    // Function to get appropriate weather icon based on condition code
    function getWeatherIcon(code) {
        // Map OpenWeatherMap condition codes to emoji icons
        if (code >= 200 && code < 300) return '⛈️'; // Thunderstorm
        if (code >= 300 && code < 400) return '🌧️'; // Drizzle
        if (code >= 500 && code < 600) return '🌧️'; // Rain
        if (code >= 600 && code < 700) return '❄️'; // Snow
        if (code >= 700 && code < 800) return '🌫️'; // Atmosphere (fog, mist, etc.)
        if (code === 800) return '☀️'; // Clear
        if (code > 800) return '☁️'; // Clouds
        
        return '🌡️'; // Default
    }
    
    // Load the weather widget
    loadWeatherWidget();
    
    // Refresh the weather data every hour
    setInterval(loadWeatherWidget, 3600000);
});
