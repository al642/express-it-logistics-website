# Mobile Track Shipment Link Update - TODO

## Task: Update Track Shipment link for mobile view only

### HTML Changes (Add ID to mobile menu links)

- [x] index.html - Add id="mobile-track-link" to mobile Track Shipment link
- [x] pages/services.html - Add id="mobile-track-link" to mobile Track Shipment link
- [x] pages/team.html - Add id="mobile-track-link" to mobile Track Shipment link
- [x] pages/contact.html - Add id="mobile-track-link" to mobile Track Shipment link

### JavaScript Changes (js/main.js)

- [x] Add mobile detection function using window.matchMedia
- [x] Add function to update mobile track link href based on viewport
- [x] Initialize on page load
- [x] Add resize listener for dynamic updates

### Testing

- [ ] Verify desktop → <www.track-trace.com>
- [ ] Verify mobile (≤768px) → touch.track-trace.com
- [ ] Verify resize updates href correctly
- [ ] Test on iOS Safari, Android Chrome, Firefox Mobile
