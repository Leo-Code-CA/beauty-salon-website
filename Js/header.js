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

const compliment = ["patience", "bienveillance", "sérieux", "douceur", "gentillesse", "attention", "soin", "serviabilité", "respect", "considération", "politesse", "sérénité", "tendresse", "calme", "humanité", "finesse", "délicatesse", "amabilité", "tranquillité", "le sourire", "harmonie", "assurance", "professionnalisme"];


async function titleAnimation() {

    let count = 0;

    while (count < compliment.length) {

        let word = new Promise((resolve) => {
            setTimeout(() => resolve(compliment[count]), 3000)
        })
    
        cutout.innerHTML = await word;
        handleFontSize();
        count++
        console.log(count);

    }

}

titleAnimation();

function handleFontSize() {

    let cutoutWidth = cutout.clientWidth;
    let cutoutBoxWidth = cutoutBox.clientWidth;
    const currentFontSize = 48;
    let nextFontSize = currentFontSize;

    // while (cutoutWidth > cutoutBoxWidth) {
    //     cutoutWidth = cutout.clientWidth;
    //     cutoutBoxWidth = cutoutBox.clientWidth;
    //     nextFontSize -= 10;
    //     cutout.style.fontSize = `${nextFontSize}px`;
    //     console.log(nextFontSize);
    // }

    while (cutoutWidth > cutoutBoxWidth) {
        cutoutWidth = cutout.clientWidth;
        cutoutBoxWidth = cutoutBox.clientWidth;
        nextFontSize -= 1;
        cutout.style.fontSize = `${nextFontSize}px`;
        console.log(nextFontSize);
    }

}
