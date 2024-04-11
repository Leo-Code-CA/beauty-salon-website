//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import slideInObserver from "./../utils/slideInObserver.js";
// HTML Elements
const images = document.querySelectorAll('.benefit__img');

// Handle slide in animation
function handleBenefitsSlideInImages() {
    images && images.length > 0 ? images.forEach((img, i) => {
        slideInObserver(img, i % 2 === 0 ? 'slideAnimation--right' : 'slideAnimation--left');
    }) : null;
}

// Call the functions and add the event handlers on load of the page
window.addEventListener("load", () => {
    handleBenefitsSlideInImages();
})
