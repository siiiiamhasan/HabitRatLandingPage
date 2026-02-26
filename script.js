// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe pricing cards
document.querySelectorAll('.pricing-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Interactive habit check animation
document.querySelectorAll('.habit-check:not(.checked)').forEach(check => {
    check.addEventListener('click', function () {
        this.classList.add('checked');
        this.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(88, 166, 255, 0.3);
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        const parent = this.parentElement;
        parent.style.position = 'relative';
        parent.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero::before');
    if (heroBackground) {
        document.querySelector('.hero').style.setProperty('--scroll', scrolled * 0.5 + 'px');
    }
});

// CTA button interactions with enhanced effects
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function (e) {
        const x = e.offsetX;
        const y = e.offsetY;

        this.style.setProperty('--x', x + 'px');
        this.style.setProperty('--y', y + 'px');
    });
});

// Stats counter animation
const animateCounter = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value >= 1000 ? (value / 1000).toFixed(1) + 'K+' : value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statValue = entry.target.querySelector('.stat-value');
            const text = statValue.textContent;

            if (text.includes('K')) {
                const value = parseFloat(text) * 1000;
                animateCounter(statValue, 0, value, 2000);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Typing effect for hero title (optional - can be enabled)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
}

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="3" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round"/>
            <line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;

    if (window.innerWidth <= 768) {
        document.querySelector('.nav-content').insertBefore(menuToggle, navLinks);

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Add shimmer effect to gradient text
const gradientTexts = document.querySelectorAll('.gradient-text');
gradientTexts.forEach(text => {
    text.addEventListener('mouseenter', function () {
        this.style.animation = 'shimmer 1.5s ease-in-out';
    });

    text.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});

// Add shimmer animation
const shimmerStyle = document.createElement('style');
shimmerStyle.textContent = `
    @keyframes shimmer {
        0% {
            background-position: -200% center;
        }
        100% {
            background-position: 200% center;
        }
    }
    
    .gradient-text {
        background-size: 200% auto;
    }
`;
document.head.appendChild(shimmerStyle);

// Preload critical resources
const preloadImages = () => {
    const images = ['hero-visual', 'features', 'pricing'];
    images.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img;
    });
};

// Modern Carousel with Swipe Support
class Carousel {
    constructor() {
        this.currentIndex = 2; // Start at index 2 (3rd position - Home.jpg)
        this.track = document.querySelector('.carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevButton = document.querySelector('.carousel-button-prev');
        this.nextButton = document.querySelector('.carousel-button-next');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.totalSlides = this.slides.length;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        this.autoPlayInterval = null;

        if (this.track) {
            this.init();
        }
    }

    init() {
        // Button navigation
        this.prevButton?.addEventListener('click', () => this.prev());
        this.nextButton?.addEventListener('click', () => this.next());

        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Touch/Mouse events for swipe
        this.track.addEventListener('mousedown', (e) => this.dragStart(e));
        this.track.addEventListener('touchstart', (e) => this.dragStart(e));
        this.track.addEventListener('mousemove', (e) => this.drag(e));
        this.track.addEventListener('touchmove', (e) => this.drag(e));
        this.track.addEventListener('mouseup', (e) => this.dragEnd(e));
        this.track.addEventListener('touchend', (e) => this.dragEnd(e));
        this.track.addEventListener('mouseleave', () => this.dragEnd());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Initial update
        this.updateCarousel();
    }

    dragStart(e) {
        this.isDragging = true;
        this.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        this.track.style.cursor = 'grabbing';
    }

    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        this.currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const diff = this.currentX - this.startX;

        // Add visual feedback during drag
        const offset = -this.currentIndex * 100;
        const dragPercentage = (diff / this.track.offsetWidth) * 100;
        this.track.style.transform = `translateX(${offset + dragPercentage}%)`;
    }

    dragEnd() {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.track.style.cursor = 'grab';

        const diff = this.currentX - this.startX;
        const threshold = 50; // Minimum swipe distance

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.prev();
            } else {
                this.next();
            }
        }
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        // Calculate slide offset for horizontal sliding
        // Center the active card by calculating offset
        const slideWidth = this.slides[0]?.offsetWidth || 200;
        const gap = 24; // 1.5rem gap
        const containerCenter = this.track.parentElement.offsetWidth / 2;
        const slideCenter = slideWidth / 2;

        // Calculate how much to shift the track to center the active slide
        const offset = containerCenter - slideCenter - (this.currentIndex * (slideWidth + gap));

        // Apply horizontal slide animation
        this.track.style.transform = `translateX(${offset}px)`;

        // Update slide classes based on distance from active
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'adjacent', 'far');

            const distance = Math.abs(index - this.currentIndex);

            if (distance === 0) {
                slide.classList.add('active');
            } else if (distance === 1) {
                slide.classList.add('adjacent');
            } else {
                slide.classList.add('far');
            }
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// Fullscreen Modal Handler
class FullscreenModal {
    constructor() {
        this.modal = document.getElementById('fullscreenModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDesc = document.getElementById('modalDesc');
        this.closeBtn = document.getElementById('closeModal');

        if (this.modal) {
            this.init();
        }
    }

    init() {
        // Add click event to all screenshot images
        const images = document.querySelectorAll('.screenshot-image');
        images.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent carousel drag
                this.openModal(img);
            });
        });

        // Close button
        this.closeBtn?.addEventListener('click', () => this.closeModal());

        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(img) {
        // Get image data
        const src = img.src;
        const alt = img.alt;

        // Set modal content
        this.modalImage.src = src;
        this.modalImage.alt = alt;

        // Hide info section if no text available
        const infoSection = document.querySelector('.fullscreen-modal-info');
        if (infoSection) {
            infoSection.style.display = 'none';
        }

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    new Carousel(); // Initialize carousel
    new FullscreenModal(); // Initialize fullscreen modal
    console.log('HabitRat landing page loaded successfully! 🎉');
});
