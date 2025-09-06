$(document).ready(function () {
    'use strict';

    // Navbar scroll effect
    function handleNavbarScroll() {
        const navbar = $('.navbar');
        const scrollTop = $(window).scrollTop();

        if (scrollTop > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    }

    // Handle navbar scroll on page load and scroll
    handleNavbarScroll();
    $(window).scroll(handleNavbarScroll);

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        const target = $(this.getAttribute('href'));
        if (target.length) {
            const offsetTop = target.offset().top - 80; // Account for fixed navbar

            $('html, body').animate({
                scrollTop: offsetTop
            }, 800, 'easeInOutCubic');
        }
    });

    // Add easing function
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    // Animate statistics on scroll
    function animateStats() {
        const statsSection = $('.hero-stats');
        if (!statsSection.length) return;

        const sectionTop = statsSection.offset().top;
        const sectionHeight = statsSection.outerHeight();
        const windowTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        // Check if section is in viewport
        if (windowTop + windowHeight > sectionTop && windowTop < sectionTop + sectionHeight) {
            $('.stat-number').each(function () {
                const $this = $(this);
                if (!$this.hasClass('animated')) {
                    $this.addClass('animated');

                    const targetValue = parseInt($this.text().replace(/[^0-9]/g, ''));
                    const suffix = $this.text().replace(/[0-9]/g, '');
                    let currentValue = 0;

                    const increment = targetValue / 50;
                    const timer = setInterval(function () {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            currentValue = targetValue;
                            clearInterval(timer);
                        }
                        $this.text(Math.floor(currentValue) + suffix);
                    }, 40);
                }
            });
        }
    }

    // Trigger stats animation on scroll
    $(window).scroll(animateStats);

    // Fade in elements on scroll
    function fadeInOnScroll() {
        $('.service-card, .experience-card').each(function () {
            const elementTop = $(this).offset().top;
            const elementHeight = $(this).outerHeight();
            const windowTop = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (windowTop + windowHeight > elementTop + 100) {
                $(this).addClass('fade-in-up');
            }
        });
    }

    // Trigger fade in on scroll
    $(window).scroll(fadeInOnScroll);
    fadeInOnScroll(); // Run once on load

    // Newsletter form submission
    $('.newsletter-form').on('submit', function (e) {
        e.preventDefault();

        const email = $(this).find('input[type="email"]').val();
        const submitBtn = $(this).find('button[type="submit"]');

        if (email) {
            // Add loading state
            submitBtn.addClass('loading').text('Subscribing...');

            // Simulate API call
            setTimeout(function () {
                submitBtn.removeClass('loading').text('Subscribed!').addClass('btn-success');

                // Reset after 3 seconds
                setTimeout(function () {
                    submitBtn.removeClass('btn-success').addClass('btn-light').text('Subscribe');
                    $('.newsletter-form')[0].reset();
                }, 3000);
            }, 1500);
        }
    });

    // Contact form submission
    $('.contact-form form').on('submit', function (e) {
        e.preventDefault();

        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');

        // Basic validation
        let isValid = true;
        form.find('input[required], select[required], textarea[required]').each(function () {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        // Email validation
        const emailField = form.find('input[type="email"]');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.val() && !emailPattern.test(emailField.val())) {
            isValid = false;
            emailField.addClass('is-invalid');
        }

        if (isValid) {
            // Add loading state
            submitBtn.addClass('loading').text('Sending Message...');

            // Simulate API call
            setTimeout(function () {
                submitBtn.removeClass('loading').text('Message Sent!').addClass('btn-success');

                // Show success message
                const successAlert = $('<div class="alert alert-success mt-3" role="alert">Thank you for your message! We\'ll get back to you soon.</div>');
                form.prepend(successAlert);

                // Reset form and button after 3 seconds
                setTimeout(function () {
                    submitBtn.removeClass('btn-success').addClass('btn-primary').text('Send Message');
                    form[0].reset();
                    successAlert.remove();
                }, 3000);
            }, 1500);
        } else {
            // Show error message
            const errorAlert = $('<div class="alert alert-danger mt-3" role="alert">Please fill in all required fields correctly.</div>');
            form.prepend(errorAlert);

            setTimeout(function () {
                errorAlert.remove();
            }, 5000);
        }
    });

    // Remove validation classes on input
    $('input, select, textarea').on('input change', function () {
        $(this).removeClass('is-invalid');
    });

    // Mobile menu handling
    $('.navbar-toggler').on('click', function () {
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.navbar-nav .nav-link').on('click', function () {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
            $('.navbar-toggler').removeClass('active');
        }
    });

    // Parallax effect for hero section (subtle)
    $(window).scroll(function () {
        const scrolled = $(window).scrollTop();
        const parallax = $('.hero-section');
        const speed = 0.5;

        parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    });

    // Tooltip initialization (if Bootstrap tooltips are needed)
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Service card hover effects
    $('.service-card').on('mouseenter', function () {
        $(this).find('.service-icon').css('transform', 'scale(1.1)');
    }).on('mouseleave', function () {
        $(this).find('.service-icon').css('transform', 'scale(1)');
    });

    // Add CSS for service icon transition
    $('.service-icon').css('transition', 'transform 0.3s ease');

    // Loading screen (optional)
    $(window).on('load', function () {
        $('body').addClass('loaded');

        // Hide loading screen if exists
        $('.loading-screen').fadeOut(500);
    });

    // Accessibility improvements

    // Skip to main content functionality
    $('.skip-to-main').on('click', function (e) {
        e.preventDefault();
        $('#main-content').focus();
    });

    // Keyboard navigation for custom elements
    $('.service-card, .experience-card').attr('tabindex', '0');

    $('.service-card, .experience-card').on('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).trigger('click');
        }
    });

    // ARIA labels for better accessibility
    $('.social-links a').each(function () {
        const iconClass = $(this).find('i').attr('class');
        let ariaLabel = 'Social media link';

        if (iconClass.includes('linkedin')) {
            ariaLabel = 'LinkedIn profile';
        } else if (iconClass.includes('instagram')) {
            ariaLabel = 'Instagram profile';
        } else if (iconClass.includes('envelope')) {
            ariaLabel = 'Email contact';
        }

        $(this).attr('aria-label', ariaLabel);
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Apply debouncing to scroll events
    const debouncedScroll = debounce(function () {
        handleNavbarScroll();
        animateStats();
        fadeInOnScroll();
    }, 10);

    $(window).off('scroll').on('scroll', debouncedScroll);

    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // Error handling for missing elements
    try {
        // Any additional initialization code
        console.log('Dr. Singh\'s website initialized successfully');
    } catch (error) {
        console.warn('Some features may not be available:', error);
    }
});

// Additional utility functions

// Format phone numbers
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Smooth reveal animation function
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Add event listener if reveal elements exist
if (document.querySelectorAll('.reveal').length > 0) {
    window.addEventListener('scroll', revealOnScroll);
}