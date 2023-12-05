 // Focus state function - DESIGN
 const focusState = (firstElemID, secondElemID, className) => {

    const focusedElem = document.getElementById(firstElemID);
    const switchClassElem = document.getElementById(secondElemID);
   
    focusedElem.onfocus = () => switchClassElem.classList.add(className);
   
    focusedElem.onblur = () => switchClassElem.classList.remove(className);
    }
   
// Call the focus state function for the navbar input group (search bar)


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
        });

}

handleFetchHeader();