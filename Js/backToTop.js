//////////////////////////// FOOTER ////////////////////////////

// Imports

// HTML Elements
const backToTopBtn = document.querySelector('.scrollTop');

///////// START OF THE JS ////////
function handleDetectBgColor() {
    if (backToTopBtn) {
        const currentBtnColor = getComputedStyle(backToTopBtn).backgroundColor.match(/\d+/g);
        const currentBtnPositionX = backToTopBtn.getBoundingClientRect().x;
        const currentBtnPositionY = backToTopBtn.getBoundingClientRect().y;
        
        if (currentBtnColor && currentBtnPositionX && currentBtnPositionY) {

            const backgroundElems = document.elementsFromPoint(currentBtnPositionX, currentBtnPositionY);

            let bgColor;

            for (let i = 0; i < backgroundElems.length; i++) {

                let differentThanZero = false;
                const [r, g, b] = getComputedStyle(backgroundElems[i]).backgroundColor.match(/\d+/g);

                [r, g, b].map(colorCompo => {
                    if (colorCompo != 0) {
                        differentThanZero = true;
                    }
                })

                if (differentThanZero) {
                    bgColor = [r, g, b];
                    break;
                }
            }

            // if a bg color has been found
            if (bgColor) {

                const currentBtnColorLum = handleColorLuminance(currentBtnColor[0], currentBtnColor[1], currentBtnColor[2]);
                const bgColorLum = handleColorLuminance(bgColor[0], bgColor[1], bgColor[2]);

                const contrastNum = handleCheckContrastRatio(currentBtnColorLum, bgColorLum);
                

                console.log(currentBtnColor, bgColor)
                console.log(contrastNum)
                return contrastNum

            }
        }
    }
}

// handle check luminance of a color (math formula found online)
function handleColorLuminance(r, g, b) {
    const [lumR, lumG, lumB] = [r, g, b].map(colorComponent => {
        const proportion = colorComponent / 255;
        return proportion <= 0.03928
            ? proportion / 12.92
            : Math.pow((proportion + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * lumR + 0.7152 * lumG + 0.0722 * lumB;
}

// handle check contrast ratio
function handleCheckContrastRatio(lumOne, lumTwo) {
    let lighterLum = Math.max(lumOne, lumTwo);
    let darkerLum = Math.min(lumOne, lumTwo);
    return (lighterLum + 0.05) / (darkerLum + 0.05);
}


// Call the function and add the event handlers on load of the page
window.addEventListener('load', () => {
    handleDetectBgColor();
});


