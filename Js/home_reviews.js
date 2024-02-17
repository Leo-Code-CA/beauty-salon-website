//////////////////////////// REVIEWS SECTION OF THE HOME PAGE ////////////////////////////

// Imports
import FnScrollDirection from "./utils/scrollDirection.js";
import { purpleIshPalette, blackNWhitePalette, filters } from "./data/constants.js";
// Media Queries

// HTML Elements
const visisbleScrollBox = document.querySelector('.summary__animationBox');
const fullScrollBox = document.querySelector('.summary');
const elemOne = document.querySelector('.summary__box:nth-child(1)');
const elemTwo = document.querySelector('.summary__box:nth-child(2)');
const elemThree = document.querySelector('.summary__box:nth-child(3)');
const html = document.querySelector(':root');
const hiddenElements = document.querySelectorAll('.summary__hidden');
// Data

// Variables
let initialHeightOne;
let initialHeightTwo;
let initialHeightThree;
const goalHeight = window.innerHeight / 100 * 70;
const boxTop = ((window.innerHeight - 56) - goalHeight) / 2;
const width = elemOne.offsetWidth;
const windowWidth = window.innerWidth;
const elemSpacing = (windowWidth - width) / 2; // 37.5
const elemSpacingPercentage = windowWidth / elemSpacing;

// Get inital height of the three boxes and determine the top property depending on the size of the viewport
window.addEventListener("load", () => {
    initialHeightOne = elemOne.clientHeight;
    initialHeightTwo = elemTwo.clientHeight;
    initialHeightThree = elemThree.clientHeight;
    html.style.setProperty('--top', `${boxTop}px`);
});

// handle height update
function handleUpdateHeight(initialHeight, translatePercentage, staticPhasePercentage, elem) {

    const differenceHeight = goalHeight - initialHeight;
    const heightUpdate = 70 / differenceHeight;
    const updatePeriod = 70 / 100 * 180; 

    if (translatePercentage <= elemSpacingPercentage + updatePeriod) {
        const updatedHeight = staticPhasePercentage / heightUpdate + initialHeight;
        elem.style.height = `${updatedHeight}px`;
    };

};

