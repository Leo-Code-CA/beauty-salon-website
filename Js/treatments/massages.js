//////////////////////////// MASSAGES PAGE ////////////////////////////

// Imports
import scrollToElem from "../utils/scrollToElem.js";
import slideInObserver from "./../utils/slideInObserver.js";
// Media Queries

// HTML Elements
const root = document.querySelector(':root');
const overview = document.querySelectorAll('.massages__overview');
const overviewBtn = document.querySelectorAll('.massages__overview .massages__discoverBtn');
const doorIllustration = document.querySelector('.massages__door');
const allMassagesDescription = document.querySelectorAll('.massages__service');
// const doorImg = document.querySelector('.massages__door img');
// const doorHiddenInfo = document.querySelector('.massages__hiddenInfo');

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
    // Toggle the pulse animation on the first massage element
    document.querySelector('.massages__overview:nth-child(1)').classList.toggle('massages__animatePulse');
}

window.addEventListener('click', handleOverviewTargets);
// window.addEventListener('touchstart', handleOverviewTargets);

// HANDLE ON CLICK PAGE SCROLL
overviewBtn.forEach((btn, i) => {
    const massageDescription = document.querySelector(`.massages__service:nth-child(${i + 1})`)
    btn.addEventListener('click', () => scrollToElem(massageDescription));
})

// HANDLE DOOR ILLUSTRATION REVEAL ANIMATION
function handleDoorReveal() {

    const hiddenInfoAnimName = window.getComputedStyle(root).getPropertyValue('--hiddenInfoAnimName');

    if (!hiddenInfoAnimName || hiddenInfoAnimName === 'hideContent') {
        root.style.setProperty('--hiddenInfoAnimName', 'showContent');
        root.style.setProperty('--imgAnimName', 'moveTopLeft, hideContent');
        root.style.setProperty('--imgAnimState', 'paused, running');
        root.style.setProperty('--doorShapeAnimState', 'paused');
    } else if (hiddenInfoAnimName === 'showContent') {
        root.style.setProperty('--hiddenInfoAnimName', 'hideContent');
        root.style.setProperty('--imgAnimName', 'moveTopLeft, showContent');
        root.style.setProperty('--imgAnimState', 'running');
        root.style.setProperty('--doorShapeAnimState', 'running');
    }

};

doorIllustration.addEventListener('click', handleDoorReveal);

// HANDLE MASSAGES SLIDE IN ANIMATION
// allMassagesDescription.forEach(massageElem => slideInObserver(massageElem, 'massages__slideInAnimation', { root: null, threshold: 0.3}));
slideInObserver(document.querySelector('.massages__service'), 'massages__slideInAnimation', { root: null, threshold: [0, 1]});