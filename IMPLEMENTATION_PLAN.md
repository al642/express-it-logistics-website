# Implementation Plan - Express IT Logistics Website

## Information Gathered

### Current State Analysis:

**1. Logo/SVG (icon.svg):**
- Two interlocking gears with rotations: pink (-60°), grey (+120°)
- Pink gear: r=13, 12 teeth at 30° intervals
- Grey gear: r=10, 10 teeth at 36° intervals
- Tooth dimensions: 4x3 with 0.5px border-radius

**2. CSS (styles.css):**
- `--color-pink: #e91e63` defined but `--brand-pink` NOT defined
- Pink accent consistent across light/dark mode ✓
- Dark mode toggle is icon-only ✓
- Header shrink-on-scroll exists ✓
- Page load animation exists ✓
- Logo hover does full 360° rotation (needs change to ≤6° oscillation)

**3. HTML Files:**
- Brand naming inconsistency: Some pages show "Express IT" vs "Express It"
- Company name should be exactly: "Express IT Logistics Ltd"
- SEO meta data exists but titles/descriptions could be more unique

**4. JavaScript (main.js):**
- Uses IIFE pattern with function declarations
- Some areas use function expressions that could be arrow functions
- Object destructuring could be improved

**5. PWA:**
- manifest.json exists with basic config
- No favicon.ico or app-icon.png (uses SVG only)

---

## Plan - File Level Changes

### 1. **assets/images/icon.svg** - Logo Gear Updates
- [ ] Increase tooth count (pink: 12→16 teeth, grey: 10→12 teeth)
- [ ] Shorten tooth length
- [ ] Lock SVG transforms with `transform-box: fill-box` and `transform-origin`
- [ ] Update hover animation to ≤6° oscillation

### 2. **css/styles.css** - CSS Updates
- [ ] Add `--brand-pink` CSS variable (#e91e63)
- [ ] Replace all `--color-pink` with `--brand-pink`
- [ ] Update logo hover animation to micro-rotation (≤6°)
- [ ] Lock gear transforms to prevent override by hover/dark mode
- [ ] Add subtle page-load animation (already exists, verify ≤150ms)
- [ ] Fix any lint warnings

### 3. **index.html** - Home Page
- [ ] Update all brand text to "Express IT Logistics Ltd"
- [ ] Add unique meta description
- [ ] Fix title uniqueness
- [ ] Add brand-safe favicon link
- [ ] Add PWA icons

### 4. **pages/contact.html** - Contact Page
- [ ] Update all brand text to "Express IT Logistics Ltd"
- [ ] Add unique meta description
- [ ] Fix title uniqueness

### 5. **pages/services.html** - Services Page
- [ ] Update all brand text to "Express IT Logistics Ltd"
- [ ] Add unique meta description
- [ ] Fix title uniqueness

### 6. **pages/team.html** - Team Page
- [ ] Update all brand text to "Express IT Logistics Ltd"
- [ ] Add unique meta description
- [ ] Fix title uniqueness

### 7. **js/main.js** - JavaScript Refactoring
- [ ] Convert function declarations to arrow functions where appropriate
- [ ] Prefer object destructuring
- [ ] Fix lint warnings (only touch files with warnings)

### 8. **manifest.json** - PWA Updates
- [ ] Add proper icon references
- [ ] Add icons array with multiple sizes

### 9. **robots.txt** - Review
- [ ] Verify SEO configuration

### 10. **favicon creation** - Brand-safe favicon
- [ ] Create favicon.ico using gear logo
- [ ] Create app-icon.png for PWA

---

## Dependent Files to be Edited

| File | Dependencies |
|------|--------------|
| css/styles.css | icon.svg (for animation origins) |
| index.html | css/styles.css, manifest.json |
| pages/*.html | css/styles.css, manifest.json |
| js/main.js | HTML files (for DOM interactions) |

---

## Followup Steps

1. **Testing:**
   - Verify gear animation on desktop hover
   - Test dark mode toggle
   - Verify mobile header spacing
   - Check all pages load correctly

2. **Validation:**
   - Run HTML validation
   - Check console for JavaScript errors
   - Verify PWA manifest

3. **Performance:**
   - Check page load times
   - Verify animations don't impact performance

---

## Success Criteria Checklist

- [ ] Gears clearly reflect 10 & 4 orientation
- [ ] Pink accent looks identical in light and dark mode
- [ ] No lint or markdown warnings
- [ ] No new branches created
- [ ] Site remains visually the same, only cleaner, tighter, more official
- [ ] Dark mode toggle is icon-only
- [ ] Logo hover has subtle micro-rotation (≤6°)
- [ ] Header shrink-on-scroll works
- [ ] Page-load animation is ≤150ms
- [ ] SEO meta data is unique and proper
- [ ] Company name reads exactly: "Express IT Logistics Ltd"

