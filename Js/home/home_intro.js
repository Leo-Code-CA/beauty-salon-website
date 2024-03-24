//////////////////////////// INTRO SECTION OF THE HOME PAGE ////////////////////////////

// Media Queries
const mqLarge = window.matchMedia('(max-width: 992px)');
const mqLandscape = window.matchMedia('(orientation: landscape)');
// HTML Elements
const introSection = document.querySelector('#intro');
const topTitle = document.querySelector('.intro__animatedTitle span');
const cutout = document.querySelector(".cutout");
const cutoutBox = document.querySelector("#cutoutbox");
const videoContainer = document.querySelector('.intro__containers--video');
const introVideo = document.querySelector('video');
const targetVideo = document.querySelector(".intro__containers video");
// Data
const compliment = ["patience", "sérieux", "douceur", "gentillesse", "attention", "serviabilité", "respect", "considération", "politesse", "tendresse", "finesse", "délicatesse", "amabilité", "harmonie", "assurance", "professionnalisme", "sympathie", "tolérance", "cordialité", "générosité", "prévenance", "bienveillance"];
// Variables
let setAnimation = true;


// Handle video lazy loading
const videoObserver = new IntersectionObserver(entries => {
    entries.map(entry => entry.isIntersecting ? targetVideo.play() : targetVideo.pause());
})

videoObserver.observe(targetVideo);

// Handle video source
function handleVideoSource() {

    const videoContainerHeight = videoContainer.offsetHeight;
    const videoContainerWidth = videoContainer.offsetWidth;

    videoContainerHeight > videoContainerWidth ? 
    introVideo.setAttribute('src', '/videos/IFY_portrait_video.mp4')
    : introVideo.setAttribute('src', '/videos/IFY-Video.mov');

}

handleVideoSource();
mqLandscape.addEventListener("change", handleVideoSource);

// Handle delay between words in the animation
function delay(sec, count) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(compliment[count])
        }, sec)
    })
}

// Handle font size adjustment depending of the length of the word
function handleFontSize(element, container) {

    let elementWidth = element.clientWidth;
    let containerWidth = container.clientWidth;
    const currentFontSize = Number(window.getComputedStyle(element).fontSize.replaceAll(/p|x/g, ""));
    let nextFontSize = currentFontSize;

    if (elementWidth > containerWidth) {

        while (elementWidth > containerWidth) {
            elementWidth = element.clientWidth;
            containerWidth = container.clientWidth;
            nextFontSize -= 0.1;
            element.style.fontSize = `${nextFontSize}px`;
        }
    } else {

        while (elementWidth < containerWidth) {
            elementWidth = element.clientWidth;
            containerWidth = container.clientWidth;
            nextFontSize += 0.1;
            element.style.fontSize = `${nextFontSize}px`;
        }
    }
}

// Handle text animation
async function textAnimation() {

    let count = 0;
    let sec = 0;

    while (count <= compliment.length) {

        if (!setAnimation) break;

        if (count === compliment.length) {
            count = 0;
            sec = 2300;
        }

        handleFontSize(cutout, cutoutBox);
        handleFontSize(topTitle, cutoutBox);

        cutout.textContent = await delay(sec, count);
        
        count++;
        sec === 0 ? sec = 2300
        : sec < 400 ? sec = 400
        : sec < 1000 ? sec -= 100
        : sec < 2000 ? sec -= 250
        : sec < 3000 ? sec -= 300
        : sec -= 100;
    }

}

window.addEventListener("load", () => {
    mqLandscape.matches ? setAnimation = false : setAnimation = true;
    textAnimation();
})

mqLandscape.addEventListener("change", () => {
    mqLandscape.matches ? setAnimation = false : setAnimation = true;
    textAnimation();
});