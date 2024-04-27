//////////////////////////// SUMMARY SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import FnScrollDirection from "./../utils/scrollDirection.js";
import { setUpSlideInAnimation } from "../utils/slideInObserver.js";
import { purpleIshPalette, blackNWhitePalette, filters } from "./../data/constants.js";
// Media Queries
const mediaQuery = window.matchMedia("(orientation: portrait) and (max-width: 767px)");
// HTML Elements
const visisbleScrollBox = document.querySelector('.summary__animationBox');
const elemOne = document.querySelector('.summary__box:nth-child(1)');
const elemTwo = document.querySelector('.summary__box:nth-child(2)');
const elemThree = document.querySelector('.summary__box:nth-child(3)');
const html = document.querySelector(':root');
const hiddenElements = document.querySelectorAll('.summary__hidden');
const rectangle = document.querySelector('.summary__svg rect');
const summaryBox = document.querySelectorAll('.summary__box:nth-child(1), .summary__box:nth-child(3)');
const summaryBoxOne = document.querySelector('.summary__box:nth-child(1)');
const summaryBoxTwo = document.querySelector('.summary__box:nth-child(2)');
const summaryBoxThree = document.querySelector('.summary__box:nth-child(3)');
// Variables
let initialHeightOne;
let initialHeightTwo;
let initialHeightThree;
let positiveTranslate;
let totalTranslate;
let translateBreakPeriod;
const navBarHeight = getComputedStyle(html).getPropertyValue('--navbarHeight').replace(/[a-z]*/gi, '') * 16 ?? 56;
const visibleBoxHeight = visisbleScrollBox?.clientHeight;
const fullBoxHeight = visisbleScrollBox?.scrollHeight;
const scrollArea = fullBoxHeight - visibleBoxHeight;
const goalHeight = window.innerHeight / 100 * 70;
const boxTop = ((window.innerHeight - navBarHeight) - goalHeight) / 2;
const width = elemOne?.offsetWidth;
const windowWidth = window.innerWidth;
const elemSpacing = (windowWidth - width) / 2;
const elemSpacingPercentage = windowWidth / elemSpacing;

///////// START OF THE JS ////////

////////////////////////// MOBILE ONLY ANIMATION /////////////////////////////

// Handle inactive elements display
function handleInactiveElem(elem) {
    if (elem) {
        if (elem.getBoundingClientRect().x < totalTranslate / 2 - 100) {
            elem.style.transform = `translate(-100%)`;
            elem.style.height = elem.id === 'summaryCenter' ? `${initialHeightTwo}px`
            : elem.id === 'summaryLeft' ? `${initialHeightOne}px`
            : `${initialHeightThree}px`;
        } else {
            `translate(${positiveTranslate}%)`;
            elem.style.height = `${goalHeight}px`
        }
        elem.style.opacity = 0;
    }
}

// Handle automatic  page scroll when the animation has started
function handleAutoScroll() {
    const topElemToDocTop = window.scrollY + visisbleScrollBox.getBoundingClientRect().top - navBarHeight;
    const lengthFromTop = visisbleScrollBox.scrollTop;
    if (lengthFromTop !== 0 && lengthFromTop !== scrollArea) {
        window.scrollTo(0, topElemToDocTop);
    };
};

// Handle height update
function handleHeightUpdate(initialHeight, translatePercentage, staticPhasePercentage, elem) {
    const differenceHeight = goalHeight - initialHeight;
    const heightUpdate = 70 / differenceHeight;
    const updatePeriod = 70 / 100 * translateBreakPeriod; 
    if (translatePercentage <= elemSpacingPercentage + updatePeriod) {
        const updatedHeight = staticPhasePercentage / heightUpdate + initialHeight;
        elem.style.height = `${updatedHeight}px`;
    };
};

// Handle color update
function handleColorUpdate(staticPhasePercentage, elem) {
    const colorRate = 100 / 11; // 12 colors total but array is zero based so 11;
    const updatedColor = Math.round(staticPhasePercentage / colorRate);
    elem.style.backgroundColor = purpleIshPalette[updatedColor];
    elem.style.color = blackNWhitePalette[updatedColor];
};

