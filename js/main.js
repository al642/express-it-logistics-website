/**
 * Express IT Logistics - Main JavaScript
 * Shared functionality for all pages
 */

(function () {
  "use strict";

  console.log("Express IT Logistics website loaded successfully");

  // Set dynamic copyright year
  function setCopyrightYear() {
    const yearElements = document.querySelectorAll(".copyright-year");
    const currentYear = new Date().getFullYear();
    yearElements.forEach(function (el) {
      el.textContent = currentYear;
    });
  }

  // Initialize Dark Mode
  function initDarkMode() {
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
    darkModeToggles.forEach(function (toggle) {
      if (toggle) {
        toggle.addEventListener("click", toggleDarkMode);
      }
    });

    // Listen for system preference changes
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
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
  }

  // Toggle Dark Mode
  function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", isDark);
    updateDarkModeIcons();
  }

  // Update Dark Mode Icons
  function updateDarkModeIcons() {
    const isDark = document.documentElement.classList.contains("dark");
    const icons = document.querySelectorAll("#dark-mode-toggle i, #dark-mode-toggle-mobile i");

    icons.forEach(function (icon) {
      if (isDark) {
        icon.className = "fas fa-sun";
      } else {
        icon.className = "fas fa-moon";
      }
    });
  }

  // Mobile Menu Functionality
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", function () {
        mobileMenu.classList.toggle("open");
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", function (e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          mobileMenu.classList.remove("open");
        }
      });

      // Close mobile menu when pressing Escape key
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
          mobileMenu.classList.remove("open");
        }
      });
    }
  }

  // Navbar Scroll Effect
  function initNavbarScroll() {
    const navbar = document.getElementById("navbar");

    if (navbar) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });
    }
  }

  // Smooth Scroll for Anchor Links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
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
  }

  // Form Validation for Contact Form
  function initFormValidation() {
    const forms = document.querySelectorAll("form");

    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        // Only handle non-mailto forms with JavaScript
        if (form.getAttribute("action") && form.getAttribute("action").indexOf("mailto:") === 0) {
          // For mailto forms, just show confirmation and let browser handle it
          e.preventDefault();
          
          // Basic validation
          const name = form.querySelector("#name");
          const email = form.querySelector("#email");
          const message = form.querySelector("#message");

          let isValid = true;
          let errors = [];

          if (!name || !name.value.trim()) {
            errors.push("Please enter your name");
            isValid = false;
          }

          if (!email || !email.value.trim()) {
            errors.push("Please enter your email");
            isValid = false;
          } else if (!isValidEmail(email.value)) {
            errors.push("Please enter a valid email address");
            isValid = false;
          }

          if (!message || !message.value.trim()) {
            errors.push("Please enter your message");
            isValid = false;
          }

          if (isValid) {
            // Show success message
            showNotification("Thank you for your inquiry. Our team will get back to you shortly.", "success");
            
            // Add a small delay then submit the form
            setTimeout(function() {
              form.submit();
            }, 1500);
          } else {
            // Show errors
            showNotification(errors.join(". "), "error");
          }
          
          return;
        }

        // Original form handling for other forms
        e.preventDefault();

        // Basic validation
        const name = form.querySelector("#name");
        const email = form.querySelector("#email");
        const message = form.querySelector("#message");

        let isValid = true;
        let errors = [];

        if (!name || !name.value.trim()) {
          errors.push("Please enter your name");
          isValid = false;
        }

        if (!email || !email.value.trim()) {
          errors.push("Please enter your email");
          isValid = false;
        } else if (!isValidEmail(email.value)) {
          errors.push("Please enter a valid email address");
          isValid = false;
        }

        if (!message || !message.value.trim()) {
          errors.push("Please enter your message");
          isValid = false;
        }

        if (isValid) {
          // Form is valid - show success message
          showNotification("Thank you for your inquiry. Our team will get back to you shortly.", "success");
          form.reset();
        } else {
          // Show errors
          showNotification(errors.join(". "), "error");
        }
      });
    });
  }

  // Validate Email Format
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show Notification
  function showNotification(message, type) {
    // Remove existing notification
    var existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    var notification = document.createElement("div");
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
    var closeBtn = document.createElement("button");
    closeBtn.innerHTML = "×";
    closeBtn.style.cssText = "background: none; border: none; color: inherit; font-size: 1.5rem; cursor: pointer; position: absolute; top: 0.25rem; right: 0.5rem; padding: 0; line-height: 1;";
    closeBtn.setAttribute("aria-label", "Dismiss notification");
    closeBtn.addEventListener("click", function () {
      notification.remove();
    });
    notification.appendChild(closeBtn);

    document.body.appendChild(notification);

    // Auto-hide after 5 seconds
    setTimeout(function () {
      if (notification.parentNode) {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(100%)";
        setTimeout(function () {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }

  // Initialize when DOM is ready
  function init() {
    setCopyrightYear();
    initDarkMode();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initFormValidation();
  }

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
    isValidEmail: isValidEmail
  };

  // Initialize Service Worker for PWA support
  initServiceWorker();

})();

/**
 * Service Worker Registration
 * Provides offline capability and improved performance
 */
function initServiceWorker() {
  // Check if service workers are supported
  if ('serviceWorker' in navigator) {
    // Wait for the page to load
    window.addEventListener('load', function() {
      // Register the service worker
      navigator.serviceWorker.register('./sw.js')
        .then(function(registration) {
          console.log('[SW] Service Worker registered successfully');
          console.log('[SW] Scope:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', function() {
            const installingWorker = registration.installing;
            console.log('[SW] New service worker found');
            
            installingWorker.addEventListener('statechange', function() {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New update available
                  console.log('[SW] New content available, please refresh');
                  showNotification('New version available! Refresh to update.', 'info');
                } else {
                  // Content cached for offline use
                  console.log('[SW] Content cached for offline use');
                }
              }
            });
          });
        })
        .catch(function(error) {
          console.error('[SW] Service Worker registration failed:', error);
        });
      
      // Check for updates periodically
      setInterval(function() {
        registration.update();
      }, 60000); // Check every minute
      
      // Handle messages from service worker
      navigator.serviceWorker.addEventListener('message', function(event) {
        if (event.data && event.data.version) {
          console.log('[SW] Current cache version:', event.data.version);
        }
      });
    });
  } else {
    console.log('[SW] Service workers not supported in this browser');
  }
}

