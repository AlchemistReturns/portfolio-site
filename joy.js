document.addEventListener('DOMContentLoaded', () => {

    // 1. Elastic Profile Image Bounce
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('click', () => {
            anime({
                targets: '.profile-img',
                scale: [
                    { value: 0.9, duration: 100, easing: 'easeOutQuad' },
                    { value: 1.1, duration: 800, easing: 'easeOutElastic(1, .5)' }
                ],
            });
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.4 }, // roughly center-top
                colors: ['#6366f1', '#8b5cf6', '#0ea5e9']
            });
        });
    }

    // 2. Wiggle Skills on Hover
    const skillTags = document.querySelectorAll('.tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            anime({
                targets: tag,
                rotate: function () { return anime.random(-10, 10); },
                scale: 1.1,
                duration: 400,
                easing: 'easeOutElastic(1, .6)'
            });
        });

        tag.addEventListener('mouseleave', () => {
            anime({
                targets: tag,
                rotate: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // 3. Button "Boing" Click Effect
    const buttons = document.querySelectorAll('.btn, .btn.btn-outline, .btn-sm');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            anime({
                targets: btn,
                scale: 0.9,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });

        btn.addEventListener('mouseup', () => {
            anime({
                targets: btn,
                scale: 1,
                duration: 600,
                easing: 'easeOutElastic(1, .5)'
            });
        });

        // Also trigger on simple click just in case of quick taps
        btn.addEventListener('click', () => {
            anime({
                targets: btn,
                scale: [0.9, 1],
                duration: 600,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });

    // 4. Achievement Confetti
    // Targeting "1st Runner Up" and "Finalist" cards specifically if possible, 
    // or broadly applying to project-cards in the achievements section.
    const achievementCards = document.querySelectorAll('#achievements .project-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Check if we've already celebrated recently to avoid spam
            if (card.dataset.celebrated === "true") return;

            card.dataset.celebrated = "true";

            // Re-enable after a delay
            setTimeout(() => { card.dataset.celebrated = "false" }, 3000);

            // Get card position for confetti origin
            const rect = card.getBoundingClientRect();
            // Calculate relative center x/y (0 to 1)
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 50,
                spread: 70,
                origin: { x: x, y: y },
                disableForReducedMotion: true,
                zIndex: 9999,
                colors: ['#FFD700', '#6366f1', '#ffffff'] // Gold, Indigo, White
            });
        });
    });

    // 5. Staggered Skill Grid Reveal (using Intersection Observer to trigger anime)
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.skill-card',
                        translateY: [50, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(150), // increase delay by 150ms for each element
                        easing: 'easeOutElastic(1, .6)',
                        duration: 1200
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(skillsGrid);
    }

    // 6. Magnetic Buttons (refined)
    // Using anime.js to pull the button towards the mouse slightly
    const magneticBtns = document.querySelectorAll('.btn, .btn-theme');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            anime({
                targets: btn,
                translateX: x * 0.2, // strength
                translateY: y * 0.2,
                duration: 50, // snappy
                easing: 'linear'
            });
        });

        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                translateX: 0,
                translateY: 0,
                duration: 600,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });
});