// handle color update
function handleColorUpdate(staticPhasePercentage, elem) {

    const updatedColor = Math.round(staticPhasePercentage / 9);
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

    const colorChangeRate = 100 / 12; // 12 colors total 
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


// Scroll bound animation
visisbleScrollBox.addEventListener('scroll', () => {

    console.log(`ElemOne translate is: ${elemOne.style.transform}`);
    console.log(`ElemTwo translate is: ${elemTwo.style.transform}`);
    console.log(`ElemThree translate is: ${elemThree.style.transform}`);


    const visibleBoxHeight = visisbleScrollBox.clientHeight;
    const fullBoxHeight = visisbleScrollBox.scrollHeight;
    const lengthFromTop = visisbleScrollBox.scrollTop;
    const scrollArea = fullBoxHeight - visibleBoxHeight;
    const scrollPercentage = Math.ceil(lengthFromTop) / (fullBoxHeight - visibleBoxHeight) * 100;
    // const scrollDirection = FnScrollDirection(visisbleScrollBox.scrollTop);




    // const width = elemOne.offsetWidth;
    // const windowWidth = window.innerWidth;
    // const elemSpacing = (windowWidth - width) / 2; // 37.5
    // const elemSpacingPercentage = windowWidth / elemSpacing;


    // animate the first element
    if (lengthFromTop <= (scrollArea / 3)) {

        // 580 (400 + 180 of "pause") / 33 = 0.05689
        const translatePercentage = -100 + (scrollPercentage / 0.05689); // max is 300 (from -100 to 300)


        if (translatePercentage < elemSpacingPercentage) {

            elemOne.style.transform = `translate(${translatePercentage}%)`
   

        } else if (translatePercentage >= elemSpacingPercentage && translatePercentage < elemSpacingPercentage + 180) {


            elemOne.style.transform = `translate(${elemSpacing}px)`

            const staticPhase = translatePercentage - elemSpacingPercentage;
            const staticPhasePercentage = staticPhase / 180 * 100;
    
            // UPDATE HEIGHT
            handleUpdateHeight(initialHeightOne, translatePercentage, staticPhasePercentage, elemOne);

            // UPDATE COLORS (Background and Text)
            handleColorUpdate(staticPhasePercentage, elemOne);
            
            // UPDATE IMAGE 
            handleOpacityUpdate(staticPhasePercentage, 1)

            // UPDATE ICON COLOR
            handleIconsUpdate(staticPhasePercentage, 1);

            // UPDATE BOX SHADOW
            handleShadowUpdate(staticPhasePercentage, elemOne);
            
        } else {

            elemOne.style.transform = `translate(${translatePercentage - 180}%)`

        }

        // if (scrollDirection === 'up') {
        //     elemTwo.style.transform = `translate(-100%)`
        //     elemThree.style.transform = `translate(-100%)`
        //     // console.log("I put them left")
        // } else {
        //     elemTwo.style.transform = `translate(300%)`
        //     elemThree.style.transform = `translate(300%)`
        //     // console.log("I put them right")
        // }



        // reset the elements - hidden
        if (lengthFromTop === 0) {
            elemOne.style.transform = `translate(-100%)`
            elemTwo.style.transform = `translate(-100%)`
            elemThree.style.transform = `translate(-100%)`
        } else if (lengthFromTop === scrollArea) {
            elemOne.style.transform = `translate(300%)`
            elemTwo.style.transform = `translate(300%)`
            elemThree.style.transform = `translate(300%)`
        }

    }

    // animate the second element

    else if (lengthFromTop <= (scrollArea / 3) * 2) {

        const translatePercentage = -100 + (scrollPercentage / 0.05689 - 580);


        if (translatePercentage < elemSpacingPercentage) {

            hiddenElements.forEach(elem => elem.style.display = 'none');

            elemTwo.style.transform = `translate(${translatePercentage}%)`

        } else if (translatePercentage >= elemSpacingPercentage && translatePercentage < elemSpacingPercentage + 180) {

            elemTwo.style.transform = `translate(${elemSpacing}px)`

            const staticPhase = translatePercentage - elemSpacingPercentage;
            const staticPhasePercentage = staticPhase / 180 * 100;
         
            // UPDATE HIDDEN ELEMENTS
            hiddenElements.forEach(elem => elem.style.display = 'block');

            // UPDATE HEIGHT
            handleUpdateHeight(initialHeightTwo, translatePercentage, staticPhasePercentage, elemTwo);

            // UPDATE COLORS (Background and Text)
            handleColorUpdate(staticPhasePercentage, elemTwo);

            // UPDATE ICON COLOR
            handleIconsUpdate(staticPhasePercentage, 2);

            // UPDATE BOX SHADOW
            handleShadowUpdate(staticPhasePercentage, elemTwo);

            // Fancy Button Svg Animation
            const rectangle = document.querySelector('.summary__svg rect');
            const rectangleLength = rectangle.getTotalLength(); // 665
            const html = document.querySelector(':root');
            html.style.setProperty('--length', rectangleLength);
            const updateSvg = 20 / rectangleLength; // 0.03

            let draw = rectangleLength - ((staticPhasePercentage - 60) / updateSvg);
            rectangle.style.strokeDashoffset = rectangleLength;
    

       

            // console.log(differencePercentage)

            // UPDATE FANCY BTN
            // 60% de 180 ? 108
            // 20 / rectanglelength = 0.03


            if (translatePercentage >= elemSpacingPercentage + 108) {
                if (draw >= 0) {
                    rectangle.style.strokeDashoffset = draw;
                } else {
                    rectangle.style.strokeDashoffset = 0;
                }
            }            

            // FIND A WAY MAKE THE STROKE SHOW UP CORRECTLY :-)

            
        } else {

            elemTwo.style.transform = `translate(${translatePercentage - 180}%)`

        }

        // if (scrollDirection === 'up') {
        //     elemOne.style.transform = `translate(300%)`
        //     elemThree.style.transform = `translate(-100%)`
        // } else {
        //     elemOne.style.transform = `translate(-100%)`
        //     elemThree.style.transform = `translate(300%)`
        // }

     

        // reset the elements - hidden
        if (lengthFromTop === 0) {
            elemOne.style.transform = `translate(-100%)`
            elemTwo.style.transform = `translate(-100%)`
            elemThree.style.transform = `translate(-100%)`
        } else if (lengthFromTop === scrollArea) {
            elemOne.style.transform = `translate(300%)`
            elemTwo.style.transform = `translate(300%)`
            elemThree.style.transform = `translate(300%)`
        }

    }

    // animate the third element
    else if (lengthFromTop < scrollArea) {

        const translatePercentage = -100 + (scrollPercentage / 0.05689 - 1160);


        if (translatePercentage < elemSpacingPercentage) {

            elemThree.style.transform = `translate(${translatePercentage}%)`

        } else if (translatePercentage >= elemSpacingPercentage && translatePercentage < elemSpacingPercentage + 180) {

            elemThree.style.transform = `translate(${elemSpacing}px)`

            const staticPhase = translatePercentage - elemSpacingPercentage;
            const staticPhasePercentage = staticPhase / 180 * 100;

   
            // UPDATE HEIGHT
            handleUpdateHeight(initialHeightThree, translatePercentage, staticPhasePercentage, elemThree);

            // UPDATE COLORS (Background and Text)
            handleColorUpdate(staticPhasePercentage, elemThree);

            // UPDATE IMAGE 
            handleOpacityUpdate(staticPhasePercentage, 3);

            // UPDATE ICON COLOR
            handleIconsUpdate(staticPhasePercentage, 3);

            // UPDATE BOX SHADOW
            handleShadowUpdate(staticPhasePercentage, elemThree);
            
        } else {

            elemThree.style.transform = `translate(${translatePercentage - 180}%)`

        }

        // if (scrollDirection === 'up') {
        //     elemOne.style.transform = `translate(300%)`
        //     elemTwo.style.transform = `translate(300%)`
        // } else {
        //     elemOne.style.transform = `translate(-100%)`
        //     elemTwo.style.transform = `translate(-100%)`
        // }


        // reset the elements - hidden
        if (lengthFromTop === 0) {
            elemOne.style.transform = `translate(-100%)`
            elemTwo.style.transform = `translate(-100%)`
            elemThree.style.transform = `translate(-100%)`
        } else if (lengthFromTop === scrollArea) {
            elemOne.style.transform = `translate(300%)`
            elemTwo.style.transform = `translate(300%)`
            elemThree.style.transform = `translate(300%)`
        }

    }


            // reset the elements - hidden
            if (lengthFromTop === 0) {
                elemOne.style.transform = `translate(-100%)`
                elemTwo.style.transform = `translate(-100%)`
                elemThree.style.transform = `translate(-100%)`
            } else if (lengthFromTop === scrollArea) {
                elemOne.style.transform = `translate(300%)`
                elemTwo.style.transform = `translate(300%)`
                elemThree.style.transform = `translate(300%)`
            }


})














// Take care of the behaviour of the rest of the page

window.addEventListener('scroll', () => {

    const difference = window.innerHeight - visisbleScrollBox.clientHeight;
    const bottomElemToDocTop = window.scrollY + visisbleScrollBox.getBoundingClientRect().top - difference;
    const topElemToDocTop = window.scrollY + visisbleScrollBox.getBoundingClientRect().top - 56;
    const scrollY = window.scrollY;
    const scrollDirection = FnScrollDirection(window.scrollY);

    if (scrollDirection === "down") {


        if (bottomElemToDocTop <= scrollY) {

        const maxScrollHeight = visisbleScrollBox.scrollHeight - visisbleScrollBox.clientHeight;
        const lengthFromTop = Math.ceil(visisbleScrollBox.scrollTop);

        // ALTERNATIVE WAY - SAME RESULT
        // const visibleHeight = visisbleScrollBox.clientHeight;
        // const currentScroll = visisbleScrollBox.scrollHeight - Math.ceil(visisbleScrollBox.scrollTop);

        // HELPFUL TO UNDERSTAND WHAT'S GOING ON
        // clientHeight: content + padding (no border, no margin, no horizontal scrollbar)
        // scrollHeight = content (even the hidden one) + padding (no border, no margin, no horizontal scrollbar)
        // clientHeight: 467.04px;
        // windowHeight: 667px;
        // totalScrollableHeight: 2002px / 2001.6px
        // totalScrollableHeight - clientHeight = 1534.56px
        // scrolltop: 1534.4px


            // if the animation is not 100% done disable the page scroll (forwards)
            if (maxScrollHeight !== lengthFromTop) {
                
                window.scrollTo(0, bottomElemToDocTop);

            }
    
        }

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

});









