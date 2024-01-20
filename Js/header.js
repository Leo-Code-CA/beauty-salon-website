 // Focus state function - DESIGN
 const focusState = (firstElemID, secondElemID, className) => {

    const focusedElem = document.getElementById(firstElemID);
    const switchClassElem = document.getElementById(secondElemID);
   
    focusedElem.onfocus = () => switchClassElem.classList.add(className);
   
    focusedElem.onblur = () => switchClassElem.classList.remove(className);
    }

// Set the dimensions (height and margin) of the intro section

const mqLarge  = window.matchMedia('(min-width: 992px)');
mqLarge.addEventListener('change', handleMainDimensions);

function handleMainDimensions(e) {

    const navHeight = document.getElementById('nav').offsetHeight;
    const introSection = document.getElementById('intro');

    introSection.style.marginTop = navHeight + "px";

    e.matches ? introSection.style.height = `calc(100vh - ${navHeight}px)` : 'auto';

}

// Fetch the header, display it and call focus state and handle margin functions

function handleFetchHeader() {

    fetch("header.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById('nav').innerHTML = data;
        })
        .then(() => {
            focusState('searchInput', 'searchGroup', 'navbar__input-group--focus');
        })
        .then(() => handleMainDimensions(mqLarge));

}

handleFetchHeader();

// MOBILE AND TABLET INTRO ANIMATION

const cutout = document.querySelector(".cutout");
const cutoutBox = document.querySelector("#cutoutbox");

const compliment = ["patience", "sérieux", "douceur", "gentillesse", "attention", "serviabilité", "respect", "considération", "politesse", "tendresse", "finesse", "délicatesse", "amabilité", "harmonie", "assurance", "professionnalisme", "sympathie", "tolérance", "cordialité", "générosité", "prévenance", "bienveillance"];

// total 19 000ms
// total 20 words

function delay(sec, count) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(compliment[count])
        }, sec)
    })
}

async function textAnimation() {

    let count = 0;
    let sec = 0;

    while (count <= compliment.length) {

        if (count === compliment.length) {
            count = 0;
            sec = 2500;
        }

        cutout.textContent = await delay(sec, count);
        handleFontSize();
        count++;
        sec === 0 ? sec = 2500
        : sec < 400 ? sec = 400
        : sec < 1000 ? sec -= 100
        : sec < 2000 ? sec -= 250
        : sec < 3000 ? sec -= 300
        : sec -= 100;
    }
}

textAnimation();


// async function titleAnimation() {

//     let count = 0;

//     while (count < compliment.length) {

//         let word = new Promise((resolve) => {
//             setTimeout(() => resolve(compliment[count]), 3000)
//         })
    
//         cutout.innerHTML = await word;
//         handleFontSize();
//         count++
//     }

// }

// titleAnimation();

function handleFontSize() {

    let cutoutWidth = cutout.clientWidth;
    let cutoutBoxWidth = cutoutBox.clientWidth;
    const currentFontSize = Number(window.getComputedStyle(cutout).fontSize.replaceAll(/p|x/g, ""));
    let nextFontSize = currentFontSize;

    if (cutoutWidth > cutoutBoxWidth) {

        while (cutoutWidth > cutoutBoxWidth) {
            cutoutWidth = cutout.clientWidth;
            cutoutBoxWidth = cutoutBox.clientWidth;
            nextFontSize -= 1;
            cutout.style.fontSize = `${nextFontSize}px`;
        }

    } else {

        while (cutoutWidth < cutoutBoxWidth) {
            cutoutWidth = cutout.clientWidth;
            cutoutBoxWidth = cutoutBox.clientWidth;
            nextFontSize += 1;
            cutout.style.fontSize = `${nextFontSize}px`;
        }

    }


}
