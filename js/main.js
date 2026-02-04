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
    const { classList } = document.documentElement;

    // Apply dark mode if: saved preference is true OR (no saved preference AND system is dark)
    const shouldBeDark = savedPreference === "true" || (savedPreference === null && prefersDark);

    if (shouldBeDark) {
      classList.add("dark");
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
            classList.add("dark");
          } else {
            classList.remove("dark");
          }
          updateDarkModeIcons();
        }
      });
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const { classList } = document.documentElement;
    const isDark = classList.toggle("dark");
    localStorage.setItem("darkMode", isDark);
    updateDarkModeIcons();
  };

  // Update Dark Mode Icons
  const updateDarkModeIcons = () => {
    const { classList: rootClassList } = document.documentElement;
    const isDark = rootClassList.contains("dark");
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
      let lastScrollY = window.scrollY;
      let ticking = false;

      const updateScroll = () => {
        const {scrollY} = window;
        
        // Add/remove scrolled class based on scroll position
        if (scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
        
        lastScrollY = scrollY;
        ticking = false;
      };

      window.addEventListener("scroll", () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateScroll();
          });
          ticking = true;
        }
      }, { passive: true });
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

  /**
   * AWB Tracking Functionality
   * Handles Air Waybill (AWB) number validation and redirect tracking
   */
  const initAWBTracking = () => {
    const trackingForm = document.getElementById('awb-tracking-form');
    const awbInput = document.getElementById('awb-input');
    const trackingError = document.getElementById('tracking-error');

    if (!trackingForm || !awbInput || !trackingError) return;

    // Validate AWB format: 000-00000000 (3 digits + optional dash + 8 digits)
    const validateAWB = (awb) => {
      // Remove all spaces
      const sanitized = awb.replace(/\s+/g, '');
      
      // Check if empty
      if (!sanitized || !sanitized.trim()) {
        return { isValid: false, message: 'Please enter an AWB number', sanitized: '' };
      }
      
      // Check if contains only numbers and optional dash
      if (!/^[\d-]+$/.test(sanitized)) {
        return { isValid: false, message: 'AWB number must contain only numbers and a dash (-)', sanitized: sanitized };
      }
      
      // Check format: 3 digits + optional dash + 8 digits
      // Must be either 11 chars with dash or 11 chars without (3+8=11)
      if (sanitized.length !== 11 && sanitized.length !== 12) {
        return { isValid: false, message: 'AWB must be 11 digits (with or without dash)', sanitized: sanitized };
      }
      
      // Validate the pattern
      const patternWithDash = /^(\d{3})-(\d{8})$/;
      const patternWithoutDash = /^(\d{11})$/;
      
      if (!patternWithDash.test(sanitized) && !patternWithoutDash.test(sanitized)) {
        return { isValid: false, message: 'Invalid AWB format. Use: 000-00000000 or 00000000000', sanitized: sanitized };
      }
      
      return { isValid: true, message: '', sanitized: sanitized };
    };

    // Format AWB with dash for display
    const formatAWB = (awb) => {
      const sanitized = awb.replace(/\s+/g, '');
      if (sanitized.length === 11 && !sanitized.includes('-')) {
        return sanitized.substring(0, 3) + '-' + sanitized.substring(3);
      }
      return sanitized;
    };

    // Show error message
    const showError = (message) => {
      trackingError.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
      trackingError.classList.add('visible');
      awbInput.classList.add('error');
      awbInput.classList.remove('success');
    };

    // Clear error message
    const clearError = () => {
      trackingError.classList.remove('visible');
      trackingError.innerHTML = '';
      awbInput.classList.remove('error');
    };

    // Handle input change
    awbInput.addEventListener('input', () => {
      const value = awbInput.value;
      if (value) {
        // Auto-format while typing
        const formatted = formatAWB(value);
        if (formatted !== value) {
          awbInput.value = formatted;
        }
        clearError();
      }
    });

    // Handle form submission
    trackingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const awbValue = awbInput.value;
      const validation = validateAWB(awbValue);
      
      if (!validation.isValid) {
        showError(validation.message);
        awbInput.focus();
        return;
      }
      
      // Valid AWB - clear any errors and show success state
      clearError();
      awbInput.classList.add('success');
      
      // Sanitize and format AWB for URL
      const sanitizedAWB = validation.sanitized.replace(/[^0-9-]/g, '');
      const formattedForURL = formatAWB(sanitizedAWB).toUpperCase();
      
      // Build redirect URL
      const trackingURL = `https://www.cargotracking.aero/track/awb/${formattedForURL}`;
      
      // Open in new tab
      window.open(trackingURL, '_blank', 'noopener,noreferrer');
      
      // Show success notification
      showNotification('Redirecting to tracking page...', 'success');
      
      // Clear input after successful submission
      setTimeout(() => {
        awbInput.value = '';
        awbInput.classList.remove('success');
      }, 500);
    });

    // Handle Enter key press
    awbInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        trackingForm.dispatchEvent(new Event('submit'));
      }
    });
  };
  /**
   * Services Page Carousel Functionality
   * Handles "Learn more" expand/collapse for services carousel
   */
  const initServicesPageCarousel = () => {
    const carousel = document.getElementById('services-page-carousel');
    const prevBtn = document.querySelector('.services-page-carousel-prev');
    const nextBtn = document.querySelector('.services-page-carousel-next');

    if (!carousel || !prevBtn || !nextBtn) return;

    let scrollAmount = 0;
    let maxScroll = 0;
    
    // Use getBoundingClientRect for accurate measurements that account for padding
    const updateMaxScroll = () => {
      const container = carousel.parentElement;
      const containerRect = container.getBoundingClientRect();
      const carouselWidth = carousel.scrollWidth;
      // Account for the padding in the container (5rem left + 5rem right = 160px)
      const horizontalPadding = 160;
      const visibleWidth = Math.max(0, containerRect.width - horizontalPadding);
      
      maxScroll = Math.max(0, carouselWidth - visibleWidth);
    };

    const updateButtons = () => {
      prevBtn.disabled = scrollAmount <= 0;
      nextBtn.disabled = scrollAmount >= maxScroll;
    };

    const scrollTo = (newScrollAmount) => {
      scrollAmount = Math.max(0, Math.min(newScrollAmount, maxScroll));
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
      updateButtons();
    };

    prevBtn.addEventListener('click', () => {
      scrollTo(Math.max(0, scrollAmount - 304)); // 280px slide + 24px gap
    });

    nextBtn.addEventListener('click', () => {
      scrollTo(Math.min(maxScroll, scrollAmount + 304));
    });

    // Initialize
    updateMaxScroll();
    updateButtons();

    // Handle window resize - recalculate scroll limits
    window.addEventListener('resize', () => {
      updateMaxScroll();
      scrollTo(Math.min(scrollAmount, maxScroll));
    }, { passive: true });

    // Handle accordion expansion - recalculate after content expands
    const pageLearnMoreButtons = document.querySelectorAll('.service-page-learn-more');
    pageLearnMoreButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Give time for CSS transition to complete before recalculating
        setTimeout(() => {
          updateMaxScroll();
          // Ensure current scroll position is still valid
          scrollAmount = Math.min(scrollAmount, maxScroll);
          carousel.style.transform = `translateX(-${scrollAmount}px)`;
          updateButtons();
        }, 400); // Match or slightly exceed CSS transition time
      });
    });
  };

  // Initialize when DOM is ready
  const init = () => {
    setCopyrightYear();
    initDarkMode();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initFormSubmission();
    initAWBTracking();
    initServicesCarousel();
    initServicesPageAccordion();
    initServicesPageCarousel();
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
   * Services Carousel Functionality (Home Page)
   */
  const initServicesCarousel = () => {
    const carousel = document.getElementById('services-carousel');
    const prevBtn = document.querySelector('.services-carousel-prev');
    const nextBtn = document.querySelector('.services-carousel-next');

    if (!carousel || !prevBtn || !nextBtn) return;

    let scrollAmount = 0;
    let maxScroll = 0;
    
    // Use getBoundingClientRect for accurate measurements
    const updateMaxScroll = () => {
      const container = carousel.parentElement;
      const containerRect = container.getBoundingClientRect();
      const carouselWidth = carousel.scrollWidth;
      // Account for horizontal padding (5rem left + 5rem right = 160px)
      const horizontalPadding = 160;
      const visibleWidth = Math.max(0, containerRect.width - horizontalPadding);
      
      maxScroll = Math.max(0, carouselWidth - visibleWidth);
    };

    const updateButtons = () => {
      prevBtn.disabled = scrollAmount <= 0;
      nextBtn.disabled = scrollAmount >= maxScroll;
    };

    const scrollTo = (newScrollAmount) => {
      scrollAmount = Math.max(0, Math.min(newScrollAmount, maxScroll));
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
      updateButtons();
    };

    prevBtn.addEventListener('click', () => {
      scrollTo(Math.max(0, scrollAmount - 344)); // 320px slide + 24px gap
    });

    nextBtn.addEventListener('click', () => {
      scrollTo(Math.min(maxScroll, scrollAmount + 344));
    });

    // Initialize button states
    updateMaxScroll();
    updateButtons();

    // Handle window resize - recalculate scroll limits
    window.addEventListener('resize', () => {
      updateMaxScroll();
      scrollAmount = Math.min(scrollAmount, maxScroll);
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
      updateButtons();
    }, { passive: true });
  };

  /**
   * Services Page Accordion Functionality
   * Handles "Learn more" expand/collapse for services on the services page only
   */
  const initServicesPageAccordion = () => {
    const learnMoreButtons = document.querySelectorAll('.service-page-learn-more');

    if (!learnMoreButtons.length) return;

    learnMoreButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const contentId = button.getAttribute('aria-controls');
        const content = document.getElementById(contentId);

        // Close all other open items (accordion behavior - one at a time)
        learnMoreButtons.forEach(otherButton => {
          if (otherButton !== button) {
            const otherContentId = otherButton.getAttribute('aria-controls');
            const otherContent = document.getElementById(otherContentId);
            if (otherButton.getAttribute('aria-expanded') === 'true' && otherContent) {
              otherButton.setAttribute('aria-expanded', 'false');
              otherButton.setAttribute('aria-label', 'Learn more');
              otherContent.hidden = true;
            }
          }
        });

        // Toggle current item
        const newExpandedState = !isExpanded;
        button.setAttribute('aria-expanded', newExpandedState.toString());
        button.setAttribute('aria-label', newExpandedState ? 'Show less' : 'Learn more');

        if (content) {
          content.hidden = !newExpandedState;
        }
      });
    });
  };

/**
   * Service Worker Registration
   * Provides offline capability and improved performance
   * Safe implementation for GitHub Pages deployment
   */
  const initServiceWorker = () => {
    // Check if service workers are supported
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
          window.addEventListener('load', () => {
            // Register the service worker
            navigator.serviceWorker.register('./sw.js')
              .then((registration) => {
                // Check for updates
                registration.addEventListener('updatefound', () => {
                  const installingWorker = registration.installing;
    
                  installingWorker.addEventListener('statechange', () => {
                    if (installingWorker.state === 'installed' && navigator.serviceWorker.controller && document.visibilityState === 'visible') {
                          showNotification('New version available! Refresh to update.', 'info');
                    }
                  });
                });
              })
              .catch((error) => {
                // Service worker registration failed - silently fail for production
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
          });
    }
  };

  // Initialize Service Worker for PWA support
  initServiceWorker();

})();
