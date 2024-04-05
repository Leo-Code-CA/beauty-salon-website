//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import slideInObserver from "../utils/slideInObserver.js";
// HTML Elements
const images = document.querySelectorAll('.benefit__img');

// Handle slide in animation
images.forEach(img => {
    slideInObserver(img, 'slideAnimation--left');
});
