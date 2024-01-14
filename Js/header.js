 // Focus state function - DESIGN
 const focusState = (firstElemID, secondElemID, className) => {

    const focusedElem = document.getElementById(firstElemID);
    const switchClassElem = document.getElementById(secondElemID);
   
    focusedElem.onfocus = () => switchClassElem.classList.add(className);
   
    focusedElem.onblur = () => switchClassElem.classList.remove(className);
    }

// Set margin of the intro section

function handleMainMargin() {
    const navHeight = document.getElementById('nav').offsetHeight;
    const introSection = document.getElementById('intro');

    introSection.style.marginTop = navHeight + "px";
    introSection.style.height = `calc(100vh - ${navHeight}px)`;
    // change that so the height is fixed only if the vw is wider than 992px OR fix the weight of the children?

}

// Fetch the header, display it and call focus state and handle margin functions

function handleFetchHeader() {

    fetch("header.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.getElementById('div').innerHTML = data;
        })
        .then(() => {
            focusState('searchInput', 'searchGroup', 'navbar__input-group--focus');
        })
        .then(() => handleMainMargin());

}

handleFetchHeader();