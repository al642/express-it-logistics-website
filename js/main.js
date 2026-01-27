/**
 * Express IT Logistics - Main JavaScript
 * Shared functionality for all pages
 */

(function () {
  "use strict";

  // Set copyright year to 2026
  const setCopyrightYear = () => {
    const yearElements = document.querySelectorAll(".copyright-year");
    yearElements.forEach((el) => {
      el.textContent = "2026";
    });
  };

  // Initialize Dark Mode
  const initDarkMode = () => {
    const darkModeToggles = document.querySelectorAll("#dark-mode-toggle, #dark-mode-toggle-mobile");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedPreference = localStorage.getItem("darkMode");

    // Apply dark mode if: saved preference is true OR (no saved preference AND system is dark)
    const shouldBeDark = savedPreference === "true" || (savedPreference === null && prefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }

    // Update toggle icons
    updateDarkModeIcons();

    // Add click handlers
    darkModeToggles.forEach((toggle) => {
      if (toggle) {
        toggle.addEventListener("click", toggleDarkMode);
      }
    });

    // Listen for system preference changes
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        // Only auto-switch if user hasn't set a manual preference
        if (localStorage.getItem("darkMode") === null) {
          if (e.matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          updateDarkModeIcons();
        }
      });
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", isDark);
    updateDarkModeIcons();
  };

  // Update Dark Mode Icons
  const updateDarkModeIcons = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const icons = document.querySelectorAll("#dark-mode-toggle i, #dark-mode-toggle-mobile i");

    icons.forEach((icon) => {
      if (isDark) {
        icon.className = "fas fa-sun";
      } else {
        icon.className = "fas fa-moon";
      }
    });
  };

  // Mobile Menu Functionality
  const initMobileMenu = () => {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          mobileMenu.classList.remove("open");
        }
      });

      // Close mobile menu when pressing Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
          mobileMenu.classList.remove("open");
        }
      });
    }
  };

  // Navbar Scroll Effect
  const initNavbarScroll = () => {
    const navbar = document.getElementById("navbar");

    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });
    }
  };

  // Smooth Scroll for Anchor Links
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (href !== "#") {
          e.preventDefault();
          const target = document.querySelector(href);

          if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });

            // Close mobile menu after clicking
            const mobileMenu = document.getElementById("mobile-menu");
            if (mobileMenu) {
              mobileMenu.classList.remove("open");
            }
          }
        }
      });
    });
  };

  // Form Submission Handler for Contact Form
  const initFormSubmission = () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');

        // Sanitize inputs to prevent script injection
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedPhone = sanitizeInput(phone);
        const sanitizedService = sanitizeInput(service);
        const sanitizedMessage = sanitizeInput(message);

        // Validate
        let isValid = true;
        const errors = [];

        if (!sanitizedName || !sanitizedName.trim()) {
          errors.push('Please enter your name');
          isValid = false;
        }

        if (!sanitizedEmail || !sanitizedEmail.trim()) {
          errors.push('Please enter your email');
          isValid = false;
        } else if (!isValidEmail(sanitizedEmail)) {
          errors.push('Please enter a valid email address');
          isValid = false;
        }

        if (!sanitizedMessage || !sanitizedMessage.trim()) {
          errors.push('Please enter your message');
          isValid = false;
        }

        if (isValid) {
          // Simulate form submission to info@expressitlogistics.co.ug
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i> Sending...';
          submitBtn.disabled = true;

          // Simulate API call delay
          setTimeout(() => {
            // Build email body for the "submission"
            const emailBody = `
New Contact Form Submission
===========================
Name: ${sanitizedName}
Email: ${sanitizedEmail}
Phone: ${sanitizedPhone || 'Not provided'}
Service: ${sanitizedService || 'Not specified'}
Message: ${sanitizedMessage}
---------------------------
Submitted from: Express IT Logistics Website
Submitted at: ${new Date().toLocaleString()}
            `.trim();

            console.log('Form submitted to info@expressitlogistics.co.ug');

            // Show success message
            showNotification('Thank you for your inquiry! Our team will contact you at ' + sanitizedEmail + ' within 24 hours.', 'success');

            // Reset form
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 1500);
        } else {
          showNotification(errors.join('. '), 'error');
        }
      });
    }
  };

  // Sanitize user input to prevent script injection
  const sanitizeInput = (input) => {
    if (!input) return '';
    // Remove any HTML/script tags
    return String(input)
      .replace(/[<>]/g, '')
      .trim();
  };

  // Validate Email Format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Show Notification
  const showNotification = (message, type) => {
    // Remove existing notification
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification fixed top-24 right-4 z-50 px-6 py-4 rounded-lg shadow-lg max-w-sm transition-all duration-300";
    notification.setAttribute("role", "alert");
    notification.setAttribute("aria-live", "polite");

    // Set notification style based on type
    if (type === "success") {
      notification.style.backgroundColor = "#059669";
      notification.style.color = "#ffffff";
    } else if (type === "error") {
      notification.style.backgroundColor = "#dc2626";
      notification.style.color = "#ffffff";
    } else {
      notification.style.backgroundColor = "var(--color-primary)";
      notification.style.color = "#ffffff";
    }

    notification.textContent = message;

    // Add close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "×";
    closeBtn.style.cssText = "background: none; border: none; color: inherit; font-size: 1.5rem; cursor: pointer; position: absolute; top: 0.25rem; right: 0.5rem; padding: 0; line-height: 1;";
    closeBtn.setAttribute("aria-label", "Dismiss notification");
    closeBtn.addEventListener("click", () => {
      notification.remove();
    });
    notification.appendChild(closeBtn);

    document.body.appendChild(notification);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  };
  // Initialize when DOM is ready
  const init = () => {
    setCopyrightYear();
    initDarkMode();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initFormSubmission();
  };

  // Run init function when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Export functions for potential use in other scripts
  window.ExpressIT = {
    toggleDarkMode: toggleDarkMode,
    showNotification: showNotification,
    isValidEmail: isValidEmail,
    sanitizeInput: sanitizeInput
  };

  /**
   * Service Worker Registration
   * Provides offline capability and improved performance
   * Safe implementation for GitHub Pages deployment
   */
  const initServiceWorker = () => {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      // Only register on HTTPS (or localhost for development)
      if (window.location.protocol === 'https:' || window.location.hostname === 'localhost') {
        // Wait for the page to load
        window.addEventListener('load', () => {
          // Register the service worker
          navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
              console.log('[SW] Service Worker registered successfully');
              console.log('[SW] Scope:', registration.scope);

              // Check for updates
              registration.addEventListener('updatefound', () => {
                const installingWorker = registration.installing;
                console.log('[SW] New service worker found');

                installingWorker.addEventListener('statechange', () => {
                  if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                      // New update available
                      console.log('[SW] New content available, please refresh');
                      // Only show notification if user is active
                      if (document.visibilityState === 'visible') {
                        showNotification('New version available! Refresh to update.', 'info');
                      }
                    } else {
                      // Content cached for offline use
                      console.log('[SW] Content cached for offline use');
                    }
                  }
                });
              });
            })
            .catch((error) => {
              console.error('[SW] Service Worker registration failed:', error);
              // Don't break the site if SW fails
            });

          // Check for updates periodically (every 5 minutes)
          setInterval(() => {
            if (navigator.serviceWorker.controller) {
              navigator.serviceWorker.getRegistration().then((registration) => {
                if (registration) {
                  registration.update();
                }
              });
            }
          }, 300000);

          // Handle messages from service worker
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.version) {
              console.log('[SW] Current cache version:', event.data.version);
            }
          });
        });
      } else {
        console.log('[SW] Service workers require HTTPS (or localhost)');
      }
    } else {
      console.log('[SW] Service workers not supported in this browser');
    }
  };

  // Initialize Service Worker for PWA support
  initServiceWorker();

})();
