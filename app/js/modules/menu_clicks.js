import { removeActiveLink, closeBurgerMenu, setScrollPading, iconMenu, navigation } from "./reused_constants.js";

const menuClicks = () => {
    const navListHeader = document.querySelector(".nav__list--header");
    const navListFooter = document.querySelector(".nav__list--footer");

    // show hide menu
    iconMenu.addEventListener("click", () => {
        document.body.classList.toggle("_lock");
        iconMenu.classList.toggle("_active");
        navigation.classList.toggle("_active");
    });

    // add the active class to the header menu item
    navListHeader.addEventListener("click", ({ target }) => {
        if (target.closest(".nav__link")) {
            removeActiveLink();
            target.classList.add("_active");

            // close burger menu on small devices
            if (window.innerWidth <= 950) {
                closeBurgerMenu();
            }

            if (target.classList.contains("nav__link--home")) {
                setScrollPading();
            } else {
                document.documentElement.style.scrollPadding = null;
            }
        } else {
            return;
        }
    });

    // add the active class to the header menu item, when clicking on a similar item in the footer
    navListFooter.addEventListener("click", ({ target }) => {
        if (target.closest(".nav__link")) {
            const targetHash = target.hash.substring(1);
            const headerLinkId = `${targetHash + "-link"}`;
            const link = document.getElementById(`${headerLinkId}`);

            removeActiveLink();

            link.classList.add("_active");

            if (target.classList.contains("nav__link--home-footer")) {
                setScrollPading();
            } else {
                document.documentElement.style.scrollPadding = null;
            }
        } else {
            return;
        }
    });
};

export default menuClicks;
