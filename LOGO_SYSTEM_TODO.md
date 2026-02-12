# Logo System Implementation - Progress Tracking

## STEP 1 — LOGO FILE STRUCTURE (SVG SYSTEM)

### Files to Create

- [ ] `assets/images/logo.svg` - Primary Logo (Desktop header + Footer, light mode)
- [ ] `assets/images/logo-dark.svg` - Dark Mode Logo (Inverted for visibility)
- [ ] `assets/images/logo-icon.svg` - Simplified Icon Version (Mobile header + Favicon)

### Optimization Requirements

- [ ] Remove unnecessary metadata
- [ ] Clean SVG paths
- [ ] No embedded raster images
- [ ] Scalable vector only
- [ ] Preserve aspect ratio (64x64 viewBox)
- [ ] Lightweight file size

### Design Specifications

**Primary Colors:**

- Pink: #e91e63 (magenta - stays vibrant in all modes)
- Grey (light mode): #6b7280
- Grey (dark mode): #9ca3af (lighter for contrast)
- White: #ffffff (inner hubs only - transparent background)

**Geometry Documentation (Soft Lock):**

- Pink Gear (Left): Center (24, 24), Body radius 13, 24 teeth, Inner hub 6.5, Rotation -60°
- Grey Gear (Right): Center (40, 40), Body radius 10, 16 teeth, Inner hub 4.5, Rotation +60°

### Animation Compatibility

- [ ] Preserve IDs: gear-pink, gear-grey
- [ ] Support CSS animations: gearPinkRotate, gearGreyRotate
- [ ] Support page load animation: logoFadeInScale

---

## STEP 2 — PAGE INTEGRATION (Pending)

- [ ] Update index.html with logo.svg and logo-dark.svg
- [ ] Update pages/services.html
- [ ] Update pages/contact.html
- [ ] Update pages/team.html
- [ ] Add dark mode toggle JavaScript

---

## STEP 3 — CSS UPDATES (Pending)

- [ ] Add CSS custom properties for logo theming
- [ ] Update logo styles for dark mode
