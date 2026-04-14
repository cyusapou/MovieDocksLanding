document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        cursor.style.transform = `translate(${x}px, ${y}px)`;
        follower.style.transform = `translate(${x}px, ${y}px)`;
        
        // Bento card glow effect
        document.querySelectorAll('.bento-item').forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = ((x - rect.left) / rect.width) * 100;
            const cardY = ((y - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${cardX}%`);
            card.style.setProperty('--mouse-y', `${cardY}%`);
        });
    });

    // Parallax Effect for Hero
    const parallaxBg = document.getElementById('parallax-bg');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (parallaxBg) {
            parallaxBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
        }
    });

    // Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('reveal-text')) {
                    // Trigger child spans if any
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-text').forEach(el => {
        // For reveal-text, wrap characters or words if needed, but here we just use it for the h1
        if (el.classList.contains('reveal-text')) {
            const content = el.innerHTML;
            el.innerHTML = `<span>${content}</span>`;
        }
        observer.observe(el);
    });

    // Magnetic Button Effect
    const buttons = document.querySelectorAll('.btn-premium');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });
});
