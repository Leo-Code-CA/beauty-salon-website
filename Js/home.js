// FETCH GOOGLE PLACE API

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({key: "", v: "beta"});

async function getPlaceDetails() {

    // Use place ID to create a new Place instance.
    const { Place } = await google.maps.importLibrary("places");
    const place = new Place({id: "ChIJvzvJUWDctRIRIr5dUidA9p8", requestedLanguage: "fr"});

    // Fetch the needed data : reviews and assign the result to a variable
    await place.fetchFields({ fields: ["reviews"] });
    const reviews = place.reviews;

    // Map through the reviews and display them in the carousel
    reviews.map((review, i) => {

        const revText = review.Ig;
        const name = review.Jg.Ig;
        const stars = review.Ng;
        
        const slide = document.querySelector(`.carousel-item:nth-child(${i + 1}) .blockquote`);
        const bottomName = document.querySelector(`.carousel-item:nth-child(${i + 1}) .blockquote-footer`);
        const topName = document.querySelector(`.carousel-indicators button:nth-child(${i + 1})`);
        const starsIcon = document.querySelectorAll(`.carousel-item:nth-child(${i + 1}) .carousel__stars`);


        // Map through the stars icon of each review and fill them according to the number of stars received
        starsIcon.forEach((star, i) => {
            i + 1 <= stars ? star.setAttribute("src", "images/homepage/review_star_icon.svg")
            : star.setAttribute("src", "images/homepage/review_empty_star_icon.svg");

            i + 1 <= stars ? star.setAttribute("alt", "review star icon")
            : star.setAttribute("alt", "review empty star icon");
        })


        slide.innerHTML = revText;
        bottomName.innerHTML = name;
        topName.innerHTML = name; 

    });

}

getPlaceDetails();


// HOVER STATE OF THE SUMMARY BOXES

const summaryBox = document.querySelectorAll('.summary__box:nth-child(1), .summary__box:nth-child(3)');

summaryBox.forEach(function(elem) {

    elem.addEventListener('mouseover', function() {
        elem.classList.add('summary__box--highlight');
    })

    elem.addEventListener('mouseout', function() {
        elem.classList.remove('summary__box--highlight');
    })

});

// LAZY LOADING REVIEWS CAROUSEL

const targetCarousel = document.querySelector("#reviewsCarousel");
const carousel = new bootstrap.Carousel(targetCarousel, {interval: 5000, pause: false})

const carouselObserver = new IntersectionObserver(entries => {
    entries.map(entry => {
        const intersecting = entry.isIntersecting;
        intersecting ? carousel.cycle() : carousel.pause();
    }) 
});

carouselObserver.observe(targetCarousel);

// LAZY LOADING INTRO VIDEO

const targetVideo = document.querySelector(".intro__containers video");

const videoObserver = new IntersectionObserver(entries => {
    entries.map(entry => entry.isIntersecting ? targetVideo.play() : targetVideo.pause());
})

videoObserver.observe(targetVideo);


