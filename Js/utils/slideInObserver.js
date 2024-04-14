export default function slideInObserver(elem, className, options = {root: null, threshold: 0}) {

    const observer = new IntersectionObserver(handleIntersect, options);
    
    function handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
                entry.target.classList.add(className);
                setTimeout(() =>  entry.target.classList.remove(className), 1500)
            }
        });
    };
    observer.observe(elem);

    return observer;
};