// Handle opacity update
function handleOpacityUpdate(staticPhasePercentage, nthChild) {
    const opacityRate = 100 / 0.7; // Goal is to go from 0 to 0.7
    const updatedOpacity = staticPhasePercentage / opacityRate;
    const img = document.querySelector(`.summary__box:nth-child(${nthChild}) .summary__img`);
    img.style.display = 'block';
    img.style.opacity = updatedOpacity;
};

// Handle icons update 
function handleIconsUpdate(staticPhasePercentage, nthChild) {
    const icons = document.querySelector(`.summary__box:nth-child(${nthChild}) .summary__icon`);
    const colorChangeRate = 100 / 11; // 12 filters total but array is zero based so 11;
    const current = filters[Math.round(staticPhasePercentage / colorChangeRate)];
    const newFilter = `invert(${current[0]}%) sepia(${current[1]}%) saturate(${current[2]}%) hue-rotate(${current[3]}deg) brightness(${current[4]}%) contrast(${current[5]}%)`;
    icons.style.filter = newFilter;
};

// Handle box-shadow update
function handleShadowUpdate(staticPhasePercentage, elem) {
    const updateRateSide = 100 / 6; // from 0 to 6px;
    const boxSideUpdate = staticPhasePercentage / updateRateSide;
    const updateRateBottom = 100 / 12; // from 0 to 12px;
    const boxBottomUpdate = staticPhasePercentage / updateRateBottom;
    const updateRateBlur = 100 / 26; // from 0 to 26px;
    const boxBlurUpdate = staticPhasePercentage / updateRateBlur;
    const updatedBoxShadow = `${boxSideUpdate}px ${boxBottomUpdate}px ${boxBlurUpdate}px rgba(47, 45, 45, 0.6), -${boxSideUpdate}px ${boxBottomUpdate}px ${boxBlurUpdate}px rgba(47, 45, 45, 0.6)`
    elem.style.boxShadow = updatedBoxShadow;
};

// handle fancy button scroll animation
function handleBtnOutlineAnimation(translatePercentage, staticPhasePercentage, translateBreakPeriod) {
    let rectangleLength = rectangle.getTotalLength();
    html.style.setProperty('--review-btn-length', rectangleLength);
    rectangle.style.strokeDashoffset = rectangleLength;
    const updateSvg = 20 / rectangleLength; // In 20% of the translateBreakPeriod, complete the outline animation
    const draw = rectangleLength - ((staticPhasePercentage - 60) / updateSvg); // Animation starts only when 60% of the translateBreakPeriod has passed;
    const sixtyPercent = 60 / 100 * translateBreakPeriod;
    if (translatePercentage >= elemSpacingPercentage + sixtyPercent) {
        if (draw >= 0) {
            rectangle.style.strokeDashoffset = draw;
        } else {
            rectangle.style.strokeDashoffset = 0;
        }
    } 
}

