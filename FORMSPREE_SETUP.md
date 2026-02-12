# Formspree Setup for Express It Logistics Ltd

## Current Status

The Contact Us form has been configured to use Formspree for email submissions. However, you need to complete the setup by adding your Formspree form ID.

## What Was Implemented

1. **HTML Updates** (`pages/contact.html`):
   - Content Security Policy (CSP) updated to allow Formspree
   - Form action set to Formspree endpoint
   - Honeypot field added for spam protection

2. **JavaScript Updates** (`js/main.js`):
   - AJAX submission to Formspree
   - Success/error handling
   - User notifications

## Setup Status: ✅ COMPLETED

The Formspree integration is now fully configured and operational.

### Configuration Details

- **Form ID**: `mvzbzqyl`
- **Endpoint**: `https://formspree.io/f/mvzbzqyl`
- **Recipient Email**: `info@expressitlogistics.co.ug`
- **Form Location**: `pages/contact.html`

### What Was Implemented ```

1. **HTML Updates** (`pages/contact.html`):
   - Content Security Policy (CSP) updated to allow Formspree
   - Form action set to Formspree endpoint
   - All form fields preserved with required attributes
   - Honeypot field added for spam protection

2. **JavaScript Updates** (`js/main.js`):
   - AJAX submission to Formspree
   - Input validation and sanitization
   - Success/error notifications
   - Form reset after successful submission

### Form Fields

The following fields are sent to Formspree:

- `name` - Full Name (required)
- `email` - Email Address (required)
- `phone` - Phone Number (optional)
- `service` - Service Required (optional)
- `message` - Message (required)
- `_subject` - Email Subject Line (identifies quote requests)
- `_gotcha` - Honeypot field (spam protection)

### Email Subject Line

All quote requests include a custom subject line:

- **Subject**: `Quote Request - Express It Logistics Ltd`

This ensures that quote requests can be easily identified in the inbox and distinguished from other emails.

## Testing

1. Deploy your changes to GitHub Pages
2. Visit the Contact page
3. Fill out the form and submit
4. Check for:
   - Success message appearing
   - Email received at <info@expressitlogistics.co.ug>

### Form Fields ```

The following fields are sent to Formspree:

- `name` - Full Name (required)
- `email` - Email Address (required)
- `phone` - Phone Number (optional)
- `service` - Service Required (optional)
- `message` - Message (required)
- `_subject` - Email Subject Line (identifies quote requests)
- `_gotcha` - Honeypot field (spam protection)

All quote requests include a custom subject line:

- **Subject**: `Quote Request - Express It Logistics Ltd`

This ensures that quote requests can be easily identified in the inbox and distinguished from other emails.

## Troubleshooting

### Form Not Submitting

- Check browser console for errors (F12)
- Verify Formspree endpoint is correct
- Ensure CSP allows `https://formspree.io`

### No Email Received

- Check spam/junk folder
- Verify recipient email in Formspree settings
- Check Formspree dashboard for submissions

### CORS Errors

- Ensure CSP includes: `connect-src 'self' https://formspree.io`

## Security Notes

- The honeypot field (`_gotcha`) helps prevent spam without CAPTCHA
- All inputs are sanitized before submission
- Content Security Policy is configured to allow Formspree connections

## Support

- Formspree Documentation: <https://formspree.io/docs>
- Formspree Help: <https://formspree.io/help>
