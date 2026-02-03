# Final Polish, Stability & Deployment-Readiness Plan

## Information Gathered

### Project Analysis

- **4 pages:** index.html, pages/services.html, pages/team.html, pages/contact.html
- **Two slider implementations:**
  - `services-carousel-container` (homepage - with accordion "Learn more" buttons)
  - `services-page-carousel-container` (services page - simple cards)
- **Brand Guide exists:** BRAND_GUIDE.md already complete
- **CSS:** Single styles.css with proper variables and dark mode support
- **JS:** main.js with slider, dark mode, mobile menu functionality

### Slider Arrow Issues Identified

1. Current desktop margins (`margin-left: -22px`) pull arrows but may clip them
2. Container has `overflow: visible` but parent sections may clip
3. z-index of 10 is set but may need verification against card hover states
4. Vertical centering relies on `align-items: center` but arrows should use `top: 50% + translateY(-50%)`

---

## Plan

### SECTION 1: Slider Arrow Fix (CRITICAL)

#### 1.1 Fix `services-carousel-container` arrows (Homepage)

**File:** `css/styles.css`

**Current problematic CSS:**

```css
.services-carousel-nav {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 10;
  margin: 0 -1rem;
}

.services-carousel-prev {
  margin-left: -22px;
}

.services-carousel-next {
  margin-right: -22px;
}
```

**Replace with:**

```css
.services-carousel-nav {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 50; /* Increased to ensure arrows sit above cards */
  margin: 0 -1.5rem; /* More negative margin for desktop visibility */
}

.services-carousel-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  color: var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
  pointer-events: auto;
  box-shadow: var(--shadow-md);
  flex-shrink: 0;
  position: relative;
}

.services-carousel-prev {
  margin-left: -24px; /* Pull outside container */
  margin-right: 0;
}

.services-carousel-next {
  margin-right: -24px; /* Pull outside container */
  margin-left: 0;
}
```

#### 1.2 Fix `services-page-carousel-container` arrows (Services Page)

**File:** `css/styles.css`

**Current CSS (similar issues):**

```css
.services-page-carousel-nav {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 10;
  margin: 0 -0.5rem;
}
```

***Update to match the corrected homepage arrows with z-index: 50***

#### 1.3 Add proper z-index to service cards

**File:** `css/styles.css`

Add to ensure cards don't overlap arrows:

```css
.service-card {
  /* existing styles */
  position: relative;
  z-index: 1;
}
```

### SECTION 2: Mobile Responsiveness Fixes

#### 2.1 Mobile Slider Arrows

**File:** `css/styles.css`

**Add/Update mobile breakpoint:**

```css
@media (max-width: 768px) {
  .services-carousel-nav {
    margin: 0 -0.5rem;
    z-index: 50;
  }

  .services-carousel-btn {
    width: 40px;
    height: 40px;
  }

  .services-carousel-prev {
    margin-left: -20px; /* Still outside but less so */
  }

  .services-carousel-next {
    margin-right: -20px;
  }

  .services-page-carousel-container {
    padding: 0 3rem; /* More padding for arrow space */
    overflow: hidden;
  }

  .services-page-carousel-nav {
    margin: 0;
  }

  .services-page-carousel-btn {
    width: 40px;
    height: 40px;
  }

  .services-page-carousel-prev {
    margin-left: 0;
    position: absolute;
    left: 0.5rem;
  }

  .services-page-carousel-next {
    margin-right: 0;
    position: absolute;
    right: 0.5rem;
  }
}
```

### SECTION 3: Cross-Browser Consistency

#### 3.1 Add Safari-specific fixes

**File:** `css/styles.css`

```css
/* Safari-specific carousel fixes */
@supports (-webkit-touch-callout: none) {
  .services-carousel-container-page-carousel-container,
  .services {
    -webkit-overflow-scrolling: touch;
  }
}
```

#### 3.2 Firefox focus ring consistency

```css
.services-carousel-btn:focus-visible,
.services-page-carousel-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### SECTION 4: Deployment Readiness

#### 4.1 Verify favicon on all pages

All pages already have proper favicon links:

- `index.html`: `href="assets/images/icon.svg"`
- `pages/services.html`: `href="../assets/images/icon.svg"`
- `pages/contact.html`: `href="../assets/images/icon.svg"`
- `pages/team.html`: Need to verify

#### 4.2 Check team.html for completeness

Read and verify team.html has all required elements.

#### 4.3 Remove any debug/console.log statements

In `js/main.js`:

- Line with `console.log('[SW] Service Worker registered successfully')` - keep for SW debugging
- Keep form submission logs
- Consider removing or commenting debug logs before deployment

#### 4.4 Verify paths work on GitHub Pages

All paths are relative and should work:

- `./css/styles.css` from root
- `../css/styles.css` from pages/
- `./assets/images/` references are correct

### SECTION 5: Brand Guide Reference

BRAND_GUIDE.md already exists and is comprehensive. No changes needed.

---

## Files to be Edited

1. **css/styles.css** - Slider fixes, mobile responsiveness, z-index, cross-browser
2. **js/main.js** - Optional: cleanup debug statements
3. **pages/team.html** - Verify favicon and completeness

---

## Testing Checklist

After implementing changes:

- [ ] Desktop: Arrows fully visible on homepage slider
- [ ] Desktop: Arrows fully visible on services page slider  
- [ ] Mobile: Arrows tapable and inside container bounds
- [ ] Chrome: Test slider navigation
- [ ] Safari: Test slider on iOS
- [ ] Firefox: Test slider functionality
- [ ] Dark mode: Arrows visible in both modes
- [ ] Hover states: Cards don't overlap arrows
- [ ] Favicon: Appears on all pages
- [ ] No console errors on page load

---

## Follow-up Steps

1. Make the CSS edits as planned
2. Test in multiple browsers/devices
3. Verify no console errors
4. Complete final deployment readiness check
