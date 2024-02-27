//////////////////////////// MASSAGES PAGE ////////////////////////////

// Imports

// Media Queries

// HTML Elements
const overview = document.querySelectorAll('.massages__overview');
// Data

// Variables

function handleOverviewTargets(e) {

    const clickedTarget = e.target;

    overview.forEach((massageElem, i) => {

        const notSelectedMassages = document.querySelectorAll(`.massages__overview:not(:nth-child(${i + 1}))`);
        const activeInfo = document.querySelector(`.massages__overview:nth-child(${i + 1}) .massages__active`);

        // handle case where one massage element is already open, so we eventually want to close it
        if (massageElem.classList.contains('massages__overview--selected')) {

            // close that element if the user clicked outside of it or on the cross icon
            if (!massageElem.contains(clickedTarget) || clickedTarget.classList.contains('massages__close')) {
                handleToggleOverview(massageElem, notSelectedMassages, activeInfo);
            }

        // handle case where no massage element is opened yet, so we want to open it if the user clicked on it
        } else if (massageElem.contains(clickedTarget)) {
            handleToggleOverview(massageElem, notSelectedMassages, activeInfo);
        }

    });

};

function handleToggleOverview(selectedMassage, notSelectedMassages, activeInfo) {
    // Toggle not selected massages elements opacity between 0 and 1
    notSelectedMassages.forEach(massage => massage.classList.toggle('opacity-0'));
    // Toggle class of the selected element to increase or decrease its size
    selectedMassage.classList.toggle('massages__overview--selected');
    // Toggle class of one of the selected element child to show or hide its content
    activeInfo.classList.toggle("d-none");
}

window.addEventListener('click', handleOverviewTargets);
window.addEventListener('touchstart', handleOverviewTargets);