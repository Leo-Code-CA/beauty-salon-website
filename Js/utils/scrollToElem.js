export default function scrollToElem(elem) {
    if (elem) {
        const navbarHeight = document.querySelector('.navbar')?.clientHeight;
        const elemToTop = window.scrollY + elem?.getBoundingClientRect()?.top;
        if (navbarHeight && elemToTop) {
            const targetPosition = elemToTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            })
        }
    }
}