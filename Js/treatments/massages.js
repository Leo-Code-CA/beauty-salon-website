//////////////////////////// MASSAGES PAGE ////////////////////////////

// Imports
import scrollToElem from "../utils/scrollToElem.js";
import slideInObserver from "./../utils/slideInObserver.js";
// Media Queries

// HTML Elements
const root = document.querySelector(':root');
const overview = document.querySelectorAll('.overview__card');
const overviewBtn = document.querySelectorAll('.overview__card .overview__massageBtn');
const doorIllustration = document.querySelector('.californien__infoIllustration');
const allMassagesDescription = document.querySelectorAll('.massages__massage:not(:nth-child(1))');

// Data

// Variables

// HANDLE THE SUMMARY / OVERVIEW ANIMATION BEHAVIOURS - MOBILE
function handleOverviewTargets(e) {

    const clickedTarget = e.target;

    overview.forEach((massageElem, i) => {

        const notSelectedMassages = document.querySelectorAll(`.overview__card:not(:nth-child(${i + 1}))`);
        const activeInfo = document.querySelector(`.overview__card:nth-child(${i + 1}) .overview__active`);

        // handle case where one massage element is already open, so we eventually want to close it
        if (massageElem.classList.contains('overview__card--selected')) {

            // close that element if the user clicked outside of it or on the cross icon
            if (!massageElem.contains(clickedTarget) || clickedTarget.classList.contains('overview__closeCard')) {
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
    selectedMassage.classList.toggle('overview__card--selected');
    // Toggle class of one of the selected element child to show or hide its content
    activeInfo.classList.toggle("d-none");
    // Toggle the pulse animation on the first massage element
    document.querySelector('.overview__card:nth-child(1)').classList.toggle('pulseAnimation');
}

window.addEventListener('click', handleOverviewTargets);
// window.addEventListener('touchstart', handleOverviewTargets);

// HANDLE THE SUMMARY / OVERVIEW ANIMATION BEHAVIOURS - TABLET
// function handle











// HANDLE ON CLICK PAGE SCROLL
overviewBtn.forEach((btn, i) => {
    const massageDescription = document.querySelector(`.massages__massage:nth-child(${i + 1})`)
    btn.addEventListener('click', () => scrollToElem(massageDescription));
})

// HANDLE DOOR ILLUSTRATION REVEAL ANIMATION
function handleDoorReveal() {

    const imgAnimName = window.getComputedStyle(root).getPropertyValue('--imgAnimName');

    if (imgAnimName === "moveTopLeft" || imgAnimName.includes('showContent')) {
        root.style.setProperty('--hiddenInfoAnimName', 'moveBottomRight');
        root.style.setProperty('--hiddenInfoAnimState', 'paused');
        root.style.setProperty('--imgAnimName', 'moveTopLeft, hideContent');
        root.style.setProperty('--imgAnimState', 'paused, running');
        root.style.setProperty('--doorShapeAnimState', 'paused');
    } else if (!imgAnimName.includes('showContent')) {
        root.style.setProperty('--hiddenInfoAnimName', 'moveBottomRight');
        root.style.setProperty('--hiddenInfoAnimState', 'running');
        root.style.setProperty('--imgAnimName', 'moveTopLeft, showContent');
        root.style.setProperty('--imgAnimState', 'running');
        root.style.setProperty('--doorShapeAnimState', 'running');
    }

};

doorIllustration.addEventListener('click', handleDoorReveal);

// HANDLE MASSAGES SLIDE IN ANIMATION
allMassagesDescription.forEach(massageElem => slideInObserver(massageElem, 'slideAnimation--bottom', { root: null, threshold: 0}));