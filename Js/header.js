//////////////////////////// NAVBAR ////////////////////////////

// IMPORTS //
// import handleMainDimensions from './home_intro.js';

// GLOBAL VARIABLES DECLARATION AND ASSIGNMENT //

const mqLarge = window.matchMedia('(max-width: 992px)');

// SEARCH INPUT FOCUS STATE //
 const focusState = (firstElemID, secondElemID, className) => {

    const focusedElem = document.getElementById(firstElemID);
    const switchClassElem = document.getElementById(secondElemID);
   
    focusedElem.onfocus = () => switchClassElem.classList.add(className);
   
    focusedElem.onblur = () => switchClassElem.classList.remove(className);
    }

// FETCH NAVBAR //

function handleFetchHeader() {

    fetch("header.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById('nav').innerHTML = data;
        })
        .then(() => {
            focusState('searchInput', 'searchGroup', 'navbar__input-group--focus');
        })
        // .then(() => {
        //     handleMainDimensions(mqLarge);
        // })

}

handleFetchHeader();








// FEATURES ARROW ANIMATION - MOVE TO HOME.JS

const toggler = document.querySelectorAll('.features__toggle');

toggler.forEach(arrow => arrow.addEventListener("click", function() {

    const currentArrow = this.children[3];
    const classesToToggle = ["features__arrow--up", "features__arrow--down"];

    classesToToggle.map(classToggle => currentArrow.classList.toggle(classToggle));
})
)

// MAKE ALL TD's CONTENT FILL THE TD HEIGHT

const tr = document.querySelector('#tr');
const innerTd = document.querySelectorAll('.features__td');
const trHeight = tr.clientHeight;

innerTd.forEach(td => td.style.height = trHeight + "px");


