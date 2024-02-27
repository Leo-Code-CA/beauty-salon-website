//////////////////////////// MASSAGES PAGE ////////////////////////////

// Imports

// Media Queries

// HTML Elements
const overview = document.querySelectorAll('.massages__overview');
// Data

// Variables

function handleTargets(e) {

    const clickedTarget = e.target;
    const clickHandler = e.currentTarget;
    let currentlyOpen = false;
    let selectedClose = false;
    let selectedMassage;
    let selectedMassageIndex;
    let notSelectedMassages;

    overview.forEach((massageElem, i) => {

        if (massageElem.classList.contains('massages__overview--selected')) {
            currentlyOpen = true;
        }

        if (massageElem.contains(clickedTarget)) {

            selectedMassage = massageElem;
            selectedMassageIndex = i + 1;
            notSelectedMassages = document.querySelectorAll(`.massages__overview:not(:nth-child(${i + 1}))`)

            clickedTarget.classList.contains('massages__close') ? selectedClose = true : null;

        }
    });

    if (!currentlyOpen && selectedMassage) {

        const activeInfo = document.querySelector(`.massages__overview:nth-child(${selectedMassageIndex}) .massages__active`);

        handleOpenOverview(selectedMassage, notSelectedMassages, activeInfo);
    }

    if (currentlyOpen && selectedClose) {

        const activeInfo = document.querySelector(`.massages__overview:nth-child(${selectedMassageIndex}) .massages__active`);

        handleCloseOverview(selectedMassage, notSelectedMassages, activeInfo);
    }

    if (currentlyOpen && !selectedMassage) {
        selectedMassage = document.querySelector('.massages__overview--selected');
        notSelectedMassages = document.querySelectorAll(".massages__overview:not(.massages__overview--selected)");
        const activeInfo = document.querySelector(".massages__overview--selected .massages__active");
        // console.log(selectedMassage, notSelectedMassages, activeInfo)
        handleCloseOverview(selectedMassage, notSelectedMassages, activeInfo);
    }


}

function handleOpenOverview(selectedMassage, notSelectedMassages, activeInfo) {

    // Give the three elements not selected an opacity of 0
    notSelectedMassages.forEach(massage => massage.style.opacity = 0);
    // Add a class to the active massage element - it increases its size
    selectedMassage.classList.add('massages__overview--selected');
    // Show the info that were hidden
    activeInfo.classList.remove("d-none");

}

function handleCloseOverview(selectedMassage, notSelectedMassages, activeInfo) {

    // Give the three elements that were hidden an opacity of 1
    notSelectedMassages.forEach(massage => massage.style.opacity = 1);
    // Remove the class of the massage element that was active - decreases its size
    selectedMassage.classList.remove('massages__overview--selected');
    // Hide the info that were showed when the massage element was selected
    activeInfo.classList.add("d-none");

}

window.addEventListener('click', handleTargets);
