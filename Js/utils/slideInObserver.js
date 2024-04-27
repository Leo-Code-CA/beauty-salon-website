// Handle slide in animation

function handleLeftIntersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            animateElem(entry.target, 'translateX(-100%)', 'translateX(0)');
        }
    });
};

function handleRightIntersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            animateElem(entry.target, 'translateX(100%)', 'translateX(0)');
        }
    });
};

function handleBottomIntersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            animateElem(entry.target, 'translateY(200%)', 'translateY(0)');
        }
    });
};

async function animateElem(elem, translateStarts, translateEnds) {

    let elemAnimation = elem.getAnimations()[0];

    if (!elemAnimation) {
        const slideInKeyframes = new KeyframeEffect(
            elem, 
            [
                { transform: translateStarts, opacity: 0 },
                { transform: translateEnds, opacity: 1 },
            ],
            { duration: 1500, fill: "forwards", easing: 'ease-in-out' },
        );
        elemAnimation = new Animation(slideInKeyframes, document.timeline);
    }
    // Play the animation
    elemAnimation.play();
    // Wait for the animation to finish
    // await elemAnimation.finished;
    // // Commit animation state to style attribute
    // elemAnimation.commitStyles();
    // // Cancel the animation
    // elemAnimation.cancel();
};

const leftObserver = new IntersectionObserver(handleLeftIntersect);
const rightObserver = new IntersectionObserver(handleRightIntersect);
const bottomObserver = new IntersectionObserver(handleBottomIntersect);

export function setUpSlideInAnimation(targetElem, direction) {
    // observe the target
    if (direction === 'left') {
        leftObserver.observe(targetElem);
    } else if (direction === 'right') {
        rightObserver.observe(targetElem);
    } else if (direction === 'bottom') {
        bottomObserver.observe(targetElem);
    } else {
        console.log('invalid slide in direction');
    }
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