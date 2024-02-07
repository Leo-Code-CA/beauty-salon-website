//////////////////////////// FEATURES SECTION OF THE HOME PAGE ////////////////////////////

// Media Queries

// HTML Elements
const toggler = document.querySelectorAll('.features__toggle');
const tr = document.querySelector('#tr');
const innerTd = document.querySelectorAll('.features__td');
// Data
const arrowClasses = ["features__arrow--up", "features__arrow--down"];
// Variables

// FEATURES ARROW ANIMATION //

function arrowToggle() {

    toggler.forEach(arrow => arrow.addEventListener("click", function() {

        const currentArrow = this.children[3];
    
        arrowClasses.map(classToggle => currentArrow.classList.toggle(classToggle));
    
        })
    );

}

arrowToggle();

// MAKE ALL TD's CONTENT FILL TD's HEIGHT //

function tableHeight() {

    const trHeight = tr.clientHeight;

    // console.log(trHeight)

    innerTd.forEach(td => td.style.minHeight = trHeight + "px");

}

window.addEventListener("load", tableHeight);
window.addEventListener("resize", tableHeight);