const marqueeTouch = () => {
    const marquees = document.querySelectorAll(".marquee");

    marquees.forEach((marquee) => {
        marquee.addEventListener("touchstart", function () {
            marquee.firstElementChild.style.animationPlayState = "paused";
        });

        marquee.addEventListener("touchend", function () {
            marquee.firstElementChild.style.animationPlayState = "running";
        });
    });
};

export default marqueeTouch;
