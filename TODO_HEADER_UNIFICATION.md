# TODO - Header Unification Task - COMPLETED

## Goal
Unify header layout across all pages using the new simplified structure.

## New Header Structure Applied to All Pages

```html
<header class="site-header">
  <div class="header-container">
    <div class="header-left">
      <a href="index.html" class="brand">
        <img src="assets/images/logo.png" alt="Express It Logistics Ltd">
        <span class="brand-text">Express It Logistics Ltd</span>
      </a>
    </div>
    <nav class="header-nav">
      <!-- nav links, buttons, dark mode toggle -->
    </nav>
  </div>
</header>
```

## Files Updated
- [x] **index.html** - New header structure
- [x] **pages/services.html** - New header structure
- [x] **pages/team.html** - New header structure
- [x] **pages/contact.html** - New header structure
- [x] **css/styles.css** - Added new `.site-header`, `.header-container`, `.brand`, `.header-nav` styles
- [x] **js/main.js** - Updated NavbarScrollManager to use `.site-header` class

## Key Changes
1. Replaced `<header id="navbar" class="navbar">` with `<header class="site-header">`
2. Simplified logo area to use `.brand` class with `.brand-text`
3. Renamed `.nav-menu` to `.header-nav` for consistency
4. Removed `nav-wrapper` div wrapper - now uses `header-container` directly
5. CSS updated to support new simplified structure

## Header Template (from index.html)
```html
<!-- Navigation Bar -->
<header id="navbar" class="navbar" role="banner">
  <div class="nav-container">
    <div class="nav-wrapper">
      <!-- Header Left - Logo + Brand -->
      <div class="header-left">
        <a href="index.html" class="logo-link" aria-label="Express It Logistics Ltd - Home">
          <div class="logo-wrapper">
            <div class="logo-icon">
              <img src="assets/images/logo.png" alt="" aria-hidden="true" width="48" height="48" class="logo-load-animation">
            </div>
          </div>
          <div class="logo-text">
            <span class="logo-title">Express It Logistics Ltd</span>
          </div>
        </a>
      </div>

      <!-- Header Right - Navigation + Buttons -->
      <div class="header-right">
        <!-- Desktop Navigation -->
        <nav class="nav-menu" role="navigation" aria-label="Main navigation">
          <a href="index.html" class="nav-link active" aria-current="page">Home</a>
          <a href="pages/services.html" class="nav-link">Services</a>
          <a href="pages/team.html" class="nav-link">Team</a>
          <a href="pages/contact.html" class="nav-link">Contact</a>
          <a href="pages/contact.html" class="btn btn-primary">
            Get Quote
            <i class="fas fa-arrow-right" aria-hidden="true"></i>
          </a>
          <!-- Track Shipment Button -->
          <a href="https://www.track-trace.com/" class="btn btn-outline track-shipment-btn" id="header-track-btn" aria-label="Track Shipment" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-search" aria-hidden="true"></i>
            Track Shipment
          </a>
          <!-- Dark Mode Toggle -->
          <button id="dark-mode-toggle" class="dark-mode-toggle" aria-label="Toggle dark mode">
            <i class="fas fa-moon" aria-hidden="true"></i>
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="mobile-menu-btn-container">
          <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Open menu" aria-expanded="false">
            <i class="fas fa-bars" aria-hidden="true"></i>
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <nav id="mobile-menu" role="navigation" aria-label="Mobile navigation">
      <a href="index.html" class="mobile-nav-link active" aria-current="page">Home</a>
      <a href="pages/services.html" class="mobile-nav-link">Services</a>
      <a href="pages/team.html" class="mobile-nav-link">Team</a>
      <a href="pages/contact.html" class="mobile-nav-link">Contact</a>
      <a href="https://www.track-trace.com/" class="mobile-nav-link" id="mobile-track-link" target="_blank" rel="noopener noreferrer" aria-label="Track Shipment">
        <i class="fas fa-search" aria-hidden="true" style="margin-right: 0.5rem;"></i>
        Track Shipment
      </a>
      <a href="pages/contact.html" class="btn btn-primary inline-block mt-2">
        Get Quote
        <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </a>
      <div class="mobile-dark-mode-toggle">
        <button id="dark-mode-toggle-mobile" class="dark-mode-toggle" aria-label="Toggle dark mode">
          <i class="fas fa-moon" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  </div>
</header>
```

## Notes
- Path differences must be preserved (../ for pages/, ./ for index.html)
- Active class must remain on the correct page's nav link
- Dark Mode toggle should NOT have text label (match index.html)

