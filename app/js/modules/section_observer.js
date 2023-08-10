const sectionObserver = () => {
    // window.addEventListener("load", () => {
    //     const navLinks = Array.from(document.querySelectorAll(".nav__link"));
    //     const navLists = document.querySelectorAll(".nav__list");
    //     const logos = document.querySelectorAll(".logo");
    //     const initialMenuLink = document.getElementById("home-link");
    //     let thresholdValue;
    //     let blockingObserver;
    //     const removeActiveLink = () => navLinks.forEach((link) => link.classList.remove("_active"));
    //     const activateBlockObserver = () => {
    //         blockingObserver = true;
    //         setTimeout(() => {
    //             blockingObserver = false;
    //         }, 1000);
    //     };
    //     // add active classes to the menu links
    //     const observer = new IntersectionObserver(
    //         (entries, observer) => {
    //             entries.forEach((entry) => {
    //                 // console.log(entry.intersectionRatio);
    //                 if (entry.isIntersecting) {
    //                     const targetElement = entry.target;
    //                     let win = window.innerHeight;
    //                     let blockHeight = targetElement.clientHeight;
    //                     // if (blockHeight > win) {
    //                     //     thresholdValue = 0.5;
    //                     // } else {
    //                     //     thresholdValue = 0.7;
    //                     // }
    //                     // console.log(thresholdValue);
    //                     // switch (blockHeight > win) {
    //                     //     case :
    //                     // }
    //                     // console.log(targetElement.clientHeight);
    //                     // block the observer so that active classes do not appear, when we scroll by clicking on the menu link
    //                     navLists.forEach((list) => {
    //                         list.addEventListener("click", ({ target }) => {
    //                             if (target.closest(".nav__link")) {
    //                                 activateBlockObserver();
    //                             } else {
    //                                 return;
    //                             }
    //                         });
    //                     });
    //                     //  block the observer ... by clicking on the logo
    //                     logos.forEach((list) => {
    //                         list.addEventListener("click", () => {
    //                             removeActiveLink();
    //                             activateBlockObserver();
    //                             initialMenuLink.classList.add("_active");
    //                             // console.log(link);
    //                         });
    //                     });
    //                     if (!blockingObserver) {
    //                         const targetId = targetElement.id;
    //                         const headerLinkId = `${targetId + "-link"}`;
    //                         const link = document.getElementById(`${headerLinkId}`);
    //                         removeActiveLink();
    //                         // console.log(link);
    //                         if (link === null) {
    //                             // initial active link
    //                             initialMenuLink.classList.add("_active");
    //                         } else {
    //                             link.classList.add("_active");
    //                         }
    //                     }
    //                 }
    //             });
    //         },
    //         { rootMargin: "-50px", threshold: 0.6 }
    //     );
    //     const observableSection = document.querySelectorAll(`[data-name="observable-section"]`);
    //     observableSection.forEach((element) => {
    //         observer.observe(element);
    //     });
    // });
};

export default sectionObserver;
