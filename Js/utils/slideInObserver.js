// Handle slide in animation

const slideInOptions = {
    duration: 1500,
    fill: "forwards",
    easing: 'ease-in-out',
}

const observer = new IntersectionObserver(handleIntersect);

function handleIntersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            const elemAnimation = entry.target.getAnimations()[0];
            console.log(elemAnimation)
            elemAnimation.play();
        }
    });
};

export function setUpSlideInAnimation(targetElem, translateStarts, translateEnds) {
    // animate the target
    const slideIn = {
        transform: [translateStarts, translateEnds],
        opacity: [0, 1]
    };
    const animateElem = targetElem.animate(slideIn, slideInOptions);
    animateElem.pause();

    // observe the target
    observer.observe(targetElem);
}



// // Handle slide in animation
// export default function slideInObserver(elem, className, options = {root: null, threshold: 0}) {
//     if (elem && className) {
//         const observer = new IntersectionObserver(handleIntersect, options);
//         function handleIntersect(entries) {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
//                     entry.target.classList.add(className);
//                     setTimeout(() =>  entry.target.classList.remove(className), 2000)
//                 }
//             });
//         };
//         observer.observe(elem);
//         return observer;
//     }
// };