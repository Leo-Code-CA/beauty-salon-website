// Update the public side of the website with the most recent content - FUNCTIONALITY - REACTIVATE WHEN READY
// function handleLoadHome() {

//     if (localStorage.getItem('webta') !== null) {
//          document.getElementById('webp').innerHTML = localStorage.getItem('webta');
//      }

//     localStorage.setItem("webp", document.getElementById('webp').innerHTML);
//     console.log(`webp value : ${localStorage.getItem("webp")}`);
//     console.log(`webta value : ${localStorage.getItem("webta")}`);

//     }

//     document.getElementById('bodyhome').addEventListener("load", handleLoadHome());

/////////////////////////////////// REVIEWS FETCH


(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "",
    v: "beta",
});


async function getPlaceDetails() {
// Use place ID to create a new Place instance.
const { Place } = await google.maps.importLibrary("places");


const place = new Place({
    id: "ChIJvzvJUWDctRIRIr5dUidA9p8",
    requestedLanguage: "fr"
});

// Call fetchFields, passing the desired data fields.
await place.fetchFields({ fields: ["reviews"] });
// Show the result
const reviews = place.reviews;
console.log(reviews[0].g);
const reviewsContainer = document.querySelector('#reviews');


reviews.map((review, i) => {
    let revText = review.g;
    console.log(review)
    let name = review.h.g;
    // let newRev = document.createElement('p').textContent = revText;
    // reviewsContainer.append(newRev);
    let carousel = document.querySelector('#reviewCarousel');

    let slide = document.querySelector(`.carousel-item:nth-child(${i + 1})`);

    let p = document.createElement('p');
    p.textContent = revText;
    slide.appendChild(p);

    let h3 = document.createElement('h3');
    h3.textContent = name;
    slide.appendChild(h3);

    

})

}

getPlaceDetails();

///////////////////////////////////










