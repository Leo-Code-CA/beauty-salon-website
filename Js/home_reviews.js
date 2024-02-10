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

    // animate the first element
    if (lengthFromTop <= (scrollArea / 3)) {

        elemOne.style.transform = `translate(-100%) translate(${fastScroll}%)`

        const initialTop = 0;
        let currentTop = (lengthFromTop - initialTop) * (scrollArea / 3);

        console.log(currentTop);
        console.log(fastScroll)

    }

    // animate the second element
    else if (lengthFromTop <= (scrollArea / 3) * 2) {

        elemOne.style.transform = `translate(-100%) translate(300%)`;
        elemTwo.style.transform = `translate(-100%) translate(${fastScroll - 300}%)`;

        const initialTop = (scrollArea / 3); 
        console.log(initialTop)
        console.log(lengthFromTop)
        console.log(scrollArea / 3)
        let currentTop = (lengthFromTop - initialTop) * (7.34);

        console.log(currentTop);
        // console.log(fastScroll)
        // console.log(scrollPercentage)
        // console.log(scrollPercentage * (10 / 3))

    }

    // animate the third element
    else if (lengthFromTop < scrollArea) {

        elemTwo.style.transform = `translate(-100%) translate(300%)`;
        elemThree.style.transform = `translate(-100%) translate(${fastScroll - 600}%)`;

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
        //clientHeight: content + padding (no border, no margin, no horizontal scrollbar)
        //scrollHeight = content + padding (no border, no margin, no horizontal scrollbar)
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





