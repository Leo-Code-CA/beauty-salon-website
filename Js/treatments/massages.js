//////////////////////////// MASSAGES PAGE ////////////////////////////

// Imports
import scrollToElem from "../utils/scrollToElem.js";
// Media Queries

// HTML Elements
const overview = document.querySelectorAll('.massages__overview');
const overviewBtn = document.querySelectorAll('.massages__overview button');
const doorIllustration = document.querySelector('.massages__door');
const doorImg = document.querySelector('.massages__door img');
const doorHiddenInfo = document.querySelector('.massages__hiddenInfo');

// Data

// Variables

// HANDLE THE SUMMARY / OVERVIEW ANIMATION BEHAVIOURS
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

// HANDLE ON CLICK PAGE SCROLL
overviewBtn.forEach((btn, i) => {
    const massageDescription = document.querySelector(`.massages__service:nth-child(${i + 1})`)
    btn.addEventListener('click', () => scrollToElem(massageDescription));
})

// HANDLE DOOR ILLUSTRATION REVEAL ANIMATION
function handleDoorReveal() {
    // console.log(window.getComputedStyle(doorHiddenInfo).zIndex === -1)
    if (window.getComputedStyle(doorHiddenInfo).zIndex === '0') {
        // doorHiddenInfo.style.zIndex = '2';
        // doorImg.style.zIndex = '0';
        console.log("info hidden")
        doorHiddenInfo.classList.add('massages__animateShow');
        doorHiddenInfo.classList.remove('massages__animateHide');
        doorImg.classList.add('massages__animateHide')
        doorImg.classList.remove('massages__animateShow')
    } else if (window.getComputedStyle(doorHiddenInfo).zIndex === '2') {
        // doorHiddenInfo.style.zIndex = '0';
        // doorImg.style.zIndex = '2';
        doorImg.classList.add('massages__animateShow');
        doorImg.classList.remove('massages__animateHide');
        doorHiddenInfo.classList.add('massages__animateHide')
        doorHiddenInfo.classList.remove('massages__animateShow')
    }
};

doorIllustration.addEventListener('click', handleDoorReveal);