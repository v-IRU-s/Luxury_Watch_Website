const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = parseInt(counter.dataset.target);

        let current = 0;

        const increment = target / 100;

        function updateCounter() {

            if (current < target) {

                current += increment;

                counter.innerText =
                    Math.floor(current).toLocaleString();

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText =
                    target.toLocaleString();
            }
        }

        updateCounter();

        observer.unobserve(counter);
    });

},{
    threshold:0.5
});

counters.forEach(counter => {
    observer.observe(counter);
});