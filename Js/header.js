//////////////////////////// NAVBAR ////////////////////////////

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

function handleFetchHeader() {

    fetch("header.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById('nav').innerHTML = data;
        })
        .then(() => {
            focusState('searchInput', 'searchGroup', 'navbar__input-group--focus');
        })

}

handleFetchHeader();