// Handle scroll bound animation
function handleScrollBoundAnimation() {

    const lengthFromTop = visisbleScrollBox.scrollTop;
    const scrollPercentage = Math.ceil(lengthFromTop) / scrollArea * 100;
    const translateUpdateRate = 33 / (translateBreakPeriod + totalTranslate);

    handleAutoScroll();

    // ANIMATE FIRST BOX
    if (lengthFromTop <= (scrollArea / 3)) {

        elemOne.style.opacity = 1;
        elemTwo.style.opacity = 0;
        elemThree.style.opacity = 0;
        handleInactiveElem(elemTwo);
        handleInactiveElem(elemThree);

        const translatePercentage = -100 + (scrollPercentage / translateUpdateRate);

        if (translatePercentage < elemSpacingPercentage) {
            elemOne.style.transform = `translate(${translatePercentage}%)`
        } 
        
        else if (translatePercentage >= elemSpacingPercentage && translatePercentage < elemSpacingPercentage + translateBreakPeriod) {

            elemOne.style.transform = `translate(${elemSpacing}px)`

            const staticPhase = translatePercentage - elemSpacingPercentage;
            const staticPhasePercentage = staticPhase / translateBreakPeriod * 100;
    
            // UPDATE HEIGHT
            handleHeightUpdate(initialHeightOne, translatePercentage, staticPhasePercentage, elemOne);

            // UPDATE COLORS (Background and Text)
            handleColorUpdate(staticPhasePercentage, elemOne);
            
            // UPDATE IMAGE 
            handleOpacityUpdate(staticPhasePercentage, 1)

            // UPDATE ICON COLOR
            handleIconsUpdate(staticPhasePercentage, 1);

            // UPDATE BOX SHADOW
            handleShadowUpdate(staticPhasePercentage, elemOne);
            
        } else {
            elemOne.style.transform = `translate(${translatePercentage - translateBreakPeriod}%)`
        }
    }
    // ANIMATE SECOND BOX
    else if (lengthFromTop <= (scrollArea / 3) * 2) {

        elemOne.style.opacity = 0;
        elemTwo.style.opacity = 1;
        elemThree.style.opacity = 0;
        handleInactiveElem(elemOne);
        handleInactiveElem(elemThree);

        const translatePercentage = -100 + (scrollPercentage / translateUpdateRate - (translateBreakPeriod + totalTranslate));

        if (translatePercentage < elemSpacingPercentage) {
            hiddenElements.forEach(elem => elem.style.display = 'none');
            elemTwo.style.transform = `translate(${translatePercentage}%)`
        } 
        
        else if (translatePercentage >= elemSpacingPercentage && translatePercentage < elemSpacingPercentage + translateBreakPeriod) {

            elemTwo.style.transform = `translate(${elemSpacing}px)`

            const staticPhase = translatePercentage - elemSpacingPercentage;
            const staticPhasePercentage = staticPhase / translateBreakPeriod * 100;
        
            // UPDATE HIDDEN ELEMENTS
            hiddenElements.forEach(elem => elem.style.display = 'block');

            // UPDATE HEIGHT
            handleHeightUpdate(initialHeightTwo, translatePercentage, staticPhasePercentage, elemTwo);

            // UPDATE COLORS (Background and Text)
            handleColorUpdate(staticPhasePercentage, elemTwo);

            // UPDATE ICON COLOR
            handleIconsUpdate(staticPhasePercentage, 2);

            // UPDATE BOX SHADOW
            handleShadowUpdate(staticPhasePercentage, elemTwo);

            // UPDATE BUTTON OUTLINE
            handleBtnOutlineAnimation(translatePercentage, staticPhasePercentage, translateBreakPeriod);          
            
        } else {
            elemTwo.style.transform = `translate(${translatePercentage - translateBreakPeriod}%)`
        }
    }

    // ANIMATE THIRD BOX
    else if (lengthFromTop < scrollArea) {

        elemOne.style.opacity = 0;
        elemTwo.style.opacity = 0;
        elemThree.style.opacity = 1;
        handleInactiveElem(elemOne);
        handleInactiveElem(elemTwo);

        const translatePercentage = -100 + (scrollPercentage / translateUpdateRate - ((translateBreakPeriod + totalTranslate) * 2));

        if (translatePercentage < elemSpacingPercentage) {
            elemThree.style.transform = `translate(${translatePercentage}%)`
        } 
        
        else if (translatePercentage >= elemSpacingPercentage && translatePercentage < elemSpacingPercentage + translateBreakPeriod) {

            elemThree.style.transform = `translate(${elemSpacing}px)`

            const staticPhase = translatePercentage - elemSpacingPercentage;
            const staticPhasePercentage = staticPhase / translateBreakPeriod * 100;

            // UPDATE HEIGHT
            handleHeightUpdate(initialHeightThree, translatePercentage, staticPhasePercentage, elemThree);

            // UPDATE COLORS (Background and Text)
            handleColorUpdate(staticPhasePercentage, elemThree);

            // UPDATE IMAGE 
            handleOpacityUpdate(staticPhasePercentage, 3);

            // UPDATE ICON COLOR
            handleIconsUpdate(staticPhasePercentage, 3);

            // UPDATE BOX SHADOW
            handleShadowUpdate(staticPhasePercentage, elemThree);
            
        } else {
            elemThree.style.transform = `translate(${translatePercentage - translateBreakPeriod}%)`
        }

    }

    // RESET THE BOXES WHEN SCROLL IS NO MORE POSSIBLE (TOP OR BOTTOM)
    if (lengthFromTop === 0 || lengthFromTop === scrollArea) {
        handleInactiveElem(elemOne);
        handleInactiveElem(elemTwo);
        handleInactiveElem(elemThree);
    }
};

