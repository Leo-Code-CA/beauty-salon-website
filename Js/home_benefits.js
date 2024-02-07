//////////////////////////// INTRO SECTION OF THE HOME PAGE ////////////////////////////

// Media Queries

// HTML Elements

// Data

// Variables



const images = document.querySelectorAll('.benefit__img');
const options = {
    root: null,
    threshold: 0
}

let scrollY;

function handleIntersect(entries, observer) {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            console.log(scrollDirection)
            scrollDirection === "down" ? entry.target.classList.add('slideAnimate') : entry.target.classList.remove('slideAnimate');

            
        }
    })
}

const observer = new IntersectionObserver(handleIntersect, options);

images.forEach(img => {
    observer.observe(img)
})

// window.addEventListener('scroll', function() {
//     console.log(this.oldScroll > this.scrollY);
//     this.oldScroll = this.scrollY;
// });

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


