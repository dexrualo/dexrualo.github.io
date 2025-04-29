/**
 * Main JavaScript file for Dexter Rualo's portfolio website
 * Author: Dexter Rualo
 * Version: 1.0
 * Description: Contains all JavaScript functionality for the portfolio website
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initSectionHeight();
  initSmoothScrolling();
  initLazyLoading();
  initAnimations();
  
  // Add event listeners
  window.addEventListener('resize', initSectionHeight);
});

/**
 * Sets the height of sections based on screen size
 * Replaces the jQuery function that was previously used
 */
function initSectionHeight() {
  try {
    const sections = document.querySelectorAll('section');
    const availableHeight = window.innerHeight - 100; // Adjust for navbar height
    
    sections.forEach(section => {
      section.style.minHeight = `${availableHeight}px`;
    });
  } catch (error) {
    console.error('Error setting section height:', error);
  }
}

/**
 * Implements smooth scrolling for navigation links
 */
function initSmoothScrolling() {
  try {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 50, // Adjust for navbar height
            behavior: 'smooth'
          });
          
          // Update active state in navigation
          document.querySelectorAll('.navbar-nav li').forEach(item => {
            item.classList.remove('active');
          });
          this.closest('li').classList.add('active');
        }
      });
    });
  } catch (error) {
    console.error('Error initializing smooth scrolling:', error);
  }
}

/**
 * Implements lazy loading for images
 */
function initLazyLoading() {
  try {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      });
    }
  } catch (error) {
    console.error('Error initializing lazy loading:', error);
  }
}

/**
 * Adds fade-in animations to elements
 */
function initAnimations() {
  try {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            animationObserver.unobserve(entry.target);
          }
        });
      });
      
      animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        animationObserver.observe(element);
      });
    }
  } catch (error) {
    console.error('Error initializing animations:', error);
  }
}

/**
 * Updates active navigation based on scroll position
 */
window.addEventListener('scroll', () => {
  try {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Find the current section
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Get the ID of the current section
        const id = section.getAttribute('id');
        
        // Update active state in navigation
        document.querySelectorAll('.navbar-nav li').forEach(item => {
          item.classList.remove('active');
        });
        
        document.querySelector(`.navbar-nav li a[href="#${id}"]`).closest('li').classList.add('active');
      }
    });
  } catch (error) {
    console.error('Error updating navigation:', error);
  }
});