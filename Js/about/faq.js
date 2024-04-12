//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import handleFetchComponent from './../utils/fetchComponent.js';
import slideInObserver from './../utils/slideInObserver.js';
// HTML Elements
const faq = document.querySelector('.faq');

// Call the functions and add the event handlers on load of the page
window.addEventListener("load", () => {
    // handle fetch faq component
    handleFetchComponent('/components/faq.html', faq);
    // handle faq slide in animation
    slideInObserver(faq, 'slideAnimation--bottom');
})