// Handle page behavior when the animation runs
function handlePageScrollBehaviour() {

    const topElemToDocTop = window.scrollY + visisbleScrollBox.getBoundingClientRect().top - navBarHeight;
    const scrollY = window.scrollY;
    const scrollDirection = FnScrollDirection(scrollY);

    if (scrollDirection === "down") {

        if (topElemToDocTop <= scrollY) {

            const lengthFromTop = Math.ceil(visisbleScrollBox.scrollTop);
                // if the animation is not 100% done disable the page scroll (forwards)
                if (scrollArea !== lengthFromTop) {
                    window.scrollTo(0, topElemToDocTop);
            };
        };
    } 
    
    else if (scrollDirection === "up") {

        if (topElemToDocTop >= window.scrollY) {
            const lengthFromTop = Math.floor(visisbleScrollBox.scrollTop);
            // if the animation is not 100% done disable the page scroll (backwards)
            if (lengthFromTop !== 0) {
                window.scrollTo(0, topElemToDocTop);
            }
        }
    }
};

//////////////////////////// SUMMARY BOX FOR ALL THE OTHER MEDIA QUERIES ////////////////////////////

// Handle hover state of the summary box
function handleSummaryHover() {
    if (summaryBox && summaryBox.length > 0) {
        summaryBox.forEach(elem => {
            elem.addEventListener("mouseover", () => {
                elem.classList.add('summary__box--highlight');
            });
            elem.addEventListener("touchstart", () => {
                elem.classList.add('summary__box--highlight');
            });
            elem.addEventListener("mouseleave", () => {
                elem.classList.remove('summary__box--highlight');
            });
            elem.addEventListener("touchend", () => {
                elem.classList.remove('summary__box--highlight');
            });
        });
    }
}

// Handle slide in animation of the summary box
function handleSummarySlideInAnimation() {
    setUpSlideInAnimation(summaryBoxOne, 'left');
    setUpSlideInAnimation(summaryBoxTwo, 'bottom');
    setUpSlideInAnimation(summaryBoxThree, 'right');
}

//////////////////////////// GLOBAL FUNCTIONS CALL ////////////////////////////

// Check the size and orientation of the screen and decide if th animation should run or not
function handleMediaQuerySetup() {
     // Mobile landscape orientation, tablets and desktop - animation shouldn't run
     if (!mediaQuery.matches) {
        // Handle summary hover
        handleSummaryHover();
        // Handle summary slide in animation
        handleSummarySlideInAnimation();
        // Remove animation event listeners
        window.removeEventListener('scroll', handlePageScrollBehaviour);
        visisbleScrollBox.removeEventListener('scroll', handleScrollBoundAnimation);
    }

    // Mobile portrait orientation - animation should run
    if (mediaQuery.matches) {
        // INITIAL ANIMATION SETUP
        // get initial boxes' height
        initialHeightOne = elemOne?.offsetHeight;
        initialHeightTwo = elemTwo?.offsetHeight;
        initialHeightThree = elemThree?.offsetHeight;
        // define the translate percentages depending on the screen size
        positiveTranslate = 100 + ((windowWidth - width) / width * 100);
        totalTranslate = positiveTranslate + 100;
        translateBreakPeriod = totalTranslate / 2;
        // set the top property depending on the screen height 
        html.style.setProperty('--review-box-top', `${boxTop}px`);
        // Handle page behaviour
        window.addEventListener('scroll', handlePageScrollBehaviour);
        // Handle scroll bound animation
        visisbleScrollBox.addEventListener('scroll', handleScrollBoundAnimation);
    }
}

// Call the function and add the event handlers on load of the page
window.addEventListener('load', () => {
    // check media query and decide if the animation should run - on page load and on resize
    handleMediaQuerySetup();
    window.addEventListener('resize', handleMediaQuerySetup);
});