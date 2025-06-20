# Papa Remo Beach Bar Website

## Project Overview
This is a responsive, dynamic website for Papa Remo Beach Bar located in Watamu, Kenya. The website showcases the beach bar's offerings including restaurant services, wedding venues, events, accommodations, and more.

### Features
- Responsive design that works on mobile, tablet, and desktop devices
- Multi-language support (English and Italian)
- Interactive reservation forms
- Real-time weather widget showing conditions in Watamu
- Image gallery with optimized images
- Podcast section for audio content
- Contact form for inquiries and reservations

## Directory Structure
```
paparemo_website/
├── assets/                      # All website assets
│   ├── images/                  # Optimized images including logo and photos
│   │   └── optimized/           # WebP and optimized JPG versions
│   ├── css/                     # CSS stylesheets
│   ├── js/                      # JavaScript files
│   └── fonts/                   # Custom fonts if needed
├── pages/                       # HTML pages for each section
│   ├── index.html               # Home page
│   ├── story.html               # Papa Remo Story page
│   ├── restaurant.html          # Restaurant page
│   ├── wedding.html             # Wedding page
│   ├── events.html              # Event page
│   ├── village.html             # Paparemo Village page
│   ├── podcast.html             # Podcast page
│   └── contact.html             # Contact page
└── locales/                     # Language files
    ├── en/                      # English content
    └── it/                      # Italian content
```

## Deployment Instructions

### FTP Upload
1. Connect to your web hosting server using an FTP client (like FileZilla)
2. Upload the entire `paparemo_website` directory to your server's public_html or www directory
3. Ensure file permissions are set correctly:
   - Directories: 755 (drwxr-xr-x)
   - Files: 644 (rw-r--r--)
4. Test the website by navigating to your domain in a web browser

### API Configuration
The weather widget uses OpenWeatherMap API. To make it work:
1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Open `assets/js/weather-widget.js`
3. Replace `YOUR_API_KEY` with your actual API key

## Browser Compatibility
The website has been tested and is compatible with:
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Safari (latest version)
- Microsoft Edge (latest version)
- Mobile browsers (iOS Safari, Android Chrome)

## Responsive Design
The website uses a mobile-first approach with three main breakpoints:
- Mobile: Up to 767px
- Tablet: 768px to 1023px
- Desktop: 1024px and above

## Maintenance Notes

### Adding New Images
1. Place new images in the `assets/images` directory
2. Run the image optimization script to create WebP versions
3. Use the `<picture>` element pattern for best browser compatibility

### Updating Content
- HTML content can be directly edited in the respective page files
- For multi-language support, update both English and Italian translations in the language-toggle.js file

### Form Submissions
- Forms are configured to send submissions to reservation@paparemobeach.com
- The forms use Formspree as a backend service

## Performance Optimizations
- Images are optimized and served in WebP format with JPEG fallbacks
- CSS and JavaScript files are minimized
- Proper caching headers are recommended on the server
- Lazy loading is implemented for images below the fold

## Accessibility Features
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- ARIA attributes where appropriate
- Keyboard navigation support
