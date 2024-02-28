import FnScrollDirection from './scrollDirection.js';

// BELOW WORKS FINE WITH 0 THRESHOLD

// export default function slideInObserver(elem, className, options = {root: null, threshold: 0}) {

//     const observer = new IntersectionObserver(handleIntersect, options);
    
//     function handleIntersect(entries) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const scrollDirection = FnScrollDirection(window.scrollY);
//                 scrollDirection === "down" ? entry.target.classList.add(className) : entry.target.classList.remove(className);
//             };
//         });
//     };

//     observer.observe(elem);

// };

// TEST WITH GOAL TO IMPROVE THE VISIBILITY OF THE ELEMENTS BEFORE AND AFTER THE FIRST FULL PAGE SCROLL

export default function slideInObserver(elem, className, options = {root: null, threshold: 0}) {

    const observer = new IntersectionObserver(handleIntersect, options);
    
    function handleIntersect(entries) {

        entries.forEach(entry => {

            const heightFromTopDoc = entry.boundingClientRect.top + window.scrollY;
            const currentScrollPosition = window.scrollY;

            console.log(currentScrollPosition <= heightFromTopDoc)
            console.log(entry)


            if (entry.isIntersecting) {
                const scrollDirection = FnScrollDirection(window.scrollY);
                scrollDirection === "down" ? entry.target.classList.add(className) : entry.target.classList.remove(className);
            };


        });


    };

    observer.observe(elem);

};




// INTERESTING CODE FROM MDN:
// function intersectionCallback(entries) {
//     entries.forEach((entry) => {
//       entry.target.style.opacity = entry.intersectionRatio;
//     });
//   }

// https://stackoverflow.com/questions/58980851/detect-whether-element-is-above-or-below-the-viewport-on-intersect-leave-with-in
// check that out to see if the elem is above  or under! Good luck :D