# Express IT Logistics Limited

A professional static website for Uganda's premier logistics solutions provider and leading dry ice producer in East Africa.

## Description

Express IT Logistics Limited is a leading logistics and transportation company headquartered in Uganda, and the premier producer of dry ice in East Africa. This website showcases their services, team, and contact information, providing a comprehensive online presence for their business.

## Tech Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Custom styles with CSS variables for dark mode
- **JavaScript** - Vanilla JS for interactivity and dark mode toggle
- **Font Awesome** - Icon library (via CDN)
- **Google Fonts** - Inter font family (via CDN)

## Folder Structure

```text
express-it-logistics-website/
├── assets/
│   └── images/
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── pages/
│   ├── contact.html
│   ├── services.html
│   └── team.html
├── index.html
└── README.md
```

## Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Dark Mode** - Toggle between light and dark themes with system preference detection
- **Semantic HTML** - Proper use of header, nav, main, section, and footer elements
- **Accessible** - ARIA labels, focus states, and proper contrast ratios
- **Fast Loading** - No heavy frameworks, pure HTML/CSS/JS
- **Print Friendly** - Optimized print styles
- **Auto-Scrolling Partners Carousel** - Dynamic partner showcase

## Pages

1. **Home (index.html)** - Company overview, services preview, trusted partners, and call-to-action
2. **Services (pages/services.html)** - Detailed list of logistics services including dry ice production
3. **Team (pages/team.html)** - Role-based capability groupings
4. **Contact (pages/contact.html)** - Contact form and company information

## Getting Started

### Local Development

Simply open `index.html` in your web browser:

```bash
# Using macOS
open index.html

# Or serve with a local server
npx serve .
```

### Deployment

This website is designed to be hosted on GitHub Pages:

1. Push the repository to GitHub
2. Go to Repository Settings → Pages
3. Select the main branch as source
4. The site will be live at your GitHub Pages URL

## Customization

### Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --color-pink: #e91e63;
    --color-pink-light: #f06292;
    --color-pink-dark: #c2185b;
    /* ... more variables */
}
```

### Content

Edit the corresponding HTML files to update:

- Homepage content in `index.html`
- Services in `pages/services.html`
- Team capabilities in `pages/team.html`
- Contact info in `pages/contact.html` and `index.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © Express IT Logistics Limited. All rights reserved.

## Contact

- **Email:** <info@expressitlogistics.co.ug>
- **Phone:** +256 772 200 122, +256 773 001 030, +256 701 447 750
- **Address:** Rumee House, 3rd Floor, Plot 19 Lumumba Avenue - Nakasero, P.O. Box 74638, Kampala - Uganda
