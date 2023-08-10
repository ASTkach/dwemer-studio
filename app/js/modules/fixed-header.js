import { header } from "../modules/reused_constants.js";

const headerPosition = header.getBoundingClientRect().top + window.pageYOffset;
let headerHeight = header.offsetHeight;

// if we not at the top of the page add fixed class to header, when reloading the page
const getHeaderCurrentPosition = () => {
    if (headerPosition > headerHeight) {
        header.classList.add("_fixed");
    }
};

// on small screens, we start the animation earlier, because we have a high header
if (window.innerWidth <= 480) {
    headerHeight /= 2;
}

const fixedHeader = () => {
    if (window.scrollY > headerHeight) {
        header.classList.add("_fixed");
    } else if (window.scrollY === 0) {
        header.classList.remove("_fixed");
    }
};

export { fixedHeader, getHeaderCurrentPosition };
