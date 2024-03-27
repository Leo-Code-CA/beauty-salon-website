//////////////////////////// SUMMARY SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import FnScrollDirection from "../utils/scrollDirection.js";
import { purpleIshPalette, blackNWhitePalette, filters } from "../data/constants.js";
// Media Queries
const mediaQuery = window.matchMedia("(orientation: portrait) and (max-width: 767px)");
let mediaQueryMatches;
// HTML Elements
const visisbleScrollBox = document.querySelector('.summary__animationBox');
// const fullScrollBox = document.querySelector('.summary');
const elemOne = document.querySelector('.summary__box:nth-child(1)');
const elemTwo = document.querySelector('.summary__box:nth-child(2)');
const elemThree = document.querySelector('.summary__box:nth-child(3)');
const html = document.querySelector(':root');
const hiddenElements = document.querySelectorAll('.summary__hidden');
const rectangle = document.querySelector('.summary__svg rect');
const summaryBox = document.querySelectorAll('.summary__box:nth-child(1), .summary__box:nth-child(3)');
// Variables
let initialHeightOne;
let initialHeightTwo;
let initialHeightThree;
let positiveTranslate;
let totalTranslate;
let translateBreakPeriod;
const navBarHeight = getComputedStyle(html).getPropertyValue('--navbarHeight').replace(/[a-z]*/gi, '') * 16 ?? 56;
const visibleBoxHeight = visisbleScrollBox.clientHeight;
const fullBoxHeight = visisbleScrollBox.scrollHeight;
const scrollArea = fullBoxHeight - visibleBoxHeight;
const goalHeight = window.innerHeight / 100 * 70;
const boxTop = ((window.innerHeight - navBarHeight) - goalHeight) / 2;
const width = elemOne.offsetWidth;
const windowWidth = window.innerWidth;
const elemSpacing = (windowWidth - width) / 2; 
const elemSpacingPercentage = windowWidth / elemSpacing;
const horizontalObserverOptions = {
    root: visisbleScrollBox,
    rootMargin: "0px",
    threshold: 0.5
}
const horizontalObserver = new IntersectionObserver(handleHorizontalIntersection, horizontalObserverOptions);

////////////////////////// MOBILE ONLY ANIMATION /////////////////////////////

// Media Query => determine if the animation should run or not when the window is resized
window.addEventListener('resize', () => mediaQueryMatches = mediaQuery.matches);

// Initial setup
window.addEventListener("load", () => {
    // get initial boxes' height
    initialHeightOne = elemOne.clientHeight;
    initialHeightTwo = elemTwo.clientHeight;
    initialHeightThree = elemThree.clientHeight;
    // define the translate percentages depending on the screen size
    positiveTranslate = 100 + ((windowWidth - width) / width * 100) + 10; // + 10 just to hide the shadow 
    totalTranslate = positiveTranslate + 100;
    translateBreakPeriod = totalTranslate / 2;
    // set the top property depending on the screen height 
    html.style.setProperty('--review-box-top', `${boxTop}px`);
    // check media query and decide if the animation should run
    mediaQueryMatches = mediaQuery.matches;
});

// handle boxes intersecting with the viewport
function handleHorizontalIntersection(entries) {
    entries.forEach(entry => {

        const position = entry.boundingClientRect.x;
        const id = entry.target.id;
        let target;

        console.log(id)

        if (id === "summaryLeft") {
            target = elemOne;
        } else if (id === "summaryCenter") {
            target = elemTwo;
        } else if (id === "summaryRight") {
            target = elemThree;
        } else {
            throw new Error("unknown id");
        };

        if (position < 0) {
            console.log(`Translating ${id} to -100%`)
            target.style.transform = `translate(-100%)`;
            id === "summaryLeft" || id === "summaryRight" ? target.style.height = `${initialHeightOne}px`
            : target.style.height = `${initialHeightTwo}px`;
        } else {
            console.log(`Translating ${id} to ${positiveTranslate}%`)
            target.style.transform = `translate(${positiveTranslate}%)`;
            target.style.height = `${goalHeight}px`;
        }
    });
};

// handle automatic scroll when animation has started
function handleAutoScroll() {

    const topElemToDocTop = window.scrollY + visisbleScrollBox.getBoundingClientRect().top - navBarHeight;
    const lengthFromTop = visisbleScrollBox.scrollTop;

    if (lengthFromTop !== 0 && lengthFromTop !== scrollArea) {
        window.scrollTo(0, topElemToDocTop);
    };

};

