gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor (Enabled only on non-touch)
const cursor = document.getElementById('cursor');
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });
}

// 2. Hero Entrance Animation
gsap.from(".logo-main", { 
    duration: 1.5, 
    y: 100, 
    opacity: 0, 
    ease: "power4.out",
    delay: 0.2 
});

// 3. Scroll Reveals
gsap.utils.toArray(".gsap-reveal").forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// 4. Parallax Background Blobs
gsap.to(".floating-blob", {
    scrollTrigger: {
        scrub: 1
    },
    y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
    ease: "none"
});

// 5. Card Hover Effects (Tilt) - Only for Desktop
if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll('.comic-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            gsap.to(card, {
                rotationY: x * 15,
                rotationX: -y * 15,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5 });
        });
    });
}