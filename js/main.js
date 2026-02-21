// main.js - Complete Rewritten Version
// Handles: Typing effect, Theme toggle UI, Hamburger menu

// ============================================
// DOM ELEMENTS
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const typedTextElement = document.getElementById('typed-text');
const body = document.body;

// ============================================
// TYPING EFFECT FOR TERMINAL
// ============================================
const skills = [
    "Python (beginner)",
    "C Programming (beginner)",
    "Linux System Configuration",
    "Circuit Analysis",
    "Laplace Transform",
    "Semiconductor Devices",
    "Ohm's Law & KVL",
    "Mathematical Modeling"
];

let currentSkillIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typedTextElement) return;
    
    const currentSkill = skills[currentSkillIndex];
    
    if (isDeleting) {
        // Deleting characters
        typedTextElement.textContent = currentSkill.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        // Typing characters
        typedTextElement.textContent = currentSkill.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    // Handle state transitions
    if (!isDeleting && currentCharIndex === currentSkill.length) {
        // Finished typing - pause then delete
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause at end
    } else if (isDeleting && currentCharIndex === 0) {
        // Finished deleting - move to next skill
        isDeleting = false;
        currentSkillIndex = (currentSkillIndex + 1) % skills.length;
        setTimeout(typeEffect, 500); // Short pause before next
    } else {
        // Continue typing/deleting
        const speed = isDeleting ? 50 : 100; // Delete faster than type
        setTimeout(typeEffect, speed);
    }
}

// Start typing effect if element exists
if (typedTextElement) {
    // Small delay before starting
    setTimeout(typeEffect, 1000);
}

// ============================================
// THEME TOGGLE UI (NOT the actual theme change)
// ============================================
function updateThemeIcons() {
    // Update sun/moon icons based on current theme
    const isDark = body.classList.contains('dark-mode');
    
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
}

// Set initial icon state
updateThemeIcons();

// Theme toggle button click handler
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Toggle theme class
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
        }
        
        // Update icons
        updateThemeIcons();
        
        // Save preference to localStorage
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
}

// ============================================
// HAMBURGER MENU
// ============================================
if (menuToggle && nav) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').replace('/', '');
        if (linkPath === currentPath || 
            (currentPath === '' && linkPath === 'index.html') ||
            (currentPath === 'index.html' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Set active nav on page load
setActiveNavLink();

// ============================================
// MOBILE MENU AUTO-CLOSE ON RESIZE
// ============================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    }
});

// ============================================
// CONSOLE LOG (Optional - remove in production)
// ============================================
console.log('✅ Portfolio JS loaded successfully');
