export default function scrollToElem(elem) {

    const navbarHeight = document.querySelector('.navbar').clientHeight;
    console.log('navbar height is ' + navbarHeight)
    const elemToTop = window.scrollY + elem.getBoundingClientRect().top;
    console.log('Elem to top viewport is :' + elemToTop)
    const targetPosition = elemToTop - navbarHeight;
    console.log('target position is ' + targetPosition)

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    })
}