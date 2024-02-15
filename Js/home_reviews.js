//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

// Media Queries

// HTML Elements
const visisbleScrollBox = document.querySelector('.summary__animationBox');
const fullScrollBox = document.querySelector('.summary');
const elemOne = document.querySelector('.summary__box:nth-child(1)');
const elemTwo = document.querySelector('.summary__box:nth-child(2)');
const elemThree = document.querySelector('.summary__box:nth-child(3)');
const html = document.querySelector(':root');
// Data

// Variables
let initialHeightOne, initialHeightTwo, initialHeightThree;
let scrollDirection;
let lastScroll = 0;
const goalHeight = window.innerHeight / 100 * 70;

// Get inital height of the three boxes
window.addEventListener("load", () => {
    initialHeightOne = elemOne.clientHeight;
    initialHeightTwo = elemTwo.clientHeight;
    initialHeightThree = elemThree.clientHeight;

    const top = ((window.innerHeight - 56) - goalHeight) / 2;
    html.style.setProperty('--top', `${top}px`);
});


// One screen - scroll bound animation into its container
visisbleScrollBox.addEventListener('scroll', () => {

    const visibleBoxHeight = visisbleScrollBox.clientHeight;
    const fullBoxHeight = visisbleScrollBox.scrollHeight;
    const lengthFromTop = visisbleScrollBox.scrollTop;
    const scrollArea = fullBoxHeight - visibleBoxHeight;
    const scrollPercentage = Math.ceil(lengthFromTop) / (fullBoxHeight - visibleBoxHeight) * 100;

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

    // check scroll direction
    let currentScroll = window.scrollY;

    if (currentScroll > 0 && currentScroll >= lastScroll) {
        scrollDirection = "down";
        lastScroll = currentScroll;
    } else {
        scrollDirection = "up";
        lastScroll = currentScroll;
    }

    const width = elemOne.getBoundingClientRect().width;
    const windowWidth = window.innerWidth;
    const widthDifference = Math.round((windowWidth - width) / 2);
    const widthDifferencePercentage = windowWidth / widthDifference;


    // animate the first element
    if (lengthFromTop <= (scrollArea / 3)) {

        // 580 (400 + 180 of "pause") / 33 = 0.05689
        const translatePercentage = -100 + (scrollPercentage / 0.05689); // max is 300 (from -100 to 300)

        if (translatePercentage < widthDifferencePercentage) {

            elemOne.style.transform = `translate(${translatePercentage}%)`
   

        } else if (translatePercentage >= widthDifferencePercentage && translatePercentage < widthDifferencePercentage + 180) {

            console.log("Don't move!")

            // GOAL
            // change: height, color, image, box shadow

            const difference = translatePercentage - widthDifferencePercentage;
            const differencePercentage = difference / 180 * 100;
            // NEW GOAL HEIGHT
            // const goalHeight = window.innerHeight / 100 * 70;
            // const differenceHeight = goalHeight - 200; // 267
            
            
            // UPDATE HEIGHT
            // 70% de 180 ? 126
            // 70 / 267 = 0.341

            if (translatePercentage <= widthDifferencePercentage + 126) {
                const updatedHeight = differencePercentage / 0.262 + initialHeightOne;
                elemOne.style.height = `${updatedHeight}px`;
            }

            // UPDATE BACKGROUND COLOR
            const colorPalette = ['#EEAAD7', '#E69DCE', '#DF90C4', '#D784BB', '#CF77B2', '#C86AA9', '#C05D9F', '#B95096', '#B1438D', '#A93784', '#A22A7A', '#9A1D71'];

            const updatedColor = Math.round(differencePercentage / 9);
            elemOne.style.backgroundColor = colorPalette[updatedColor];
            
            // UPDATE IMAGE 
           
            const updatedOpacity = differencePercentage / 142.857; // 100 / 0.7
            const img = document.querySelector('.summary__box:nth-child(1) .summary__img');
            img.style.display = 'block';

            img.style.opacity = updatedOpacity;

            // UPDATE ICON / TEXT COLOR
            const colorPalette2 = ['#000000', '#171717', '#2E2E2E', '#464646', '#5D5D5D', '#747474', '#8B8B8B', '#A2A2A2', '#B9B9B9', '#D1D1D1', '#E8E8E8', '#FFFFFF'];
            elemOne.style.color = colorPalette2[updatedColor] 

            const filters = [
                [0, 100, 0, 209, 99, 105], 
                [0, 23, 4874, 25, 94, 82],
                [9, 1, 325, 314, 93, 78],
                [25, 15, 28, 314, 86, 82],
                [39, 0, 2240, 204, 85, 81],
                [49, 1, 0, 338, 91, 83],
                [55, 7, 0, 174, 98, 98],
                [65, 0, 62, 142, 99, 95],
                [75, 0, 92, 144, 93, 115],
                [100, 0, 5427, 231, 110, 64],
                [100, 2,  601, 203, 115, 82],
                [100, 0, 7487, 213, 101, 107]
            ]

            const icons = document.querySelector('.summary__box:nth-child(1) .summary__icon');

            const current = filters[Math.round(differencePercentage / 9)];
            const newFilter = `invert(${current[0]}%) sepia(${current[1]}%) saturate(${current[2]}%) hue-rotate(${current[3]}deg) brightness(${current[4]}%) contrast(${current[5]}%)`

            icons.style.filter = newFilter;

            // UPDATE BOX SHADOW
            const boxSideUpdate = differencePercentage / 16.6;
            const boxBottomUpdate = differencePercentage / 8.33;
            const boxBlurUpdate = differencePercentage / 3.84;

            const updatedBoxShadow = `${boxSideUpdate}px ${boxBottomUpdate}px ${boxBlurUpdate}px rgba(47, 45, 45, 0.6), -${boxSideUpdate}px ${boxBottomUpdate}px ${boxBlurUpdate}px rgba(47, 45, 45, 0.6)`

            elemOne.style.boxShadow = updatedBoxShadow;

            
        } else {

            elemOne.style.transform = `translate(${translatePercentage - 180}%)`

        }

        if (scrollDirection === 'down') {
            elemTwo.style.transform = `translate(-100%)`
            elemThree.style.transform = `translate(-100%)`
        } else {
            elemTwo.style.transform = `translate(300%)`
            elemThree.style.transform = `translate(300%)`
        }


    }

    // animate the second element

    else if (lengthFromTop <= (scrollArea / 3) * 2) {

        const translatePercentage = -100 + (scrollPercentage / 0.05689 - 580);


        if (translatePercentage < widthDifferencePercentage) {

            elemTwo.style.transform = `translate(${translatePercentage}%)`

        } else if (translatePercentage >= widthDifferencePercentage && translatePercentage < widthDifferencePercentage + 180) {

            console.log("Don't move!")
         
            // UPDATE HIDDEN ELEMENTS
            const hiddenElements = document.querySelectorAll('.summary__hidden');
            hiddenElements.forEach(elem => elem.style.display = 'block');


            const difference = translatePercentage - widthDifferencePercentage;
            const differencePercentage = difference / 180 * 100;
            const goalHeight = window.innerHeight / 100 * 60;

            if (translatePercentage <= widthDifferencePercentage + 126) {
                const updatedHeight = differencePercentage / 0.262 + initialHeightTwo;
                elemTwo.style.height = `${updatedHeight}px`;
            }

            // UPDATE BACKGROUND COLOR
            const colorPalette = ['#EEAAD7', '#E69DCE', '#DF90C4', '#D784BB', '#CF77B2', '#C86AA9', '#C05D9F', '#B95096', '#B1438D', '#A93784', '#A22A7A', '#9A1D71'];

            const updatedColor = Math.round(differencePercentage / 9);
            elemTwo.style.backgroundColor = colorPalette[updatedColor];

            // UPDATE ICON / TEXT COLOR
            const colorPalette2 = ['#000000', '#171717', '#2E2E2E', '#464646', '#5D5D5D', '#747474', '#8B8B8B', '#A2A2A2', '#B9B9B9', '#D1D1D1', '#E8E8E8', '#FFFFFF'];
            elemTwo.style.color = colorPalette2[updatedColor] 

            const filters = [
                [0, 100, 0, 209, 99, 105], 
                [0, 23, 4874, 25, 94, 82],
                [9, 1, 325, 314, 93, 78],
                [25, 15, 28, 314, 86, 82],
                [39, 0, 2240, 204, 85, 81],
                [49, 1, 0, 338, 91, 83],
                [55, 7, 0, 174, 98, 98],
                [65, 0, 62, 142, 99, 95],
                [75, 0, 92, 144, 93, 115],
                [100, 0, 5427, 231, 110, 64],
                [100, 2,  601, 203, 115, 82],
                [100, 0, 7487, 213, 101, 107]
            ]

            const icons = document.querySelector('.summary__box:nth-child(2) .summary__icon');

            const current = filters[Math.round(differencePercentage / 9)];
            const newFilter = `invert(${current[0]}%) sepia(${current[1]}%) saturate(${current[2]}%) hue-rotate(${current[3]}deg) brightness(${current[4]}%) contrast(${current[5]}%)`

            icons.style.filter = newFilter;

            // UPDATE BOX SHADOW
            const boxSideUpdate = differencePercentage / 16.6;
            const boxBottomUpdate = differencePercentage / 8.33;
            const boxBlurUpdate = differencePercentage / 3.84;

            const updatedBoxShadow = `${boxSideUpdate}px ${boxBottomUpdate}px ${boxBlurUpdate}px rgba(47, 45, 45, 0.6), -${boxSideUpdate}px ${boxBottomUpdate}px ${boxBlurUpdate}px rgba(47, 45, 45, 0.6)`

            elemTwo.style.boxShadow = updatedBoxShadow;

            // Fancy Button Svg Animation
            const rectangle = document.querySelector('.summary__svg rect');
            const rectangleLength = rectangle.getTotalLength(); // 665
            const html = document.querySelector(':root');
            html.style.setProperty('--length', rectangleLength);
            const updateSvg = 20 / rectangleLength; // 0.03

            let draw = rectangleLength - ((differencePercentage - 60) / updateSvg);
            rectangle.style.strokeDashoffset = rectangleLength;
    

       

            // console.log(differencePercentage)

            // UPDATE FANCY BTN
            // 60% de 180 ? 108
            // 20 / rectanglelength = 0.03


            if (translatePercentage >= widthDifferencePercentage + 108) {
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

        if (scrollDirection === 'down') {
            elemOne.style.transform = `translate(300%)`
            elemThree.style.transform = `translate(-100%)`
        } else {
            elemOne.style.transform = `translate(-100%)`
            elemThree.style.transform = `translate(300%)`
        }

    }

    // animate the third element
    else if (lengthFromTop < scrollArea) {

        const translatePercentage = -100 + (scrollPercentage / 0.05689 - 1160);


        if (translatePercentage < widthDifferencePercentage) {

            elemThree.style.transform = `translate(${translatePercentage}%)`

        } else if (translatePercentage >= widthDifferencePercentage && translatePercentage < widthDifferencePercentage + 180) {

            console.log("Don't move!")
            
            const difference = translatePercentage - widthDifferencePercentage;
            const differencePercentage = difference / 180 * 100;
            // const goalHeight = window.innerHeight / 100 * 60;

            if (translatePercentage <= widthDifferencePercentage + 126) {
                const updatedHeight = differencePercentage / 0.262 + initialHeightThree;
                elemThree.style.height = `${updatedHeight}px`;
            }

            // UPDATE BACKGROUND COLOR
            const colorPalette = ['#EEAAD7', '#E69DCE', '#DF90C4', '#D784BB', '#CF77B2', '#C86AA9', '#C05D9F', '#B95096', '#B1438D', '#A93784', '#A22A7A', '#9A1D71'];

            const updatedColor = Math.round(differencePercentage / 9);
            elemThree.style.backgroundColor = colorPalette[updatedColor];

            // UPDATE IMAGE 

            const updatedOpacity = differencePercentage / 142.857;
            const img = document.querySelector('.summary__box:nth-child(3) .summary__img');
            img.style.display = 'block';
            img.style.opacity = updatedOpacity;

            // UPDATE ICON / TEXT COLOR
            const colorPalette2 = ['#000000', '#171717', '#2E2E2E', '#464646', '#5D5D5D', '#747474', '#8B8B8B', '#A2A2A2', '#B9B9B9', '#D1D1D1', '#E8E8E8', '#FFFFFF'];
            elemThree.style.color = colorPalette2[updatedColor] 

            const filters = [
                [0, 100, 0, 209, 99, 105], 
                [0, 23, 4874, 25, 94, 82],
                [9, 1, 325, 314, 93, 78],
                [25, 15, 28, 314, 86, 82],
                [39, 0, 2240, 204, 85, 81],
                [49, 1, 0, 338, 91, 83],
                [55, 7, 0, 174, 98, 98],
                [65, 0, 62, 142, 99, 95],
                [75, 0, 92, 144, 93, 115],
                [100, 0, 5427, 231, 110, 64],
                [100, 2,  601, 203, 115, 82],
                [100, 0, 7487, 213, 101, 107]
            ]

            const icons = document.querySelector('.summary__box:nth-child(3) .summary__icon');

            const current = filters[Math.round(differencePercentage / 9)];
            const newFilter = `invert(${current[0]}%) sepia(${current[1]}%) saturate(${current[2]}%) hue-rotate(${current[3]}deg) brightness(${current[4]}%) contrast(${current[5]}%)`

            icons.style.filter = newFilter;

            // UPDATE BOX SHADOW
            const boxSideUpdate = differencePercentage / 16.6;
            const boxBottomUpdate = differencePercentage / 8.33;
            const boxBlurUpdate = differencePercentage / 3.84;

            const updatedBoxShadow = `${boxSideUpdate}px ${boxBottomUpdate}px ${boxBlurUpdate}px rgba(47, 45, 45, 0.6), -${boxSideUpdate}px ${boxBottomUpdate}px ${boxBlurUpdate}px rgba(47, 45, 45, 0.6)`

            elemThree.style.boxShadow = updatedBoxShadow;
            
        } else {

            elemThree.style.transform = `translate(${translatePercentage - 180}%)`

        }

        if (scrollDirection === 'down') {
            elemOne.style.transform = `translate(300%)`
            elemTwo.style.transform = `translate(300%)`
        } else {
            elemOne.style.transform = `translate(-100%)`
            elemTwo.style.transform = `translate(-100%)`
        }
  

    }

})














// Take care of the behaviour of the rest of the page

window.addEventListener('scroll', () => {

    const difference = window.innerHeight - visisbleScrollBox.clientHeight;
    const bottomElemToDocTop = window.scrollY + visisbleScrollBox.getBoundingClientRect().top - difference;
    const topElemToDocTop = window.scrollY + visisbleScrollBox.getBoundingClientRect().top - 56;
    const scrollY = window.scrollY;

    // check the scroll direction

    let currentScroll = window.scrollY;

    if (currentScroll > 0 && currentScroll >= lastScroll) {
        scrollDirection = "down";
        lastScroll = currentScroll;
    } else {
        scrollDirection = "up";
        lastScroll = currentScroll;
    }

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



// TEST: LET SOME TIME TO MODIFY THE ELEMENT
// 0.0825 x 400 = 33 comes from 33 / 400 = 0.0825
// take percentage and divide it by 0.0825
// instead of 33% for each, just give 25%
// 25 / 400 = 0.0625
// 33% was 33% of the total scrollArea = 2201 / 3.3 = 666.9 (for each elem)
// 25% is 25% of the total scrollArea = 2201 / 4 = 550.25 (for each elem)
// AND ALSO 25% left for immobile element 
// 25% / 3 so 550.25 / 3 = 183.42



// ANOTHER WORKING WAY:
// elemOne.style.transform = `translate(-100%) translate(${fastScroll}%)`
// elemOne.style.transform = `translate(-100%) translate(300%)`;
// elemTwo.style.transform = `translate(-100%) translate(${fastScroll - 300}%)`;
// elemTwo.style.transform = `translate(-100%) translate(300%)`;
// elemThree.style.transform = `translate(-100%) translate(${fastScroll - 600}%)`;

// increase the speed of the scroll bound animation so one element don't take all the scroll height available
// const fastScroll = ((scrollPercentage) * 9);


// ANOTHER TEST: 
// const elemScrollPercentage = Math.ceil(lengthFromTop) / ((fullBoxHeight / 3) - (visibleBoxHeight / 3)) * 100;


// let scrollDirection;
// let lastScroll = 0;

// window.addEventListener('scroll', function() {

//     let currentScroll = window.scrollY;

//     if (currentScroll > 0 && currentScroll >= lastScroll) {
//         scrollDirection = "down";
//         lastScroll = currentScroll;
//     } else {
//         scrollDirection = "up";
//         lastScroll = currentScroll;
//     }

// })

// const summary = document.querySelector('.summary__box:nth-child(1)');
// const carouselSection = document.querySelector(".carousel__section");

// const options = {
//     root: null,
//     threshold: 1
// }

// function handleObserve(entries, observer) {

//     entries.forEach(entry => {

//         if (entry.isIntersecting) {
//             entry.target.classList.add("summary__box--highlight");
//             entry.target.scrollIntoView(false);
//         } 

//         // else {
//         //     entry.target.classList.remove("summary__box--highlight");
//         // }
        

//     })

// }

// const observer = new IntersectionObserver(handleObserve, options);
// observer.observe(summary);









