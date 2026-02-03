# Express IT Logistics - Brand Guide

**Internal Reference Document**  
*This is a reference guide only - do not lock files or block future edits.*

---

## Logo Specifications

### Visual Elements

**Icon Design:**
- Two interlocking gears (pink and grey)
- Embroidery-safe flat paths (no gradients or complex effects)
- Pink gear: 24 teeth, positioned at approximately 10 o'clock
- Grey gear: 16 teeth, positioned at approximately 4 o'clock
- Central white cutouts in each gear

**Colors:**
- Pink: `#e91e63` (primary accent)
- Grey: `#6b7280` (secondary gear)
- White: `#ffffff` (gear cutouts)

**File Location:** `assets/images/icon.svg`

### Logo Text

**Primary Brand Name:**
```
Express IT Logistics Ltd
```
(Note: "IT" in all caps, no space between Express and IT)

**Alternative (Footer/Compact):**
```
Express It
Logistics
```

### Gear Animation

**Allowed Animation:**
- Subtle 6° oscillation on hover (desktop only)
- 360° rotation on hover (current implementation)
- Must disable on touch devices (`@media (hover: hover)`)
- Must respect `prefers-reduced-motion`

**Prohibited:**
- Complex transforms that override gear positioning
- Animated colors or gradients on gears
- Stretched or distorted proportions

---

## Typography

**Primary Font:** Inter (Google Fonts)
- Weights: 400, 500, 600, 700, 800
- Fallback: system-ui stack

**Usage:**
- Headings: 700-800 weight
- Body text: 400-500 weight
- UI elements: 500-600 weight

**Character Spacing:**
- Logo subtitle: `0.1em` letter-spacing (uppercase)
- Section labels: `0.1em` letter-spacing (uppercase)

---

## Color System

### Pink Brand Colors (Light Mode)

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-pink` | `#e91e63` | Primary brand color, CTAs, links |
| `--color-pink-light` | `#f06292` | Hover states, subtle accents |
| `--color-pink-dark` | `#c2185b` | Gradients, darker accents |
| `--color-pink-bg` | `#fce4ec` | Light backgrounds, icons |
| `--color-pink-subtle` | `#f8bbd9` | Borders, dividers |

### Text Colors

| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--text-primary` | `#1a1a2e` | `#ffffff` |
| `--text-secondary` | `#2d2d44` | `#e8e8f0` |
| `--text-muted` | `#5c5c70` | `#a8a8c0` |

### Background Colors

| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--bg-primary` | `#ffffff` | `#1a1a2e` |
| `--bg-secondary` | `#faf5f7` | `#252542` |
| `--bg-tertiary` | `#f5eef2` | `#323258` |

### Important: Pink Color Consistency

**CRITICAL:** Pink colors must remain IDENTICAL in light and dark modes.

✅ **CORRECT:**
```css
--color-pink: #e91e63;  /* Same value in :root and .dark */
```

❌ **INCORRECT:**
```css
.dark {
  --color-pink: #f48fb1;  /* DO NOT shift pink in dark mode */
}
```

The pink accent should NOT shift toward purple in dark mode.

---

## Tone & Messaging

### Core Messaging

**Primary Focus:** Logistics, shipping, and global reach

**Tone:** Professional, reliable, logistics-first

### Dry Ice Positioning

Dry ice is a **SERVICE**, not a production focus.

✅ **CORRECT:**
- "Dry Ice Supply" (service offering)
- "Specialized dry ice for cold-chain logistics"
- "24/7 Dry Ice Supply Available"

❌ **INCORRECT:**
- "Dry Ice Production" (implies manufacturing focus)
- "Dry Ice Manufacturing" (not our core business)

### Experience

**Use:** "18+ Years Experience" (not 10+ years)

---

## File Structure Reference

```
Express-it-logistics-website/
├── assets/images/
│   └── icon.svg          # Logo (64x64 viewBox)
├── css/
│   └── styles.css        # All CSS (variables at top)
├── js/
│   └── main.js           # All JavaScript
├── pages/
│   ├── services.html     # Services page
│   ├── team.html         # Team page
│   └── contact.html      # Contact page
├── index.html            # Homepage
├── BRAND_GUIDE.md        # This file
└── manifest.json         # PWA manifest
```

---

## Common Mistakes to Avoid

1. **Pink Color Drift:** Never modify pink values in `.dark` mode
2. **Logo Text:** Always use "Express IT Logistics Ltd" (caps as shown)
3. **Dry Ice Wording:** "Supply" not "Production" or "Manufacturing"
4. **Experience:** Use "18+ years" consistently
5. **Gear Animation:** Must respect reduced motion preferences

---

## Approval & Updates

This guide is for reference only. Files are not locked.

When making changes:
1. Update this guide if brand rules change
2. Ensure CSS variables are updated consistently
3. Test across Chrome, Safari, Firefox, Edge
4. Test on iOS and Android devices

---

*Last Updated: 2026*  
*Document Version: 1.0*

