//////////////////////////// MASSAGES PAGE ////////////////////////////

// Imports

// Media Queries

// HTML Elements
const overview = document.querySelectorAll('.massages__overview');
// Data

// Variables

function handleOpenMassagesOverview(e) {

    // Select the element that has been clicked AND the three others massage elements
    const selectedMassage = e.currentTarget;
    const activeInfo = selectedMassage.children[2];
    let notSelectedMassages;
    overview.forEach((massage, key) => {
        massage === selectedMassage ?
        notSelectedMassages = document.querySelectorAll(`.massages__overview:not(:nth-child(${key + 1}))`)
        : null;
    });

    const checkIfSelected = document.querySelector('.massages__overview--selected');

    if (!checkIfSelected) {

        // Give the three elements not selected an opacity of 0
        notSelectedMassages.forEach(massage => massage.style.opacity = 0);
        // Add a class to the active massage element - it increases its size
        selectedMassage.classList.add('massages__overview--selected');
        // Show the info that were hidden
        activeInfo.classList.remove("d-none");

    } else {

        // console.log(e.target, activeInfo.children[0].children[0])

        if (e.target === activeInfo.children[0].children[0]) {
            // Give the three elements that were hidden an opacity of 1
            notSelectedMassages.forEach(massage => massage.style.opacity = 1);
            // Remove the class of the massage element that was active - decreases its size
            selectedMassage.classList.remove('massages__overview--selected');
            // Hide the info that were showed when the massage element was selected
            activeInfo.classList.add("d-none");
        };

        if (checkIfSelected && !checkIfSelected.contains(clickTarget)) {
            console.log('outside')
        }



    };
    
};

// Call the function to handle the overview on click
// overview.forEach(massage => {
//     massage.addEventListener('click', (e) => handleOpenMassagesOverview(e));
// });



window.addEventListener('click', (e) => {

    handleMassageOverview(e);

})

function handleMassageOverview(e) {
    // 3 cases: click on and open / click on cross and close / click outside and close if open
    const clickedElem = e.target;
    let massageOrInside = false;
    let clickTarget;
    const massageSelected = document.querySelector('.massages__overview--selected');
    const closeELem = document.querySelector('.massages__close');
    
    overview.forEach(elem => {
        if (!massageOrInside && elem === clickedElem) {
            massageOrInside = true;
            clickTarget = elem;
            console.log("on massage")
        }
    });

    if (!clickTarget && clickedElem.closest('.massages__overview')) {
        console.log('inside it')
        clickTarget = clickedElem;
        massageOrInside = true;
    }

    if (massageOrInside) {
        if (!massageSelected) {
            console.log("open massage");
        } else if (massageSelected && clickedElem === closeELem) {
            console.log('close the popup from the cross')
        }
    } else {
        if (massageSelected) {
            console.log('close popup from outside')
        }
    }
    
    

    // if (clickedElem.closest('.massages__overview')) return { target: clickedElem, click: 'inside' };

    // return { target: clickedElem, click: 'outside' };





    // const closeELem = document.querySelector('.massages__close');
    // const selectedMassage = document.querySelector('.massages__overview--selected');
    // const insideMassage = selectedMassage?.contains(e.target);

    // if (insideMassage) {

    //     if (selectedMassage && e.target === closeELem) {
    //         console.log("close because cross clicked");
    //     }

    //     if (!selectedMassage) {
    //         console.log('open the popup because clicked on it')
    //     }

    // } else if (!insideMassage && selectedMassage) {
    //     console.log('close because clicked outisde')
    // }



}