# Express IT Logistics - Brand Guide & Lock Reference

**Internal Reference Document - MASTER BRAND LOCK**  
*This document establishes what MUST NEVER CHANGE to prevent brand drift.*

---

## SECTION A: LOGO GEOMETRY LOCK (CRITICAL)

### Exact Gear Specifications

#### Pink Gear (Left, ~10 o'clock orientation)
| Property | Value | Notes |
|----------|-------|-------|
| Center Coordinates | (24, 24) | In 64x64 viewBox |
| Body Radius | 13px | EXACT - Do not change |
| Inner Hub Radius | 5.5px | EXACT - Do not change |
| Number of Teeth | 24 | EXACT - Do not change |
| Tooth Size | 3 × 3.5px | Width × Height |
| Rotation | -60° | EXACT - Creates 10 o'clock orientation |
| Fill Color | `#e91e63` | Never change |

#### Grey Gear (Right, ~4 o'clock orientation)
| Property | Value | Notes |
|----------|-------|-------|
| Center Coordinates | (40, 40) | In 64x64 viewBox |
| Body Radius | 10px | EXACT - Do not change |
| Inner Hub Radius | 6px | EXACT - Do not change |
| Number of Teeth | 16 | EXACT - Do not change |
| Tooth Size | 4 × 3.5px | Width × Height |
| Rotation | +60° | EXACT - Creates 4 o'clock orientation |
| Fill Color | `#6b7280` | Never change |

### Gear Positioning Rules
- Pink gear MUST be at (24, 24) - upper-left quadrant
- Grey gear MUST be at (40, 40) - lower-right quadrant
- Gears MUST NOT overlap
- Inner hubs MUST be white (`#ffffff`)
- Background MUST be transparent (no white backing)

### Logo File Requirements
- **Format:** SVG only (vector scalable)
- **ViewBox:** 0 0 64 64
- **No gradients** - solid fills only
- **No raster effects** - clean paths only
- **Suitable for:** Web, favicon, PWA (192/512), print, embroidery

---

## SECTION B: COLOR USAGE LOCK

### Pink Accent Colors (NEVER CHANGE)
| Variable | Value | Usage |
|----------|-------|-------|
| `--color-pink` | `#e91e63` | Primary brand, CTAs, links |
| `--color-pink-light` | `#f06292` | Hover states |
| `--color-pink-dark` | `#c2185b` | Active/pressed states |

**CRITICAL RULE:** Pink values MUST be identical in light AND dark modes.

### Grey Accent
| Variable | Value | Usage |
|----------|-------|-------|
| `--color-grey` | `#6b7280` | Secondary gear, muted text |

### Background Colors (Theme Variables)
| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--bg-primary` | `#ffffff` | `#1a1a2e` |
| `--bg-secondary` | `#faf5f7` | `#252542` |

---

## SECTION C: TYPOGRAPHY LOCK

### Font Family
```
Primary: Inter (Google Fonts)
Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
```

### Font Weights (LOCKED)
| Usage | Weight | CSS Value |
|-------|--------|-----------|
| Body text | Regular | 400-500 |
| Navigation | Medium | 500-600 |
| Headings | Bold | 700-800 |
| Hero/Stats | Extra Bold | 800 |

### Character Spacing (LOCKED)
| Element | Spacing |
|---------|---------|
| Logo subtitle | `0.1em` (uppercase) |
| Section labels | `0.1em` (uppercase) |

---

## SECTION D: ANIMATION CONSTRAINTS

### Allowed Animations
| Element | Animation | Duration |
|---------|-----------|----------|
| Logo gears | 360° rotation on hover | 1s |
| Buttons | Transform translateY(-2px) | 300ms |
| Cards | Transform translateY(-4px) | 300ms |

### Prohibited Animations
- ❌ Gear color changes
- ❌ Animated gradients
- ❌ Scale transforms on logo (except load animation)
- ❌ Bounce/spring physics
- ❌ Complex keyframe sequences

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  /* ALL animations disabled */
}
@media (hover: none) {
  /* Touch devices - no hover animations */
}
```

---

## SECTION E: MESSAGING RULES (LOCKED)

### Experience Statement
**Use:** "18+ Years Experience" (NEVER "10+ years")

### Service Names (EXACT)
1. Cold-Chain Support
2. Biological & Clinical Sample Logistics
3. Freight Transportation
4. Warehousing
5. Distribution Services
6. Cross-Border Logistics
7. Supply Chain Consulting

### Dry Ice Positioning
- Dry ice is a **SUPPORT SERVICE**, not the primary focus
- Use: "Cold-Chain Support" (primary)
- Use: "Dry Ice Supply" only in footer service list if needed
- NEVER use: "Dry Ice Production" or "Dry Ice Manufacturing"

### Taglines
- **Primary:** "We Deliver What Others Promise!"
- **Partner Subtitle:** "Industry collaborators who trust our logistics solutions"

---

## SECTION F: WHAT MUST NEVER CHANGE

### Logo Elements
- [ ] Gear geometry (radii, tooth count, positions)
- [ ] Gear colors (#e91e63 pink, #6b7280 grey)
- [ ] Inner hub white circles
- [ ] 10 o'clock / 4 o'clock orientation
- [ ] Transparent background

### Brand Colors
- [ ] Primary pink (#e91e63)
- [ ] Pink consistency across light/dark modes
- [ ] No purple drift in dark mode

### Typography
- [ ] Inter font family
- [ ] Weight hierarchy (400/500/700/800)
- [ ] Letter spacing on labels and subtitles

### Core Messaging
- [ ] 18+ years experience
- [ ] Logistics-first positioning
- [ ] Cold-chain (not dry ice production)
- [ ] East Africa + international focus

### File Structure
```
assets/images/
  ├── icon.svg           (MASTER logo)
  ├── icon-192.png       (PNG derivative)
  └── icon-512.png        (PNG derivative)

css/
  └── styles.css         (Single source of styles)

js/
  └── main.js            (Single source of JS)
```

---

## SECTION G: ANTI-DRIFT CHECKLIST

Before any AI-assisted edit, verify:

- [ ] Pink colors unchanged in `.dark` mode
- [ ] Logo radii remain at 5.5px (pink) and 6px (grey)
- [ ] No new fonts introduced
- [ ] No gradients added to logo
- [ ] "18+ years" used (not 10+)
- [ ] Services use "Cold-Chain Support" (not "Dry Ice Supply")
- [ ] No new animations beyond allowed list
- [ ] File structure unchanged

---

## Approval & Compliance

This is a **HARD LOCK** document. Violations must be flagged and corrected.

**Version:** 1.0  
**Last Updated:** 2026  
**Applies to:** All files in Express-it-logistics-website repository

