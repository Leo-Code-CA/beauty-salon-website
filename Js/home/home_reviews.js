//////////////////////////// REVIEWS SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import './../external-code/gm_placeapi.js';
// Media Queries

// HTML Elements
const targetCarousel = document.querySelector("#reviewsCarousel");

///////// START OF THE JS ////////

// Handle carousel lazy loading
function handleCarouselLazyLoading() {
    console.log(targetCarousel)
    if (targetCarousel) {
        const carousel = new bootstrap.Carousel(targetCarousel, {interval: 5000, pause: 'hover', ride: 'carousel'});
        const carouselObserver = new IntersectionObserver(entries => {
            entries.map(entry => {
                const intersecting = entry.isIntersecting;
                if (!intersecting) carousel.pause();
            }) 
        });
        carouselObserver.observe(targetCarousel);
    }
}

// Fetch reviews from google maps place api
async function getPlaceDetails() {

    let reviews;

    // Use place ID to create a new Place instance
    try {
        const { Place } = await google.maps.importLibrary("places");
        if (Place) {
            const place = new Place({id: "ChIJvzvJUWDctRIRIr5dUidA9p8", requestedLanguage: "fr"});
            try {
                // Fetch ONLY the data needed (reviews)
                await place.fetchFields({ fields: ["reviews"] });
                if (place.reviews) reviews = place.reviews;
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }

    if (reviews && reviews.length > 0) {
        // Map through the reviews and display them in the carousel
        reviews.map((review, i) => {

            const revText = review?.Ig;
            const name = review?.Jg?.Ig;
            const stars = review?.Ng;
            
            const slide = document.querySelector(`.carousel-item:nth-child(${i + 1}) .blockquote`);
            const bottomName = document.querySelector(`.carousel-item:nth-child(${i + 1}) .blockquote-footer`);
            const topName = document.querySelector(`.carousel-indicators button:nth-child(${i + 1})`);
            const starsIcon = document.querySelectorAll(`.carousel-item:nth-child(${i + 1}) .carousel__stars`);

            // Map through the stars icon of each review and fill them according to the number of stars received
            if (starsIcon && starsIcon.length > 0) {
                starsIcon.forEach((star, i) => {
                    if (i + 1 <= stars) {
                        star.setAttribute("src", "/images/homepage/review_star_icon.svg");
                        star.setAttribute("alt", "review star icon");
                    } else {
                        star.setAttribute("src", "/images/homepage/review_empty_star_icon.svg");
                        star.setAttribute("alt", "review empty star icon");
                    }
                });
            }
            slide ? slide.innerHTML = revText : null;
            bottomName ? bottomName.innerHTML = name : null;
            topName ? topName.innerHTML = name : null; 
        });
    }
}

// Call the functions and add the event handlers on load of the page
window.addEventListener('load', () => {
    // handle carousel lazy loading
    handleCarouselLazyLoading();

    // handle reviews fetching
    getPlaceDetails();
})
