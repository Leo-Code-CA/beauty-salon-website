//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

// Media Queries

// HTML Elements

// Data

// Variables

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

const summary = document.querySelector('.summary__box:nth-child(1)');
const carouselSection = document.querySelector(".carousel__section");

const options = {
    root: null,
    threshold: 1
}

function handleObserve(entries, observer) {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("summary__box--highlight");
            entry.target.scrollIntoView(false);
        } 

        // else {
        //     entry.target.classList.remove("summary__box--highlight");
        // }
        

    })

}

const observer = new IntersectionObserver(handleObserve, options);
observer.observe(summary);

