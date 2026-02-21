// ============================================
// MAIN.JS - COMPLETE WITH DARK MODE TOGGLE
// ============================================

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const typedTextElement = document.getElementById('typed-text');
const html = document.documentElement;
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
        typedTextElement.textContent = currentSkill.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typedTextElement.textContent = currentSkill.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    if (!isDeleting && currentCharIndex === currentSkill.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentSkillIndex = (currentSkillIndex + 1) % skills.length;
        setTimeout(typeEffect, 500);
    } else {
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
}

// Start typing effect
if (typedTextElement) {
    setTimeout(typeEffect, 1000);
}

// ============================================
// THEME TOGGLE FUNCTION
// ============================================
function setTheme(theme) {
    if (theme === 'dark') {
        // Set on html and body
        html.classList.add('dark-mode');
        html.classList.remove('light-mode');
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        html.setAttribute('data-theme', 'dark');
        
        // Update icons
        if (sunIcon && moonIcon) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    } else {
        // Set on html and body
        html.classList.add('light-mode');
        html.classList.remove('dark-mode');
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        html.setAttribute('data-theme', 'light');
        
        // Update icons
        if (sunIcon && moonIcon) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
}

// Initialize theme from localStorage (backup for icons)
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Theme toggle button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode') || html.classList.contains('dark-mode');
        setTheme(isDark ? 'light' : 'dark');
    });
}

// ============================================
// HAMBURGER MENU
// ============================================
if (menuToggle && nav) {
    // Toggle menu
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
// SMOOTH SCROLLING
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
// MOBILE MENU AUTO-CLOSE ON RESIZE
// ============================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    }
});

console.log('✅ Portfolio JS loaded');
