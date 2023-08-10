const blockObserver = () => {
    window.onload = () => {
        const navLinks = Array.from(document.querySelectorAll(".nav__link"));
        const removeActiveLink = () => navLinks.forEach((link) => link.classList.remove("_active"));
        const navLists = document.querySelectorAll(".nav__list");
        const logos = document.querySelectorAll(".logo");

        let blockingObserver;

        // add animation
        const animationObserver = new IntersectionObserver(
            (entries, animationObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const targetElement = entry.target;

                        targetElement.classList.add("_show");
                        animationObserver.unobserve(targetElement);
                    }
                });
            },
            { root: null, threshold: 0.05 }
        );

        // add active classes to the menu links
        const sectionObserver = new IntersectionObserver(
            (entries, sectionObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const targetElement = entry.target;

                        // block the observer so that active classes do not appear, when we scroll by clicking on the menu link orlogo
                        navLists.forEach((list) => {
                            list.addEventListener("click", ({ target }) => {
                                if (target.closest(".nav__link")) {
                                    blockingObserver = true;
                                    setTimeout(() => {
                                        blockingObserver = false;
                                    }, 1000);
                                } else {
                                    return;
                                }
                            });
                        });

                        if (!blockingObserver) {
                            let targetId = targetElement.id;
                            let headerLinkId = `${targetId + "-link"}`;
                            let link = document.getElementById(`${headerLinkId}`);
                            removeActiveLink();

                            // initial active link
                            if (link === null) {
                                link = document.getElementById(`home-link`);
                                link.classList.add("_active");
                            } else {
                                link.classList.add("_active");
                            }
                        }
                    }
                });
            },
            { root: null, threshold: 0.5 }
        );

        const observableAnimation = document.querySelectorAll(`[data-name="observable-animation`);
        observableAnimation.forEach((element) => {
            animationObserver.observe(element);
        });

        const observableSection = document.querySelectorAll(`[data-name="observable-section"]`);
        observableSection.forEach((element) => {
            sectionObserver.observe(element);
        });
    };
};

export default blockObserver;

// const blockObserver = () => {
//     window.onload = () => {
//         const options = {
//             root: null,
//             threshold: 0.05,
//         };

//         const observer = new IntersectionObserver((entries, observer) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     const targetElement = entry.target;

//                     targetElement.classList.add("_show");
//                     observer.unobserve(targetElement);
//                 }
//             });
//         }, options);

//         const observableElements = document.querySelectorAll("[data-name='observable-element']");
//         observableElements.forEach((element) => {
//             observer.observe(element);
//         });
//     };
// };

// export default blockObserver;
