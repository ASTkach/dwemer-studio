const header = document.querySelector(".header");
const navLinks = Array.from(document.querySelectorAll(".nav__link"));
const initialMenuLink = document.getElementById("home-link");
const iconMenu = document.querySelector(".nav__icon");
const navigation = document.querySelector(".nav__body--header");

// removing active class from our menu links
const removeActiveLink = () => navLinks.forEach((link) => link.classList.remove("_active"));

// we set scroll-padding style to html otherwise, our header won't reach the top of the page
const setScrollPading = () => {
    if (window.innerWidth >= 951) {
        document.documentElement.style.scrollPadding = "108px";
    } else if (window.innerWidth >= 481 && window.innerWidth <= 950) {
        document.documentElement.style.scrollPadding = "110px";
    } else {
        document.documentElement.style.scrollPadding = "156px";
    }
};

// close burger menu
const closeBurgerMenu = () => {
    document.body.classList.remove("_lock");
    iconMenu.classList.remove("_active");
    navigation.classList.remove("_active");
};

export { header, initialMenuLink, iconMenu, navigation, removeActiveLink, setScrollPading, closeBurgerMenu };
