// Update the public side of the website with the most recent content - FUNCTIONALITY
function handleLoadHome() {

    if (localStorage.getItem('webta') !== null) {
         document.getElementById('webp').innerHTML = localStorage.getItem('webta');
     }

    localStorage.setItem("webp", document.getElementById('webp').innerHTML);
    console.log(`webp value : ${localStorage.getItem("webp")}`);
    console.log(`webta value : ${localStorage.getItem("webta")}`);

    }

    document.getElementById('bodyhome').addEventListener("load", handleLoadHome());



//  // Focus state function - DESIGN
//  const focusState = (firstElemID, secondElemID, className) => {

//  const focusedElem = document.getElementById(firstElemID);
//  const switchClassElem = document.getElementById(secondElemID);

//  focusedElem.onfocus = () => switchClassElem.classList.add(className);

//  focusedElem.onblur = () => switchClassElem.classList.remove(className);
//  }

//  // Call the focus state function for the navbar input group (search bar)
//  focusState('searchInput', 'searchGroup', 'navbar__input-group--focus');






