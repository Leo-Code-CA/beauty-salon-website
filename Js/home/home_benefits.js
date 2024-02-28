//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import slideInObserver from "../utils/slideInObserver.js";
// Media Queries

// HTML Elements
const images = document.querySelectorAll('.benefit__img');
// Data

// Variables

images.forEach(img => {
    slideInObserver(img, 'slideAnimate');
});
