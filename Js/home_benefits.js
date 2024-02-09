//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

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

            scrollDirection === "down" ? entry.target.classList.add('slideAnimate') : entry.target.classList.remove('slideAnimate');

        }
    })
}

const observer = new IntersectionObserver(handleIntersect, options);

images.forEach(img => {
    observer.observe(img)
})

let scrollDirection;
let lastScroll = 0;

window.addEventListener('scroll', function() {

    let currentScroll = window.scrollY;

    if (currentScroll > 0 && currentScroll >= lastScroll) {
        scrollDirection = "down";
        lastScroll = currentScroll;
    } else {
        scrollDirection = "up";
        lastScroll = currentScroll;
    }

})


