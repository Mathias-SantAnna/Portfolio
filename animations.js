document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Navbar color change on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
    
    // Typing animation to hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if(heroHeading) {
        const text = heroHeading.innerHTML;
        heroHeading.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroHeading.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Intersection Observer to trigger animations when elements come into view
    const sections = document.querySelectorAll('.section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observer for timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Observe all timeline items
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Staggered animation for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    const skillCardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Set initial style for skill cards
    skillCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        skillCardsObserver.observe(card);
    });
});