//////////////////////////// GIFTS SIMULATOR ////////////////////////////

// Imports
import { suggestions } from '../contact/data.js';
// Media Queries

// HTML Elements
const simulatorForm = document.querySelector('.giftpage__simulatorForm');
const simulatorSelect = document.querySelector('.giftpage__simulatorSelect');
const simulatorInput = document.querySelector('.giftpage__simulatorInput');
const simulationResultWrapper = document.querySelector('.giftpage__simulatorResults');
const hr = document.querySelector('hr');
const simulatorAmount = document.querySelector('.giftpage__simulatorAmount');
const simulatorResultBest = document.querySelector('.giftpage__simulatorResultsBest');
const simulatorResultCombo = document.querySelectorAll('.giftpage__simulatorResultsCombo div div');
// Data

// Variables

// Handle gift suggestions
function handleGiftSuggestions(maxPrice, optionsPrice) {
    let maxAmount = maxPrice;
    // remove all the services that are more expensive than the gift total amount
    const filteredOptionsPrices = optionsPrice.filter(opt => opt.price <= maxPrice);
    // find out what is the most expensive service the person could get for that amount
    const mostExpensiveOpt = filteredOptionsPrices.reduce((max, opt)=>
      opt.price > max.price ? opt : max
    , { price: 0 })
    // find out what combos of two services the person could get for that amount
    const bestCombo = (mPrice) => {
        const suggestions = [];

        filteredOptionsPrices.map((opt, index) => {
            const i = filteredOptionsPrices.findIndex((elem, i) => i > index && Math.round(elem.price) === (Math.floor(mPrice) - Math.round(opt.price)));
            if (i > -1) {
              suggestions.push([opt, filteredOptionsPrices[i]])
              return suggestions;
            }
        });

        if (suggestions.length > 0) return suggestions;
        if (maxAmount <= 0) return [];
        maxAmount--;
        bestCombo(maxAmount);

    }

    console.log({
      best_service: mostExpensiveOpt,
      best_combo: bestCombo(maxAmount)
    })

    return {
      best_service: mostExpensiveOpt,
      best_combo: bestCombo(maxAmount)
    }

}

// handle submission of the gift suggestion simulator
simulatorForm.addEventListener('submit', (e) => {

    // check if the form is valid
    e.preventDefault();
    simulatorForm.classList.add('was-validated');
    if (!simulatorForm.reportValidity()) return;

    // configure and display the simulation
    let simulationResult;

    if (simulatorInput.value === '') {
      simulationResult = handleGiftSuggestions(Number(simulatorSelect.selectedOptions[0].value), suggestions);
      handleGiftsDisplay(simulationResult, simulatorSelect.selectedOptions[0].value);
    } else {
      simulationResult = handleGiftSuggestions(Number(simulatorInput.value), suggestions);
      handleGiftsDisplay(simulationResult, simulatorInput.value);
    }

    simulatorInput.value = '';
    simulationResultWrapper.classList.remove('d-none');
    hr.classList.remove('d-none');
})

// handle display potential gifts
function handleGiftsDisplay({ best_service, best_combo }, amount) {

  // Fill the amount in the first paragraph
  simulatorAmount.innerHTML = `${amount}&euro;`;

  // Fill the first part of the result section
    Array.from(simulatorResultBest.children).map(elem => {
        elem.tagName === 'H4' ? elem.textContent = best_service?.name
        : elem.tagName === 'IMG' ? elem.setAttribute('src', best_service?.img) && elem.setAttribute('alt', best_service?.alt)
        : elem.tagName === 'STRONG' ? elem.innerHTML = `${best_service?.price}&euro;`
        : null;
    })

    // Fill the second part of the result section
    let chosenCombo;
    const filteredCombos = best_combo.filter(combo => combo[0]?.group !== combo[1]?.group);
    filteredCombos.length === 0 ? chosenCombo = best_combo[0] : chosenCombo = filteredCombos[0];

    simulatorResultCombo.forEach((div, i) => {
        const children = div.children;
        return Array.from(children).map(elem => {
          return elem.tagName === 'H4' ? elem.textContent = chosenCombo[i]?.name
          : elem.tagName === 'IMG' ? elem.setAttribute('src', chosenCombo[i]?.img) && elem.setAttribute('alt', chosenCombo[i]?.alt)
          : elem.tagName === 'STRONG' ? elem.innerHTML = `${chosenCombo[i]?.price}&euro;`
          : null;
        })
    });

}



