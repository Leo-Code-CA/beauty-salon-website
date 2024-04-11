//////////////////////////// FEATURES SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import slideInObserver from "./../utils/slideInObserver.js";
// HTML Elements
const table = document.querySelector('.features__table');
const accordion = document.querySelector('.features__accordion');
const toggler = document.querySelectorAll('.features__toggle');
const tr = document.querySelector('#tr');
const innerTd = document.querySelectorAll('.features__td');

///////// START OF THE JS ////////

// Handle accordion arrow rotation
function handleToggleArrow() {
    const arrowClasses = ["features__arrow--up", "features__arrow--down"];
    if (toggler && toggler?.length > 0) {
        toggler.forEach(arrow => arrow.addEventListener("click", () => {
            const currentArrow = arrow.querySelector('.features__arrow');
            currentArrow ? arrowClasses.map(classToggle => currentArrow.classList.toggle(classToggle)) : null;
            })
        );
    }
}

// Handle table sizing
function handleTableHeight() {
    // reset min-height
    innerTd ? innerTd.forEach(td => td.style.minHeight = 0) : null;
    // set min height
    const trHeight = tr?.clientHeight;
    trHeight ? innerTd.forEach(td => td.style.minHeight = trHeight / 16 + "rem") : null;
}

// Handle table and accordion slide in animation
function handleSlideInAnimation() {
    [table, accordion].map(elem => {
        if (elem) slideInObserver(elem, 'slideAnimation--bottom');
    })
}

// Call the functions and add the event handlers on load of the page
window.addEventListener("load", () => {
    // handle table height (on load and resize)
    handleTableHeight()
    window.addEventListener("resize", handleTableHeight);
    // handle toggle accordion arrow on click
    handleToggleArrow();
    // handle slide in animation
    handleSlideInAnimation();
});