// handle height update
function handleHeightUpdate(initialHeight, translatePercentage, staticPhasePercentage, elem) {

    const differenceHeight = goalHeight - initialHeight;
    const heightUpdate = 70 / differenceHeight;
    const updatePeriod = 70 / 100 * translateBreakPeriod; 

    if (translatePercentage <= elemSpacingPercentage + updatePeriod) {
        const updatedHeight = staticPhasePercentage / heightUpdate + initialHeight;
        elem.style.height = `${updatedHeight}px`;
    };

};

// handle color update
function handleColorUpdate(staticPhasePercentage, elem) {

    const colorRate = 100 / 11; // 12 colors total but array is zero based so 11;
    const updatedColor = Math.round(staticPhasePercentage / colorRate);
    elem.style.backgroundColor = purpleIshPalette[updatedColor];
    elem.style.color = blackNWhitePalette[updatedColor];

};

// handle opacity update
function handleOpacityUpdate(staticPhasePercentage, nthChild) {

    const opacityRate = 100 / 0.7; // Goal is to go from 0 to 0.7
    const updatedOpacity = staticPhasePercentage / opacityRate;
    const img = document.querySelector(`.summary__box:nth-child(${nthChild}) .summary__img`);

    img.style.display = 'block';
    img.style.opacity = updatedOpacity;

};

// handle icons update 
function handleIconsUpdate(staticPhasePercentage, nthChild) {

    const icons = document.querySelector(`.summary__box:nth-child(${nthChild}) .summary__icon`);

    const colorChangeRate = 100 / 11; // 12 filters total but array is zero based so 11;
    const current = filters[Math.round(staticPhasePercentage / colorChangeRate)];
    const newFilter = `invert(${current[0]}%) sepia(${current[1]}%) saturate(${current[2]}%) hue-rotate(${current[3]}deg) brightness(${current[4]}%) contrast(${current[5]}%)`;

    icons.style.filter = newFilter;

};

// handle box-shadow update
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

// SCROLL BOUND ANIMATION
visisbleScrollBox.addEventListener('scroll', () => {

    if (mediaQueryMatches) {

        // console.log(`ElemOne translate is: ${elemOne.style.transform}`);
        // console.log(`ElemTwo translate is: ${elemTwo.style.transform}`);
        // console.log(`ElemThree translate is: ${elemThree.style.transform}`);

        const lengthFromTop = visisbleScrollBox.scrollTop;
        const scrollPercentage = Math.ceil(lengthFromTop) / scrollArea * 100;
        const translateUpdateRate = 33 / (translateBreakPeriod + totalTranslate);

        handleAutoScroll();

        // ANIMATE FIRST BOX
        if (lengthFromTop <= (scrollArea / 3)) {

            horizontalObserver.observe(elemTwo);
            horizontalObserver.observe(elemThree);
            horizontalObserver.unobserve(elemOne);

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

            horizontalObserver.observe(elemOne);
            horizontalObserver.observe(elemThree);
            horizontalObserver.unobserve(elemTwo);

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

            horizontalObserver.observe(elemOne);
            horizontalObserver.observe(elemTwo);
            horizontalObserver.unobserve(elemThree);

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
        if (lengthFromTop === 0) {
            elemOne.style.transform = `translate(-100%)`
            elemTwo.style.transform = `translate(-100%)`
            elemThree.style.transform = `translate(-100%)`
            console.log('Transforming all the elem to -100%')
        } else if (lengthFromTop === scrollArea) {
            elemOne.style.transform = `translate(${positiveTranslate}%)`
            elemTwo.style.transform = `translate(${positiveTranslate}%)`
            elemThree.style.transform = `translate(${positiveTranslate}%)`
            console.log(`Transforming all the elem to ${positiveTranslate}%`)
        }
    }

});

// HANDLE PAGE BEHAVIOUR
window.addEventListener('scroll', () => {

    if (mediaQueryMatches) {

        const topElemToDocTop = window.scrollY + visisbleScrollBox.getBoundingClientRect().top - navBarHeight;
        const scrollY = window.scrollY;
        const scrollDirection = FnScrollDirection(scrollY);

        if (scrollDirection === "down") {

            if (topElemToDocTop <= scrollY) {

                const lengthFromTop = Math.ceil(visisbleScrollBox.scrollTop);
                    // if the animation is not 100% done disable the page scroll (forwards)
                    if (scrollArea !== lengthFromTop) {
                        console.log(`Scroll area is ${scrollArea} and lengthFromTop is ${lengthFromTop}`)
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
                    console.log(`LengthFromTop is ${lengthFromTop} !== 0`)
                }
            }
        }
    }
});

//////////////////////////// HOVER STATE FOR ALL THE OTHER MEDIA QUERIES ////////////////////////////
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









