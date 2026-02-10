#!/bin/bash
cd /Users/alvin/Express-it-logistics-website

# Create pull request using GitHub CLI
gh pr create \
--title "feat(mobile): update Track Shipment link for mobile view only" \
--body "## Summary
Updates the Track Shipment link to use different URLs based on viewport width:
- Mobile (≤768px): https://touch.track-trace.com
- Desktop (≥769px): https://www.track-trace.com

## Changes Made
- **js/main.js**: Added \`initMobileTrackLink()\` function with viewport detection using \`window.matchMedia\`
- **HTML files**: Added \`id='mobile-track-link'\` to mobile menu Track Shipment links
- index.html
- pages/services.html
- pages/team.html
- pages/contact.html

## Behavior
- Responsive href updates on page load, resize, and orientation change
- Desktop header button behavior unchanged
- No duplicate links created
- Compatible with iOS Safari, Android Chrome, Firefox Mobile" \
--base main \
--head blackboxai/enhancement/browser-compatibility

