//////////////////////////// NAVBAR ////////////////////////////
import scrollToElem from './utils/scrollToElem.js';
import { search_params } from './data/searchData.js';

const root = document.querySelector(':root');

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


            // everything on top is good

            handleNavbarHeight() // this should be good

            // test below

            const searchBar = document.querySelector('.navbar__input');
            searchBar.addEventListener('input', (e) => handleSearchBar(e));
            
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

// handle navbar height for styling
function handleNavbarHeight() {

    const navMenu = document.querySelector('#navMenu');
    const searchBar = document.querySelector('#searchBar');

    if (!navMenu.classList.contains('show') && !searchBar.classList.contains('show')) {
        const navbarHeightRem = document.querySelector('.navbar').offsetHeight / 16;
        root.style.setProperty('--navbarHeight', `${navbarHeightRem}rem`);
        console.log(`${navbarHeightRem}rem`)
    }
}

window.addEventListener('resize', handleNavbarHeight);

// handle search on the website 
function handleSearchBar(e) {
    const searchParam = e.target.value;
    const dropdown = document.querySelector('.navbar__search-dropdown ul');
    console.log(searchParam)
    const suggestions = search_params.filter(param => {
        const keyword = param.query.filter(word => word.includes(searchParam) || searchParam.includes(word));
        console.log(keyword)
        return keyword.length > 0;
    })

    dropdown.innerHTML = '';

    console.log(suggestions)
    
    suggestions.map(opt => {
        const dropdownItem = document.createElement('li');
        dropdownItem.textContent = opt.sentence;
        dropdownItem.classList.add('list-group-item')
        dropdown.appendChild(dropdownItem);
    })
}

