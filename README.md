# Express IT Logistics Limited

A professional static website for Uganda's premier logistics solutions provider.

## Description

Express IT Logistics Limited is a leading logistics and transportation company headquartered in Uganda. This website showcases their services, team, and contact information, providing a comprehensive online presence for their business.

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

## Pages

1. **Home (index.html)** - Company overview, services preview, and call-to-action
2. **Services (pages/services.html)** - Detailed list of logistics services
3. **Team (pages/team.html)** - Company leadership and team members
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
4. The site will be live at `https://yourusername.github.io/repository-name/`

## Customization

### Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --color-primary: #0284c7;
    --color-primary-light: #0ea5e9;
    --color-primary-dark: #0369a1;
    /* ... more variables */
}
```

### Content

Edit the corresponding HTML files to update:

- Services in `pages/services.html`
- Team members in `pages/team.html`
- Contact info in `pages/contact.html` and `index.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Express IT Logistics Limited. All rights reserved.

## Contact

- **Email:** <info@expressitlogistics.com>
- **Phone:** +256 700 123 456
- **Address:** Mengo Road, Nakasero, Kampala, Uganda
