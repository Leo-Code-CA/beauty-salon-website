//////////////////////////// GIFTS SIMULATOR ////////////////////////////

// Imports
import { suggestions } from '../contact/data.js';
// HTML Elements
const simulatorForm = document.querySelector('.giftpage__simulatorForm');
const simulatorSelect = document.querySelector('.giftpage__simulatorSelect');
const simulatorInput = document.querySelector('.giftpage__simulatorInput');
const simulationResultWrapper = document.querySelector('.giftpage__simulatorResults');
const hr = document.querySelector('hr');
const simulatorAmount = document.querySelector('.giftpage__simulatorAmount');
const simulatorResultBest = document.querySelector('.giftpage__simulatorResultsBest');
const simulatorResultCombo = document.querySelectorAll('.giftpage__simulatorResultsCombo div div');

///////// START OF THE JS ///////

// Handle finding the closest service price from the gift card amount
function handleFindHighestPrice(filteredServicePrices) {
    return filteredServicePrices.reduce((mostExpensiveService, currentService)=>
    currentService.price > mostExpensiveService.price ? currentService : mostExpensiveService
  , { price: 0 });
}

// Handle finding all the service price duos that sum up to the target price
function handleFindBestServiceDuo(maximumServicePrice, filteredServicePrices) {
  
      let maxAmount = maximumServicePrice;
      const suggestions = [];

      filteredServicePrices.map((opt, index) => {
          const i = filteredServicePrices.findIndex((elem, i) => i > index && Math.round(elem.price) === (Math.floor(maximumServicePrice) - Math.round(opt.price)));
          if (i > -1) {
            suggestions.push([opt, filteredServicePrices[i]])
            return suggestions;
          }
      });

      if (suggestions.length > 0) return suggestions;
      if (maxAmount <= 0) return [];
      maxAmount--;
      handleFindBestServiceDuo(maxAmount);

}

// Handle finding all the prices combinaisons that sum up to the price target
function handleFindServicesCombinaisons(servicesPrices, targetGiftPrice) {
  let result = []
  // search all the possible combinaisons inside of the "solution" tree
  function deepFirstSearch(index, targetGiftPrice, temporaryArray) {
      // if the sum of the prices in the array is bigger than the desired gift price, return because it means we won't find any solution in that branch
      if (targetGiftPrice < 0) return;
      // if the sum of the prices in the array is equal to the desired gift price, copy this array and push it into the result array
      if (targetGiftPrice === 0) {
          result.push([...temporaryArray])
          return;
      }
      // recursion (start at index to avoid duplications)
      for (let i = index; i < servicesPrices.length; i++) {
          temporaryArray.push(servicesPrices[i])
          console.log(servicesPrices[i]);
          deepFirstSearch(i, targetGiftPrice - servicesPrices[i], temporaryArray)
          // backtrack (get back up one tree node)
          temporaryArray.pop()
      }
  }
  // initial function call
  deepFirstSearch(0, targetGiftPrice, [])
  // return final result array with all combinaisons
  return result;
};

// Handle gift suggestions
function handleGiftSuggestions(targetPrice, servicesList) {
    // remove all the services that are more expensive than the gift total amount
    const filteredServicesList = servicesList.filter(opt => opt.price <= targetPrice);
    // find out what is the most expensive service the person could get for that amount
    const best_service = handleFindHighestPrice(filteredServicesList);
    // find out what combos of two services the person could get for that amount
    const best_duo = handleFindBestServiceDuo(targetPrice, filteredServicesList);
    // find out all the possible combiaisons of prices summing up to the gift card amount
    const filteredServicesPrices = filteredServicesList.map(service => service.price);
    const best_combos = handleFindServicesCombinaisons(filteredServicesPrices, targetPrice);

    console.log(best_service, best_duo, best_combos)

    return {
      best_service,
      best_duo,
      best_combos
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
function handleGiftsDisplay({ best_service, best_duo }, amount) {

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
    const filteredCombos = best_duo.filter(combo => combo[0]?.group !== combo[1]?.group);
    filteredCombos.length === 0 ? chosenCombo = best_duo[0] : chosenCombo = filteredCombos[0];

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




//// Find out how to avoid duplicate in your result array