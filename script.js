// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.style.animation = 'none';
    setTimeout(() => {
        hamburger.style.animation = '';
    }, 10);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                const offset = 80; // Height of navbar
                const topPosition = element.offsetTop - offset;
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// CV DOWNLOAD FUNCTIONALITY
// ============================================
const cvDownloadBtn = document.querySelector('.cv-download');

cvDownloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    downloadCV();
});

function downloadCV() {
   
    
    const cvFileName = 'YourName_CV.pdf';
    

    const cvContent = `
    YOUR NAME
    Frontend Developer | UI/UX Enthusiast
    
    CONTACT INFORMATION
    Email: your.email@example.com
    Location: Karachi, Pakistan
    GitHub: https://github.com/yourname
    LinkedIn: https://linkedin.com/in/yourname
    Portfolio: https://yourportfolio.com
    
    PROFESSIONAL SUMMARY
    Passionate frontend developer with expertise in HTML, CSS, and JavaScript.
    Currently pursuing Advanced Software Engineering Diploma.
    Dedicated to creating beautiful, responsive web experiences.
    
    TECHNICAL SKILLS
    Frontend: HTML5, CSS3, JavaScript, Bootstrap, Responsive Design
    Tools: Git/GitHub, VS Code, Figma, Web Hosting
    Methodologies: Mobile-First Design, User-Centered Design
    
    EXPERIENCE
    Frontend Developer (2024 - Present)
    - Developing responsive web applications
    - Creating user-friendly interfaces
    - Collaborating with teams
    
    Web Development Freelancer (2023 - Present)
    - Building custom websites for clients
    - Focusing on user experience and responsive design
    - Implementing best practices and modern techniques
    
    EDUCATION
    Advanced Software Engineering Diploma (Currently Pursuing)
    - Building foundations in software engineering principles
    - Learning web development best practices
    
    PROJECTS
    [List your projects here]
    - Project 1: Description
    - Project 2: Description
    - Project 3: Description
    
    CERTIFICATIONS & ACHIEVEMENTS
    - [Add your certifications]
    - [Add achievements]
    `;
    
  
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = cvFileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Show feedback
    showNotification('CV downloading...');
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #00d4ff, #ff00ff);
        color: #0a0e27;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 2000;
        animation: slideInRight 0.4s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// ============================================
// FORM SUBMISSION
// ============================================
/* const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            subject: contactForm.querySelectorAll('input[type="text"]')[1].value,
            message: contactForm.querySelector('textarea').value
        };
        
        // Validate
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill all fields!');
            return;
        }
        
        // Here you would normally send the form data to a server
        // For now, we'll just show a success message
        console.log('Form Data:', data);
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this to a backend
        // Example using Formspree or similar service:
        // fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
    });
}*/
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const submitBtn = contactForm.querySelector("button");

    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {

        const response = await fetch(contactForm.action, {

            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }

        });

        if (response.ok) {

            showNotification("✅ Message sent successfully!");

            contactForm.reset();

        } else {

            showNotification("❌ Something went wrong.");

        }

    } catch (error) {

        showNotification("❌ Network error.");

    }

    submitBtn.innerHTML = "Send Message";
    submitBtn.disabled = false;

});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = getAnimationForElement(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function getAnimationForElement(element) {
    if (element.classList.contains('project-card')) {
        return 'scaleIn 0.6s ease forwards';
    } else if (element.classList.contains('stat-card')) {
        return 'slideUp 0.6s ease forwards';
    } else if (element.classList.contains('timeline-content')) {
        return 'fadeInUp 0.6s ease forwards';
    }
    return 'fadeInUp 0.6s ease forwards';
}

// Observe elements for animation
document.querySelectorAll('.project-card, .stat-card, .timeline-content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link:not(.cv-download)');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = 'var(--primary-color)';
        } else {
            item.style.color = 'var(--text-light)';
        }
    });
});

// ============================================
// DYNAMIC STAR BACKGROUND
// ============================================
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    // Stars are created via CSS, but we could add more interactivity here
    // This is already handled by CSS animations
}

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// TYPING ANIMATION (Optional Enhancement)
// ============================================
function typeWriter(element, text, speed = 100) {
    let index = 0;
    element.innerHTML = '';
    
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// MOUSE FOLLOW EFFECT FOR FLOATING CARD
// ============================================
const floatingCard = document.querySelector('.floating-card');

if (floatingCard) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - floatingCard.offsetLeft) / 20;
        const y = (e.clientY - floatingCard.offsetTop) / 20;
        
        floatingCard.style.transform = `translateY(calc(-30px + ${y}px)) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        floatingCard.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add animations to hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'slideInLeft 0.8s ease';
    }
});

// ============================================
// RESPONSIVE NAV HAMBURGER ANIMATION
// ============================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
});

// ============================================
// MOBILE DETECTION
// ============================================
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}



console.log('Portfolio loaded successfully!');
