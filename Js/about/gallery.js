//////////////////////////// IMAGE GALLERY SECTION OF THE ABOUT PAGE ////////////////////////////

// Imports
import { images } from './data.js';
// Media Queries

// HTML Elements

// Data

// Variables

function createImgElem(column, src, alt) {

    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    img.classList.add('gallery__img');
    column.appendChild(img);

}

function createImgLayout() {

    const totalImg = images.length; // 15
    const imgPerColumn = Math.round(totalImg / 4); // 4
    let currentLimit = imgPerColumn; 
    let currentColumn = 1;

    for (let i = 0; i < totalImg; i++) {
    
        // console.log(i, currentLimit, currentColumn)
        if (i === currentLimit) {
            console.log(i, currentLimit, currentColumn)
            currentLimit += imgPerColumn;
            currentColumn++; 
        }

        const currentlyFilling = document.querySelector(`.gallery__column:nth-child(${currentColumn})`);
        createImgElem(currentlyFilling, images[i].src, images[i].alt)
    }
}

createImgLayout();
