const animationObserver = () => {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const targetElement = entry.target;

                    targetElement.classList.add("_show");
                    observer.unobserve(targetElement);
                }
            });
        },
        { root: null, threshold: 0.05 }
    );

    const observableAnimation = document.querySelectorAll(`[data-name="observable-animation`);
    observableAnimation.forEach((element) => {
        observer.observe(element);
    });
};

export default animationObserver;
