import { initialMenuLink } from "./modules/reused_constants.js";
import windowOnscroll from "./modules/window_onscroll.js";
import menuClicks from "./modules/menu_clicks.js";
import marqueeTouch from "./modules/marquee_toush.js";
import { getHeaderCurrentPosition } from "./modules/fixed-header.js";
import animationObserver from "./modules/animation_observer.js";

windowOnscroll();
menuClicks();
marqueeTouch();

window.addEventListener("resize", () => {
    windowOnscroll();
});

window.addEventListener("load", () => {
    getHeaderCurrentPosition();
    animationObserver();
    initialMenuLink.classList.add("_active");
});
