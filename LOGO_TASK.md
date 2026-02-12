# Logo Standardization - Task List

## STEP 1: Delete Unused Logo Files

- [x] Delete `assets/images/logo.svg`
- [x] Delete `assets/images/icon.svg`

## STEP 2: Update index.html

- [x] Replace logo references from `icon.svg` to `logo.png`
- [x] Update header logo
- [x] Update footer logo
- [x] Update favicon links to use PNG versions

## STEP 3: Update pages/services.html

- [x] Replace logo references from `icon.svg` to `logo.png`
- [x] Update header logo
- [x] Update footer logo
- [x] Update favicon links

## STEP 4: Update pages/contact.html

- [x] Replace logo references from `icon.svg` to `logo.png`

- [x] Update header logo
- [x] Update footer logo
- [x] Update favicon links

## STEP 5: Update pages/team.html

- [x] Replace logo references from `icon.svg` to `logo.png`
- [x] Update header logo
- [x] Update footer logo
- [x] Update favicon links

## STEP 6: Update CSS (if needed)

- [x] Add `.navbar { display: flex; align-items: center; }`
- [x] Add `.logo-link img { height: 55px; width: auto; }` for desktop
- [x] Add responsive logo sizing for mobile (44px on tablet, 40px on mobile)
- [x] Update `.logo-icon` to use height-based sizing
- [x] Update scrolled state logo heights (48px desktop, 44px mobile)

## STEP 7: Verify

- [x] All pages updated correctly
- [x] Logo.png is now the single logo file
- [x] Favicon icons retained (PNG versions)
- [x] Layout preserved - no restructuring
- [x] Logo properly centered with flexbox in navbar
- [x] No stretching or distortion - uses `height` with `width: auto`
- [x] Responsive logo sizing at all breakpoints

## Final Assets

- `assets/images/logo.png` (PRIMARY - used everywhere)
- `assets/images/apple-touch-icon.png`
- `assets/images/favicon-16x16.png`
- `assets/images/favicon-32x32.png`
- `assets/images/icon-192.png`
- `assets/images/icon-512.png`

## Files Removed

- `assets/images/logo.svg`
- `assets/images/icon.svg`
