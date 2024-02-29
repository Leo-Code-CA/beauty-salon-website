import FnScrollDirection from './scrollDirection.js';

export default function slideInObserver(elem, className, options = {root: null, threshold: 0}) {

    const observer = new IntersectionObserver(handleIntersect, options);
    
    function handleIntersect(entries) {
        entries.forEach(entry => {
            const scrollDirection = FnScrollDirection(window.scrollY);
            if (entry.isIntersecting && scrollDirection === "down") {
                entry.target.classList.add(className);
            } else if (entry.boundingClientRect.top > 0 && scrollDirection === "up") {
               entry.target.classList.remove(className);   
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
// }