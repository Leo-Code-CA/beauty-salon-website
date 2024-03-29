//////////////////////////// NAVBAR ////////////////////////////
// Imports
import scrollToElem from './utils/scrollToElem.js';
import { search_params } from './data/searchData.js';
// HTML Elements
const root = document.querySelector(':root');


// Handle focus and blur states of the search bar
function focusState() {
    const focusedElem = document.getElementById('searchInput');
    const toggleClassElem = document.getElementById('searchGroup');

    focusedElem.addEventListener('focus', () => {
        toggleClassElem.classList.add('navbar__input-group--focus');
        handleToggleDropdown();
    });
    focusedElem.addEventListener('blur', (e) => {
        if (e.relatedTarget?.hasAttribute('href')) return;
        toggleClassElem.classList.remove('navbar__input-group--focus');
        handleToggleDropdown();
    });
}

// Handle navbar height
function handleNavbarHeight() {
    const navMenu = document.querySelector('#navMenu');
    const searchBar = document.querySelector('#searchBar');
    if (!navMenu.classList.contains('show') && !searchBar.classList.contains('show')) {
        const navbarHeightRem = document.querySelector('.navbar').offsetHeight / 16;
        root.style.setProperty('--navbarHeight', `${navbarHeightRem}rem`);
    }
}

window.addEventListener('resize', handleNavbarHeight);

// Handle navbar link click (dropdown menu and search bar)
function handleNavLink(navLink, e) {

    const searchInput = document.querySelector('.navbar__input');
    const dropdownList = document.querySelector('.navbar__search-dropdown ul');
    searchInput.value = '';
    dropdownList.innerHTML = '';
    handleToggleDropdown();

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
        const target = document.getElementById(e.target.dataset.redirect || navLink.href.slice(navLink.href.indexOf('=') + 1));
        scrollToElem(target);
        return false;
    }
    window.location = navLink.href;
}

// Handle search bar suggestions
function handleSearchBar(e) {

    const searchParam = e.target.value;
    const dropdownList = document.querySelector('.navbar__search-dropdown ul');

    if (searchParam === '') {
        dropdownList.innerHTML = '';
        handleToggleDropdown();
        return;
    }

    const suggestions = search_params.filter(param => {
        const keyword = param.query.filter(word => word.includes(searchParam) || searchParam.includes(word));
        return keyword.length > 0;
    })

    dropdownList.innerHTML = '';
    
    suggestions.map(opt => {
        const dropdownItem = document.createElement('li');
        const dropdownLink = document.createElement('a');
        dropdownLink.textContent = opt.sentence;
        dropdownLink.setAttribute('href', opt.path);
        dropdownLink.setAttribute('data-redirect', opt.redirect);
        dropdownLink.classList.add('list-group-item', 'list-group-item-action');
        dropdownLink.addEventListener('click', (e) => handleNavLink(dropdownLink, e));
        dropdownItem.appendChild(dropdownLink);
        dropdownList.appendChild(dropdownItem);
    })
    handleToggleDropdown();
}

// Handle search bar dropdown toggle
function handleToggleDropdown() {

    const dropdown = document.querySelector('.navbar__search-dropdown');
    const dropdownList = document.querySelector('.navbar__search-dropdown ul');
    const toggleClassElem = document.getElementById('searchGroup');
    const input = document.querySelector('.navbar__input-group');

    if (dropdownList.children.length > 0 && input.classList.contains('navbar__input-group--focus')) {
        dropdown.classList.remove('d-none');
        toggleClassElem.classList.add('navbar__input-group--dropdown')
    } else {
        dropdown.classList.add('d-none');
        toggleClassElem.classList.remove('navbar__input-group--dropdown')
    }
}

// Handle search bar submit
function handleSearchBarSubmit(e) {

    const dropdownList = document.querySelector('.navbar__search-dropdown ul');
    const input = document.querySelector('.navbar__input-group');
   
    if (dropdownList.children.length > 0 && dropdownList.children[0]?.children.length > 0) {
        handleNavLink(dropdownList.firstElementChild.firstElementChild, e);
    } else {
        dropdownList.innerHTML = '';
        const dropdownItem = document.createElement('li');
        dropdownItem.classList.add('list-group-item');
        dropdownItem.textContent = 'Aucun résultat. Veuillez réessayer avec un autre mot clé.';
        dropdownList.appendChild(dropdownItem);
        input.classList.add('navbar__input-group--focus');
        handleToggleDropdown();
    }
}

// Handle fetch navbar and call functions to set it up
function handleFetchNavbar() {

    fetch("/components/navbar.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById('nav').innerHTML = data;
        })
        .then(() => {
            
            // Mesure the navbar height in order to apply the correct styling to the surrounding elements
            handleNavbarHeight()

            // Add the focus and blur listeners to adapt the styling
            focusState();

            // When the page loads, if there is param in the url, find the corresponding elem and scroll it into view
            if (window.location.search) {
                const params = window.location.search;
                const targetElem = document.getElementById(params.slice(params.indexOf('=') + 1));
                if (targetElem) scrollToElem(targetElem);
            }

            // Add click listener to all links in the navbar menu to redirect where they have to
            const navLinks = document.querySelectorAll('[data-redirect]');
            navLinks.forEach(link => link.addEventListener('click', (e) => handleNavLink(link, e)));

            // Add input and change listeners to the search bar
            const searchBar = document.querySelector('.navbar__input');
            searchBar.addEventListener('input', (e) => handleSearchBar(e));

            // Add click listener to the search bar submit buttom
            const submitBtn = document.querySelector('.navbar__search-btn');
            submitBtn.addEventListener('click', (e) => handleSearchBarSubmit(e));
            
        })
}

window.addEventListener('load', handleFetchNavbar);

