document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HAMBURGER MENU (UNCHANGED)
    ========================= */

    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");
    const hamburger = document.querySelector(".hamburger");

    if (sideMenu && overlay && hamburger) {

        const openMenu = () => {
            sideMenu.classList.add("active");
            overlay.classList.add("active");
        };

        const closeMenu = () => {
            sideMenu.classList.remove("active");
            overlay.classList.remove("active");
        };

        hamburger.addEventListener("click", () => {
            sideMenu.classList.contains("active") ? closeMenu() : openMenu();
        });

        overlay.addEventListener("click", closeMenu);

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeMenu();
        });
    }

    /* =========================
       HERO SLIDER (FIXED FLOW SYSTEM)
    ========================= */

    let currentIndex = 0;
    let scrollLock = false;
    let inHero = true;

    const videos = document.querySelectorAll(".hero-video");
    const texts = document.querySelectorAll(".hero-text");
    const total = videos.length;
    const footer = document.querySelector("footer");

    function showSlide(index) {

        videos.forEach((v, i) => {
            const vid = v.querySelector("video");

            if (i === index) {
                v.classList.add("active");
                if (vid) {
                    vid.currentTime = 0;
                    vid.play().catch(() => {});
                }
            } else {
                v.classList.remove("active");
                if (vid) vid.pause();
            }
        });

        texts.forEach((t, i) => {
            t.classList.toggle("active", i === index);
        });
    }

    function scrollToNextSection() {
        const nextSection = document.querySelector(".after-hero");

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        } else if (footer) {
            footer.scrollIntoView({ behavior: "smooth" });
        }
    }

    /* =========================
       SLIDE CONTROL
    ========================= */

    function nextSlide() {

        if (currentIndex < total - 1) {
            currentIndex++;
            showSlide(currentIndex);
        } else {
            // EXIT HERO → allow normal scroll
            inHero = false;
            scrollToNextSection();
        }
    }

    function prevSlide() {

        // RE-ENTER HERO FROM OUTSIDE
        if (!inHero) {
            inHero = true;
            currentIndex = total - 1;
            showSlide(currentIndex);
            return;
        }

        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
        }
    }

    /* =========================
       INITIAL STATE
    ========================= */

    showSlide(currentIndex);

    /* =========================
       CONTROLS (FIXED)
    ========================= */

    document.addEventListener("keydown", (e) => {

        if (e.key === "ArrowDown") nextSlide();
        if (e.key === "ArrowUp") prevSlide();
    });

    window.addEventListener("wheel", (e) => {

        if (scrollLock) return;
        scrollLock = true;

        if (inHero) {
            e.preventDefault();

            if (e.deltaY > 0) nextSlide();
            else prevSlide();

        } else {
            // allow natural scroll when outside hero

            if (window.scrollY <= 50 && e.deltaY < 0) {
                inHero = true;
                currentIndex = total - 1;
                showSlide(currentIndex);
            }
        }

        setTimeout(() => {
            scrollLock = false;
        }, 650);

    }, { passive: false });

});





// =============================
// NEWS PAGE SCROLL REVEAL ONLY
// (SAFE - DOES NOT TOUCH EXISTING LOGIC)
// =============================



// =============================
// HERO PARALLAX EFFECT
// SAFE ADDITION
// =============================

document.addEventListener("scroll", () => {

    const activeVideo = document.querySelector(".hero-video.active video");

    if (!activeVideo) return;

    const scrolled = window.scrollY;

    activeVideo.style.transform =
        `scale(1.08) translateY(${scrolled * 0.15}px)`;

});




document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        ".watch-card, .news-card, .section-header"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });

    }, {
        threshold: 0.15
    });

    elements.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });

});



// ==================================================
// SCROLL REVEAL ANIMATION (NEWS + WATCH + SECTIONS)
// ==================================================

document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(
        ".watch-card, .news-card, .section-header"
    );

    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });

    }, {
        threshold: 0.15
    });

    items.forEach(el => {
        el.classList.add("fade-up");
        observer.observe(el);
    });

});