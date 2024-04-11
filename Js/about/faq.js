//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import handleFetchComponent from './../utils/fetchComponent.js';
// HTML Elements
const faqContainer = document.querySelector('.about__faq');

// Call the functions and add the event handlers on load of the page
window.addEventListener("load", () => {
    handleFetchComponent('/components/faq.html', faqContainer);
})