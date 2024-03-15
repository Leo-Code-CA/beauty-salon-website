//////////////////////////// GIFTS PAGE JS ////////////////////////////

// Imports
import { suggestions } from './../contact/data.js';
// Media Queries

// HTML Elements

// Data

// Variables

function handleFindGiftOptions(maxPrice, optionsPrice) {

    const filteredOptionsPrices = optionsPrice.filter(opt => opt.price <= maxPrice);
    console.log(filteredOptionsPrices)

    const suggestions = new Set([]);

    filteredOptionsPrices.map((opt, index) => {
    //   const i = filteredOptionsPrices.indexOf(maxPrice - Math.round(opt.price), index);
    // const potentialIndex = filteredOptionsPrices[maxPrice - Math.round(opt.price)];

    const i = filteredOptionsPrices.findIndex((elem, i) => i >= index && elem.price === (maxPrice - Math.round(opt.price)));

    //   console.log(maxPrice - Math.round(opt.price))
      if (i > -1) {
        suggestions.add(opt); 
        suggestions.add(filteredOptionsPrices[i]);
      }
    });
    return [...suggestions];
  }

console.log(handleFindGiftOptions(49, suggestions));