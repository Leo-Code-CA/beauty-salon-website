//////////////////////////// IMAGE GALLERY SECTION OF THE ABOUT PAGE ////////////////////////////

// Imports
import { images } from './data.js';
// Media Queries

// HTML Elements
const imgContainer = document.querySelector('.gallery__imgContainer');
const filterBtn = document.querySelectorAll('.gallery__filter');
// Data

// Variables

// create the img elements
function createImgElem(column, src, alt) {

    const imgWrapper = document.createElement('span');
    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    imgWrapper.appendChild(img);
    column.appendChild(imgWrapper);
    img.addEventListener('click', (e) => handleImgZoom(e));

}

// Create the actual gallery layout columns
function createImgLayout(col, imgCollection) {

    // cleanup by removing the current html if any
    if (imgContainer.innerHTML) {
        while (imgContainer.firstChild) {
            imgContainer.removeChild(imgContainer.firstChild);
        }
    }

    // create the number of columns needed
    let i = 0;
    let totalColumns = [];

    while (i < col) {
        const newColumn = document.createElement('div');
        newColumn.classList.add('gallery__column');
        imgContainer.appendChild(newColumn);
        totalColumns.push(newColumn);
        i++;
    }

    const totalImg = imgCollection.length; 
    let currentColumn = 0;

    for (let i = 0; i < totalImg; i++) {

        currentColumn++;

        if (currentColumn === totalColumns.length || i === 0) {
            currentColumn = 0;
        }

        createImgElem(totalColumns[currentColumn], imgCollection[i].src, imgCollection[i].alt)
    }

}

// Choose the numbers of columns for the gallery layout depending on the viewport width
function handleWindowSize(imgCollection) {

    const vw = window.innerWidth;

    return vw <= 768 ? createImgLayout(2, imgCollection)
    : vw <= 1200 ? createImgLayout(3, imgCollection)
    : vw > 1200 ? createImgLayout(4, imgCollection)
    : new Error("vw mush be a number and must be defined");

}

window.addEventListener('load', () => handleWindowSize(images));
window.addEventListener('resize', () => handleWindowSize(images));

// Handle gallery filtering 
function handleGalleryFilter(filter) {

    switch (filter) {
        case "all":
            handleWindowSize(images);
            break;
        case "lobby":
            handleWindowSize(images.filter(img => img.type === "lobby"));
            break;
        case "massage":
            handleWindowSize(images.filter(img => img.type === "massage"));
            break;
        case "products":
            handleWindowSize(images.filter(img => img.type === "products"));
            break;
        default:
            throw new Error('filter not reconized!')
    }


}

filterBtn.forEach(btn => btn.addEventListener('click', (e) => handleGalleryFilter(e.target.id)));

// Handle img zoom and background change on click
function handleImgZoom(e) {

    const selectedImg = e.target;
    const selectedImgBox = selectedImg.parentElement;

    selectedImg.classList.add('gallery--imgPopup');
    selectedImgBox.classList.add('gallery--bgPopup');
    selectedImgBox.addEventListener('click', (e) => {

        if (e.target === selectedImgBox) {
            selectedImg.classList.remove('gallery--imgPopup');
            selectedImgBox.classList.remove('gallery--bgPopup');
        }
    })

};



