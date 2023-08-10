import { header, initialMenuLink, removeActiveLink, closeBurgerMenu, setScrollPading } from "../modules/reused_constants.js";
import { fixedHeader } from "../modules/fixed-header.js";

const section = document.querySelectorAll(".section");
const navLists = document.querySelectorAll(".nav__list");
const logos = document.querySelectorAll(".logo");
const footer = document.querySelector(".footer");
const servicesSection = document.getElementById("services");
const joinSection = document.getElementById("join");
const headerFixed = document.querySelector(".header._fixed");

let headerHeight;
let headerPosition;
let homeTopPosition;
let aboutTopPosition;
let servicesTopPosition;
let joinTopPosition;

let blockingScrollListener;
let lockHome;
let lockAbout;
let lockServices;
let lockJoin;
let blockingTime;

const activateScrollListenerBlocking = () => {
    blockingScrollListener = true;
    blockingTime = setTimeout(() => {
        blockingScrollListener = false;
    }, 700);
};

// blocking scroll listener, when clicking on the logo
logos.forEach((list) => {
    list.addEventListener("click", () => {
        removeActiveLink();
        clearTimeout(blockingTime);
        activateScrollListenerBlocking();
        initialMenuLink.classList.add("_active");
        setScrollPading();
        closeBurgerMenu();
    });
});

// blocking scroll listener, when clicking on the menu link
navLists.forEach((list) => {
    list.addEventListener("click", ({ target }) => {
        if (target.closest(".nav__link")) {
            clearTimeout(blockingTime);
            activateScrollListenerBlocking();
        } else {
            return;
        }
    });
});

const windowOnscroll = () => {
    let sectionPositionsArray = [];
    // getting the top position of each section and putting it in the array
    section.forEach((section) => {
        sectionPositionsArray.push(section.getBoundingClientRect().top + window.pageYOffset);
    });
    // set them in a variable
    [homeTopPosition, aboutTopPosition, servicesTopPosition, joinTopPosition] = sectionPositionsArray;

    const servicesBottomPosition = servicesSection.getBoundingClientRect().bottom + window.pageYOffset;
    const joinSectionHeight = joinSection.clientHeight;
    const footerHeight = footer.clientHeight;

    // set new value of joinTopPosition if our join section is to small
    // otherwise appropriate menu item will not get an active class
    if (joinSectionHeight + footerHeight < window.innerHeight) {
        const partOfServicesSection = window.innerHeight - joinSectionHeight - footerHeight;
        joinTopPosition = servicesBottomPosition - partOfServicesSection;
    }

    window.addEventListener("scroll", () => {
        // fixed header function
        fixedHeader();

        if (!blockingScrollListener) {
            // get height of our fixed header
            // static header height we need only for a first scrolls
            if (!headerFixed === null) {
                headerPosition = headerFixed.getBoundingClientRect().top + window.pageYOffset;
                headerHeight = headerFixed.scrollHeight;
            } else {
                headerPosition = header.getBoundingClientRect().top + window.pageYOffset;
                headerHeight = header.scrollHeight;
            }

            // associate a specific menu item with a specific section
            if (headerPosition >= homeTopPosition - headerHeight && headerPosition < aboutTopPosition - headerHeight) {
                if (!lockHome) {
                    const link = document.getElementById(`home-link`);
                    removeActiveLink();
                    link.classList.add("_active");
                    lockHome = true;
                    lockAbout = false;
                    lockServices = false;
                    lockJoin = false;
                }
            } else if (headerPosition >= aboutTopPosition - headerHeight && headerPosition < servicesTopPosition - headerHeight) {
                if (!lockAbout) {
                    const link = document.getElementById(`about-link`);
                    removeActiveLink();
                    link.classList.add("_active");
                    lockAbout = true;
                    lockHome = false;
                    lockServices = false;
                    lockJoin = false;
                }
            } else if (headerPosition >= servicesTopPosition - headerHeight && headerPosition < joinTopPosition - headerHeight) {
                if (!lockServices) {
                    const link = document.getElementById(`services-link`);
                    removeActiveLink();
                    link.classList.add("_active");
                    lockServices = true;
                    lockHome = false;
                    lockAbout = false;
                    lockJoin = false;
                }
            } else if (headerPosition >= joinTopPosition - headerHeight) {
                if (!lockJoin) {
                    const link = document.getElementById(`join-link`);
                    removeActiveLink();
                    link.classList.add("_active");
                    lockJoin = true;
                    lockServices = false;
                    lockAbout = false;
                    lockHome = false;
                }
            }
        }
    });
};

export default windowOnscroll;
