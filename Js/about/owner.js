//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import slideInObserver from './../utils/slideInObserver.js';
// HTML Elements
const ownerDescriptionContainer = document.querySelector('.owner');

// Call the functions and add the event handlers on load of the page
window.addEventListener("load", () => {
    // handle slide in animation
    slideInObserver(ownerDescriptionContainer, 'slideAnimation--bottom');
})