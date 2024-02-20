//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import FnScrollDirection from "../utils/scrollDirection.js";
// Media Queries

// HTML Elements

// Data

// Variables

const images = document.querySelectorAll('.benefit__img');
const options = {
    root: null,
    threshold: 0
}

function handleIntersect(entries, observer) {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const scrollDirection = FnScrollDirection(window.scrollY);

            scrollDirection === "down" ? entry.target.classList.add('slideAnimate') : entry.target.classList.remove('slideAnimate');

        }
    })
}

const observer = new IntersectionObserver(handleIntersect, options);

images.forEach(img => {
    observer.observe(img)
});


