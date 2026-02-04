# Express IT Logistics - BRAND LOCK Reference

## ⚠️ CRITICAL: This document defines what MUST NEVER CHANGE

This brand lock ensures consistency across all platforms and outputs. Changes to these rules require team approval.

---

## 1. LOGO GEOMETRY RULES

### Icon SVG (`assets/images/icon.svg`)

#### Pink Gear (Primary Brand Marker)

| Property | Value | Lock Status |
| ---------- | ------- | ------------- |
| Center | (24, 24) | 🔒 LOCKED |
| Body Radius | 13px | 🔒 LOCKED |
| Teeth Count | 24 | 🔒 LOCKED |
| Tooth Size | 3×3.5px | 🔒 LOCKED |
| Inner White Hub | **6.5px** (was 5.5) | 🔒 LOCKED |
| Rotation | -60° (10 o'clock) | 🔒 LOCKED |
| Color | #e91e63 | 🔒 LOCKED |

#### Grey Gear (Secondary Brand Marker)

| Property | Value | Lock Status |
| ---------- | ------- | ------------- |
| Center | (40, 40) | 🔒 LOCKED |
| Body Radius | 10px | 🔒 LOCKED |
| Teeth Count | 16 | 🔒 LOCKED |
| Tooth Size | 4×3.5px | 🔒 LOCKED |
| Inner White Hub | **4.5px** (was 6) | 🔒 LOCKED |
| Rotation | +60° (4 o'clock) | 🔒 LOCKED |
| Color | #6b7280 | 🔒 LOCKED |

#### Universal Rules

- ✅ Transparent background ONLY (no white outside gears)
- ✅ White appears ONLY in inner hubs
- ✅ No gradients (solid fills only)
- ✅ No raster effects
- ✅ No background shapes or containers
- ✅ Embroidery-safe flat paths

---

## 2. COLOR SYSTEM

### Primary Pink Palette (NEVER CHANGE)

```=======
### Primary Pink Palette (NEVER CHANGE)

```text
#e91e63    - Brand Pink (Primary)
#f06292    - Pink Light (Hover states)
#c2185b    - Pink Dark (Active/Pressed)
#f8bbd9    - Pink Subtle (Background accents)
#fce4ec    - Pink Background (Light mode backgrounds)
#3d2544    - Pink Background (Dark mode)

#e91e63    - Brand Pink (Primary)
#f06292    - Pink Light (Hover states)
#c2185b    - Pink Dark (Active/Pressed)
#f8bbd9    - Pink Subtle (Background accents)
#fce4ec    - Pink Background (Light mode backgrounds)
#3d2544    - Pink Background (Dark mode)
```

### Semantic Color Mappings

```css
--color-primary: var(--color-pink);
--color-primary-light: var(--color-pink-light);
--color-primary-dark: var(--color-pink-dark);
--color-primary-bg: var(--color-pink-bg);
```

### Neutral Colors

```Color
#1a1a2e    - Text Primary
#2d2d44    - Text Secondary
#5c5c70    - Text Muted
#ffffff    - Background Primary
#faf5f7    - Background Secondary
#f5eef2    - Background Tertiary
#f0d9e0    - Border Color
```

---

## 3. TYPOGRAPHY

### Primary Font

Family: Inter
Weight: 300, 400, 500, 600, 700, 800
Fallback: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto

### Font Sizes (clamp() for responsiveness)

Hero Title: clamp(1.75rem, 5vw, 3.75rem)
Section Title: clamp(2rem, 4vw, 2.75rem)
Body: 1rem (16px minimum for inputs)

### Line Heights

Body Text: 1.6
Headings: 1.2

---

## 4. ANIMATION LIMITS

### Allowed Animations

| Element | Animation | Duration | Timing |
| --------- | ----------- | ---------- | -------- |
| Logo | Fade + Scale on load | 350ms | ease-out |
| Nav Link | Underline expand | 150ms | ease |
| Buttons | Background/Transform | 300ms | ease |
| Cards | Hover lift + shadow | 300ms | ease |
| Dark Mode | Color transition | 300ms | ease |
| Gear Hover | Rotation (desktop only) | 1000ms | ease-in-out |

### Animation Restrictions

- ❌ NO continuous animations (except partners carousel)
- ❌ NO auto-playing videos
- ❌ NO parallax scrolling effects
- ❌ NO flashing/blinking elements
- ✅ Use `prefers-reduced-motion` media query
- ✅ All animations must be CSS-based

---

## 5. FAVICON SIZES (Generated)

| Size | File | Purpose |
| ------ | ------ | --------- |
| 16×16 | favicon-16x16.png | Browser tab |
| 32×32 | favicon-32x32.png | High-DPI tabs |
| 180×180 | apple-touch-icon.png | iOS Home Screen |
| 192×192 | icon-192.png | Android/PWA |
| 512×512 | icon-512.png | PWA Splash |

### Favicon Generation

- Source: `assets/images/icon.svg`
- Generator: `generate_favicons.py`
- Output: `assets/images/*.png`
- Background: Transparent (not white)

---

## 6. WHAT MUST NEVER CHANGE

### Logo Rules

1. ❌ NEVER add background color/shape outside gears
2. ❌ NEVER change gear positions or sizes
3. ❌ NEVER modify tooth counts or shapes
4. ❌ NEVER change rotation angles
5. ❌ NEVER replace white hubs with brand colors
6. ❌ NEVER add shadows or effects

### Color Rules

1. ❌ NEVER use different pink shades
2. ❌ NEVER change semantic color mappings
3. ❌ NEVER remove dark mode colors
4. ❌ NEVER add new brand colors

### Typography Rules

1. ❌ NEVER change the font family
2. ❌ NEVER reduce body font below 16px
3. ❌ NEVER remove font fallbacks

### Animation Rules

1. ❌ NEVER add unapproved animations
2. ❌ NEVER increase animation durations
3. ❌ NEVER remove reduced-motion support

---

## 7. FILE REFERENCES

### Required Favicon Links (All Pages)

```html
<!-- SVG (Primary) -->
<link rel="icon" type="image/svg+xml" href="assets/images/icon.svg">

<!-- PNG Fallbacks -->
<link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="192x192" href="assets/images/icon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="assets/images/icon-512.png">
<link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">
```

---

## 8. VALIDATION CHECKLIST

Before deploying any change:

- [ ] Logo gears have transparent background
- [ ] White appears only in inner hubs
- [ ] Favicon generates all 5 sizes
- [ ] All HTML pages include favicon links
- [ ] Colors match brand palette exactly
- [ ] Animations respect reduced-motion
- [ ] No new colors added
- [ ] Typography uses Inter with fallbacks

---

## 9. REVISION HISTORY

| Version | Date       | Changes                                       |
|---------|------------|-----------------------------------------------|
| 1.0     | 2024-02-04 | Initial brand lock                            |
| 1.1     | 2024-02-04 | Updated inner radii: pink 5.5→6.5, grey 6→4.5 |

---

**Document Owner**: Development Team  
**Last Updated**: 2024-02-04  
**Next Review**: 2024-05-01
