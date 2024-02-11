//////////////////////////// BENEFITS SECTION OF THE HOME PAGE ////////////////////////////

// Media Queries

// HTML Elements

// Data

// Variables

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










const visisbleScrollBox = document.querySelector('.summary__animationBox');
const fullScrollBox = document.querySelector('.summary');

const elemOne = document.querySelector('.summary__box:nth-child(1)')
const elemTwo = document.querySelector('.summary__box:nth-child(2)')
const elemThree = document.querySelector('.summary__box:nth-child(3)')

let scrollDirection;
let lastScroll = 0;

// One screen - scroll bound animation into its container

visisbleScrollBox.addEventListener('scroll', () => {

    const visibleBoxHeight = visisbleScrollBox.clientHeight;
    const fullBoxHeight = visisbleScrollBox.scrollHeight;
    const lengthFromTop = visisbleScrollBox.scrollTop;
    const scrollArea = fullBoxHeight - visibleBoxHeight;
    const scrollPercentage = Math.ceil(lengthFromTop) / (fullBoxHeight - visibleBoxHeight) * 100;

    // increase the speed of the scroll bound animation so one element don't take all the scroll height available
    const fastScroll = ((scrollPercentage) * 9);

    // TEST
    const elemScrollPercentage = Math.ceil(lengthFromTop) / ((fullBoxHeight / 3) - (visibleBoxHeight / 3)) * 100;
    // console.log(elemScrollPercentage)



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

    // TEST: LET SOME TIME TO MODIFY THE ELEMENT
    // instead of 33% for each, just give 25%
    // 25 / 400 = 0.0625
    // 33% was 33% of the total scrollArea = 2201 / 3.3 = 666.9 (for each elem)
    // 25% is 25% of the total scrollArea = 2201 / 4 = 550.25 (for each elem)
    // AND ALSO 25% left for immobile element 
    // 25% / 3 so 550.25 / 3 = 183.42

    // animate the first element
    if (lengthFromTop <= (scrollArea / 3)) {

        // elemOne.style.transform = `translate(-100%) translate(${fastScroll}%)`
        // console.log(-100 + fastScroll)

        // TEST
        // 0.0825 x 400 = 33 comes from 33 / 400 = 0.0825
        // take percentage and divide it by 0.0825
        const translatePercentage = -100 + (scrollPercentage / 0.0825);


        const width = elemOne.getBoundingClientRect().width;
        const left = Math.round(elemOne.getBoundingClientRect().left);
        const windowWidth = window.innerWidth;
        const widthDifference = Math.round((windowWidth - width) / 2);
        const widthDifferencePercentage = windowWidth / widthDifference;

        // console.log(widthDifferencePercentage)
        // console.log(translatePercentage)


        
        if (translatePercentage < widthDifferencePercentage) {

            elemOne.style.transform = `translate(${translatePercentage}%)`

        } else if (translatePercentage >= widthDifferencePercentage && translatePercentage < widthDifferencePercentage + 180) {

            console.log(translatePercentage)
            
        } else {

            console.log("after")
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

        // elemOne.style.transform = `translate(-100%) translate(300%)`;
        // elemTwo.style.transform = `translate(-100%) translate(${fastScroll - 300}%)`;

        const translatePercentage = -100 + (scrollPercentage / 0.0825 - 400);
        elemTwo.style.transform = `translate(${translatePercentage}%)`

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

        // elemTwo.style.transform = `translate(-100%) translate(300%)`;
        // elemThree.style.transform = `translate(-100%) translate(${fastScroll - 600}%)`;

        const translatePercentage = -100 + (scrollPercentage / 0.0825 - 800);
        elemThree.style.transform = `translate(${translatePercentage}%)`

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





