// ===== GLOBAL VARIABLES =====
let particles = [];
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorOutlineX = 0;
let cursorOutlineY = 0;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initPreloader();
    initCursor();
    initParticles();
    initNavbar();
    initScrollReveal();
    initTypingEffect();
    initSkillBars();
    initCounters();
    initForm();
    initMagneticEffects();
    initCurrentYear();
    
    // Start animation loop
    requestAnimationFrame(updateCursor);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide preloader after a short delay
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Enable cursor after preloader is hidden
                document.body.classList.add('cursor-active');
            }, 500);
        }
        
        // Update progress bar width
        if (loadingProgress) {
            loadingProgress.style.width = `${progress}%`;
        }
    }, 100);
}

// ===== CUSTOM CURSOR =====
function initCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        if (cursorDot) cursorDot.style.opacity = '0';
        if (cursorOutline) cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorOutline) cursorOutline.style.opacity = '1';
    });
}

function updateCursor() {
    // Smooth movement for cursor dot
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    // Smooth movement for cursor outline
    cursorOutlineX += (mouseX - cursorOutlineX) * 0.08;
    cursorOutlineY += (mouseY - cursorOutlineY) * 0.08;
    
    // Update cursor positions
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (cursorDot) {
        cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    }
    
    if (cursorOutline) {
        cursorOutline.style.transform = `translate(${cursorOutlineX}px, ${cursorOutlineY}px)`;
    }
    
    requestAnimationFrame(updateCursor);
}

// ===== PARTICLE BACKGROUND =====
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    // Create particles based on screen size
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
    
    // Animate particles
    animateParticles();
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size and position
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}vw`;
    particle.style.top = `${posY}vh`;
    
    // Random animation duration and delay
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
    
    container.appendChild(particle);
    particles.push({
        element: particle,
        x: posX,
        y: posY,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        size: size
    });
}

function animateParticles() {
    particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > 100) particle.x = 0;
        if (particle.x < 0) particle.x = 100;
        if (particle.y > 100) particle.y = 0;
        if (particle.y < 0) particle.y = 100;
        
        // Update DOM
        particle.element.style.left = `${particle.x}vw`;
        particle.element.style.top = `${particle.y}vh`;
    });
    
    requestAnimationFrame(animateParticles);
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    // Check on load and scroll
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    
    // Initial check
    revealOnScroll();
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const name = "Md. Kaif Rahman Dhrubo";
    let i = 0;
    
    function typeWriter() {
        if (i < name.length) {
            typingText.innerHTML += name.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===== SKILL BARS =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight - 100) {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
            }
        });
    };
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);
    
    // Initial check
    animateSkillBars();
}

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 20);
            } else {
                counter.innerText = target + '+';
            }
        });
    };
    
    // Start counters when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each counter container
    const counterContainers = document.querySelectorAll('.stat-card, .skill-category');
    counterContainers.forEach(container => {
        observer.observe(container);
    });
}

// ===== CONTACT FORM =====
function initForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.querySelector('.btn-text').innerText;
            
            submitBtn.querySelector('.btn-text').innerText = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').innerText = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
}

// ===== MAGNETIC EFFECTS =====
function initMagneticEffects() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Calculate distance from center
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const translateX = x * 0.3;
                const translateY = y * 0.3;
                
                this.style.transform = `translate(${translateX}px, ${translateY}px)`;
                
                // Enlarge cursor outline when near magnetic element
                const cursorOutline = document.getElementById('cursor-outline');
                if (cursorOutline) {
                    cursorOutline.style.width = '60px';
                    cursorOutline.style.height = '60px';
                    cursorOutline.style.borderColor = 'rgba(108, 99, 255, 0.5)';
                }
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            
            // Reset cursor outline
            const cursorOutline = document.getElementById('cursor-outline');
            if (cursorOutline) {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = 'rgba(108, 99, 255, 0.3)';
            }
        });
    });
}

// ===== CURRENT YEAR IN FOOTER =====
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== WINDOW RESIZE HANDLER =====
function handleResize() {
    // Reinitialize particles on resize
    const container = document.getElementById('particles-container');
    if (container) {
        // Clear existing particles
        particles = [];
        container.innerHTML = '';
        
        // Create new particles
        initParticles();
    }
}

// ===== ADDITIONAL EFFECTS =====
// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-blob');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add click sound effect (optional)
document.addEventListener('click', function(e) {
    // Only play sound for specific elements
    if (e.target.matches('.btn, .tool-card, .contact-item, .social-link')) {
        // Create a subtle click sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // Audio context not supported, fail silently
        }
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            // Perform scroll-related updates here
        }, 100);
    }
});