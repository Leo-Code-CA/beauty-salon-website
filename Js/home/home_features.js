//////////////////////////// FEATURES SECTION OF THE HOME PAGE ////////////////////////////

// HTML Elements
const toggler = document.querySelectorAll('.features__toggle');
const tr = document.querySelector('#tr');
const innerTd = document.querySelectorAll('.features__td');

// Handle accordion arrow rotation
function arrowToggle() {

    const arrowClasses = ["features__arrow--up", "features__arrow--down"];

    toggler.forEach(arrow => arrow.addEventListener("click", function() {
        const currentArrow = arrow.querySelector('.features__arrow');
        arrowClasses.map(classToggle => currentArrow.classList.toggle(classToggle));
        })
    );

}

arrowToggle();

// Handle table sizing
function tableHeight() {
    const trHeight = tr.clientHeight;
    innerTd.forEach(td => td.style.minHeight = trHeight + "px");
}

window.addEventListener("load", tableHeight);
window.addEventListener("resize", tableHeight);