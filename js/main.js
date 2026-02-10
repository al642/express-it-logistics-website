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

/**
 * Dark Mode Manager Class
 * Handles dark mode toggle, persistence, and sync across pages
 */
class DarkModeManager {
  constructor() {
    this.storageKey = 'expressit_theme';
    this.systemPreferenceKey = 'expressit_system_preference';
    this.bodyClass = 'dark';
    this.toggleSelectors = ['#dark-mode-toggle', '#dark-mode-toggle-mobile'];
    this.isDark = false;
    this.init();
  }

  init() {
    // Check if user has manually set preference
    const savedPreference = localStorage.getItem(this.storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply dark mode based on saved preference or system default
    if (savedPreference !== null) {
      // User has manually set a preference
      this.isDark = savedPreference === 'true';
      localStorage.setItem(this.systemPreferenceKey, 'false');
    } else {
      // Use system preference
      this.isDark = prefersDark;
      localStorage.setItem(this.systemPreferenceKey, 'true');
    }

    // Apply the theme
    this.applyTheme();

    // Set up event listeners
    this.bindEvents();

    // Update toggle icons
    this.updateIcons();
  }

  bindEvents() {
    // Toggle buttons - use event delegation for instant response
    this.toggleSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element) {
          element.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
          });
        }
      });
    });

    // Listen for system preference changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        // Only auto-switch if user hasn't set a manual preference
        if (localStorage.getItem(this.systemPreferenceKey) === 'true') {
          this.isDark = e.matches;
          this.applyTheme();
          this.updateIcons();
        }
      };

      // Use addEventListener if supported, fallback to addListener for older Safari
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
      }
    }
  }

  toggle() {
    this.isDark = !this.isDark;
    localStorage.setItem(this.storageKey, this.isDark);
    localStorage.setItem(this.systemPreferenceKey, 'false');
    this.applyTheme();
    this.updateIcons();
    this.animateToggle();
  }

  applyTheme() {
    const { classList } = document.body;
    
    if (this.isDark) {
      classList.add(this.bodyClass);
    } else {
      classList.remove(this.bodyClass);
    }

    // Update theme-color meta tag for PWA
    this.updateThemeColor();
  }

  updateThemeColor() {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', this.isDark ? '#1a1a2e' : '#e91e63');
    }
  }

  updateIcons() {
    const icons = document.querySelectorAll('#dark-mode-toggle i, #dark-mode-toggle-mobile i');
    icons.forEach(icon => {
      if (this.isDark) {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    });
  }

  animateToggle() {
    const toggles = document.querySelectorAll('.dark-mode-toggle');
    toggles.forEach(toggle => {
      toggle.style.transform = 'scale(0.9)';
      setTimeout(() => {
        toggle.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // Static method to get current state
  static isDarkMode() {
    return document.body.classList.contains('dark');
  }
}

/**
 * Initialize Dark Mode
 */
const initDarkMode = () => {
  window.darkModeManager = new DarkModeManager();
};

  // Mobile Menu Functionality
  const initMobileMenu = () => {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        mobileMenuBtn.classList.toggle("active", isOpen);
        mobileMenuBtn.setAttribute("aria-expanded", isOpen);
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          mobileMenu.classList.remove("open");
          mobileMenuBtn.classList.remove("active");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
        }
      });

      // Close mobile menu when pressing Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
          mobileMenu.classList.remove("open");
          mobileMenuBtn.classList.remove("active");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
        }
      });

      // Close mobile menu when clicking a link inside it
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove("open");
          mobileMenuBtn.classList.remove("active");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
        });
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
   * Services Page Grid
   * Services now display in a vertical stacked grid layout (no carousel)
   * All content is visible by default - no accordion/expand behavior
   */
  const initServicesPageGrid = () => {
    // Services page now uses a simple vertical grid layout
    // No JavaScript needed - all content is visible by default
  };

  /**
   * Mobile Track Shipment Link Manager
   * Updates the Track Shipment link href based on viewport width
   * Desktop (≥769px): www.track-trace.com
   * Mobile (≤768px): touch.track-trace.com
   */
  const initMobileTrackLink = () => {
    const DESKTOP_URL = 'https://www.track-trace.com/';
    const MOBILE_URL = 'https://touch.track-trace.com';
    const BREAKPOINT = '(max-width: 768px)';

    const updateTrackLink = () => {
      const mobileTrackLink = document.getElementById('mobile-track-link');
      if (!mobileTrackLink) return;

      const isMobile = window.matchMedia(BREAKPOINT).matches;
      mobileTrackLink.href = isMobile ? MOBILE_URL : DESKTOP_URL;
    };

    // Initial update on page load
    updateTrackLink();

    // Listen for viewport size changes (e.g., window resize, orientation change)
    window.addEventListener('resize', updateTrackLink, { passive: true });
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure layout completes after orientation change
      setTimeout(updateTrackLink, 100);
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
    initMobileTrackLink();
    initServicesCarousel();
    initServicesPageGrid();
  };

  // Run init function when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Export functions for potential use in other scripts
  window.ExpressIT = {
    darkMode: {
      toggle: () => window.darkModeManager?.toggle(),
      isDark: () => DarkModeManager.isDarkMode(),
      updateThemeColor: () => window.darkModeManager?.updateThemeColor()
    },
    showNotification: showNotification,
    isValidEmail: isValidEmail,
    sanitizeInput: sanitizeInput
  };

  /**
   * Services Carousel Functionality (Home Page)
   * Includes touch swipe support and dynamic scroll calculation
   */
  const initServicesCarousel = () => {
    const carousel = document.getElementById('services-carousel');
    const prevBtn = document.querySelector('.services-carousel-prev');
    const nextBtn = document.querySelector('.services-carousel-next');

    if (!carousel || !prevBtn || !nextBtn) return;

    let scrollAmount = 0;
    let maxScroll = 0;
    let scrollAmountPerClick = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let initialTranslate = 0;

    // Get the first slide width for calculating scroll amount
    const getSlideWidth = () => {
      const firstSlide = carousel.querySelector('.service-slide');
      if (firstSlide) {
        const slideRect = firstSlide.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(carousel);
        const gap = parseFloat(computedStyle.gap) || 24;
        return slideRect.width + gap;
      }
      return 344; // fallback: 320px slide + 24px gap
    };

    // Update max scroll based on container and carousel dimensions
    const updateMaxScroll = () => {
      const container = carousel.parentElement;
      const containerRect = container.getBoundingClientRect();
      const carouselWidth = carousel.scrollWidth;
      
      // Account for horizontal padding (4rem left + 4rem right = 64px on desktop)
      const containerStyle = window.getComputedStyle(container);
      const paddingLeft = parseFloat(containerStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(containerStyle.paddingRight) || 0;
      const horizontalPadding = paddingLeft + paddingRight;

      const visibleWidth = Math.max(0, containerRect.width - horizontalPadding);
      maxScroll = Math.max(0, carouselWidth - visibleWidth);
      
      // Update scroll amount per click based on current slide width
      scrollAmountPerClick = getSlideWidth();
    };

    // Update button states based on scroll position
    const updateButtons = () => {
      const tolerance = 5; // Small tolerance for floating point comparisons
      prevBtn.disabled = scrollAmount <= tolerance;
      nextBtn.disabled = scrollAmount >= maxScroll - tolerance;
    };

    // Smooth scroll to specific position
    const scrollTo = (newScrollAmount) => {
      scrollAmount = Math.max(0, Math.min(newScrollAmount, maxScroll));
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
      updateButtons();
    };

    // Scroll by one card width
    const scrollByCard = (direction) => {
      const scrollDelta = direction === 'next' ? scrollAmountPerClick : -scrollAmountPerClick;
      scrollTo(scrollAmount + scrollDelta);
    };

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollByCard('prev');
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollByCard('next');
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchStartScroll = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartScroll = scrollAmount;
      carousel.classList.add('dragging');
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
      if (!carousel.classList.contains('dragging')) return;
      
      const touchCurrentX = e.touches[0].clientX;
      const diff = touchStartX - touchCurrentX;
      
      // Apply drag with some resistance
      const newScroll = touchStartScroll + diff;
      scrollAmount = Math.max(0, Math.min(newScroll, maxScroll));
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
      carousel.classList.remove('dragging');
      updateButtons();
    }, { passive: true });

    // Mouse drag support for desktop
    let isMouseDown = false;
    let mouseStartX = 0;
    let mouseStartScroll = 0;

    carousel.addEventListener('mousedown', (e) => {
      if (e.target.closest('.services-carousel-btn')) return; // Don't drag when clicking buttons
      isMouseDown = true;
      mouseStartX = e.clientX;
      mouseStartScroll = scrollAmount;
      carousel.classList.add('dragging');
      carousel.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      
      const mouseCurrentX = e.clientX;
      const diff = mouseStartX - mouseCurrentX;
      
      const newScroll = mouseStartScroll + diff;
      scrollAmount = Math.max(0, Math.min(newScroll, maxScroll));
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });

    document.addEventListener('mouseup', () => {
      if (isMouseDown) {
        isMouseDown = false;
        carousel.classList.remove('dragging');
        carousel.style.cursor = 'grab';
        updateButtons();
      }
    });

    // Prevent text selection during drag
    carousel.addEventListener('selectstart', (e) => {
      if (isMouseDown) {
        e.preventDefault();
      }
    });

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        scrollByCard('prev');
      } else if (e.key === 'ArrowRight') {
        scrollByCard('next');
      }
    });

    // Make carousel focusable for keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'Services carousel');

    // Initialize
    updateMaxScroll();
    updateButtons();

    // Handle window resize - recalculate scroll limits
    window.addEventListener('resize', () => {
      updateMaxScroll();
      scrollAmount = Math.min(scrollAmount, maxScroll);
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
      updateButtons();
    }, { passive: true });

    // Recalculate on orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        updateMaxScroll();
        scrollAmount = Math.min(scrollAmount, maxScroll);
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
        updateButtons();
      }, 100);
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
