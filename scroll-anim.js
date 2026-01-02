// scroll-anim.js
document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Parallax Blobs (only feature remaining)
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.1;
        blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
});
