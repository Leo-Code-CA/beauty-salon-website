
export default function scrollToElem(elem) {
    const navbarHeight = document.querySelector('#nav').clientHeight;
    const elemToTop = window.scrollY + elem.getBoundingClientRect().top;
    const targetPosition = elemToTop - navbarHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    })
}