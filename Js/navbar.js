//////////////////////////// NAVBAR ////////////////////////////
import scrollToElem from './utils/scrollToElem.js';

// GLOBAL VARIABLES DECLARATION AND ASSIGNMENT //

const mqLarge = window.matchMedia('(max-width: 992px)');

// SEARCH INPUT FOCUS STATE //
 const focusState = (firstElemID, secondElemID, className) => {

    const focusedElem = document.getElementById(firstElemID);
    const switchClassElem = document.getElementById(secondElemID);
   
    focusedElem.onfocus = () => switchClassElem.classList.add(className);
   
    focusedElem.onblur = () => switchClassElem.classList.remove(className);
    }

// FETCH NAVBAR //
window.addEventListener('load', handleFetchNavbar);

function handleFetchNavbar() {

    fetch("/components/navbar.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById('nav').innerHTML = data;
        })
        .then(() => {
            focusState('searchInput', 'searchGroup', 'navbar__input-group--focus');
        })
        .then(() => {

            const navLinks = document.querySelectorAll('[data-redirect]');

            if (window.location.search) {
                const params = window.location.search;
                const targetElem = document.getElementById(params.slice(params.indexOf('=') + 1));
                if (targetElem) scrollToElem(targetElem);
            }
           
            navLinks.forEach(link => link.addEventListener('click', (e) => handleNavLink(link, e)))
        })
}

// handle navbar link click
function handleNavLink(navLink, e) {

    const path = new URL(navLink.href)
        .pathname
        .slice(0, -4)
        .replace(/\W*/g, '');

    if (navLink.dataset.redirect === 'null' && window.location.href.includes(path)) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        return;
    }

    if (window.location.href.includes(path)) {
        e.preventDefault();
        const target = document.getElementById(e.target.dataset.redirect)
        scrollToElem(target);
        return false;
    }
}