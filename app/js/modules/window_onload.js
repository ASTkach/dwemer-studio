import animationObserver from "../modules/animation_observer.js";

// const header = document.querySelector(".header");
// const headerPosition = header.getBoundingClientRect().top + window.pageYOffset;
// const headerHeight = header.offsetHeight;

const windowOnload = () => {
    window.addEventListener("load", () => {
        // animationObserver();
        initialMenuLink.classList.add("_active");

        // if (headerPosition > headerHeight) {
        //     header.classList.add("_fixed");
        // }
    });
};

export default windowOnload;
