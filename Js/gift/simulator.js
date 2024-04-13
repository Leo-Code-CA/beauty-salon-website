//////////////////////////// GIFTS SIMULATOR ////////////////////////////

// Imports
import { suggestions } from './../contact/data.js';
// HTML Elements
const simulatorForm = document.querySelector('.giftpage__simulatorForm');
const simulatorSelect = document.querySelector('.giftpage__simulatorSelect');
const simulatorInput = document.querySelector('.giftpage__simulatorInput');
const simulationResultWrapper = document.querySelector('.giftpage__simulatorResults');
const hr = document.querySelector('hr');
const simulatorAmount = document.querySelector('.giftpage__simulatorAmount');
const simulatorResultBest = document.querySelector('.giftpage__simulatorResultsBest');
const simulatorResultDuo = document.querySelectorAll('.giftpage__simulatorResultsDuo div div');
const simulationResultCombo = document.querySelector('.giftpage__simulatorResultsCombo');
const carouselIndicators = document.querySelector('#giftSimulatorOne .carousel-indicators');
const carouselContent =  document.querySelector('#giftSimulatorOne .carousel-inner');
// don't do that but select them directly in the for each
const carouselIndicators = document.querySelector('#giftSimulatorTwo .carousel-indicators');
const carouselContent =  document.querySelector('#giftSimulatorTwo .carousel-inner');

///////// START OF THE JS ///////

// Handle finding the closest service price from the gift card amount
function handleFindHighestPrice(filteredServicePrices) {
    if (filteredServicePrices && filteredServicePrices.length > 0) {
        return filteredServicePrices.reduce((mostExpensiveService, currentService)=>
        currentService.price > mostExpensiveService.price ? currentService : mostExpensiveService
      , { price: 0 });
    }
}

// Handle finding all the service price duos that sum up to the target price
function handleFindBestServiceDuo(maximumServicePrice, filteredServicesList) {
    if (maximumServicePrice && maximumServicePrice >= 40 && maximumServicePrice <= 200 && filteredServicesList && filteredServicesList.length > 0) {
        // if the target gift price has decimals, round it down to the largest integer smaller than itself
        let maxAmount = Math.floor(maximumServicePrice);
        const duo = [];
        // recursively go through the array to find a pair that sums up to the target price
        function servicesPricesReview(targetPrice) {
            filteredServicesList.map((firstService, index) => {
              const i = filteredServicesList.findIndex((secondService, i) => i > index && targetPrice === Math.round(secondService.price) + Math.round(firstService.price));
              if (i > -1) {
                duo.push([firstService, filteredServicesList[i]])
                return duo;
              }
            });
            // if a duo has been found return it
            if (duo.length > 0) return duo;
            // this case should never happen but just for safety to avoid inifite loop
            if (maxAmount <= 0) return [];
            // call again the same function with a reduced target price until finding a duo that sums up to it
            servicesPricesReview(targetPrice - 1);
        }
        // initial function call with the initial price target
        servicesPricesReview(maxAmount);
        // return the duos found
        return duo;
    }
}

// Handle finding all the prices combinaisons that sum up to the price target
function handleFindServicesCombinaisons(servicesList, targetGiftPrice) {
    if (targetGiftPrice && targetGiftPrice >= 40 && targetGiftPrice <= 200 && servicesList && servicesList.length > 0) {
        let result = []
        // search all the possible combinaisons inside of the "solution" tree
        function deepFirstSearch(index, targetGiftPrice, candidatesArray) {
            // if the sum of the prices in the array is bigger than the desired gift price, return because it means we won't find any solution in that branch
            if (targetGiftPrice < 0) return;
            // if the sum of the prices in the array is equal to the desired gift price, copy this array and push it into the result array
            if (targetGiftPrice === 0) {
                result.push([...candidatesArray])
                return;
            }
            // recursion (start at index to avoid duplications)
            for (let i = index; i < servicesList.length; i++) {
                candidatesArray.push(servicesList[i])
                // call again with i + 1 and not i to use a every price only one single time
                deepFirstSearch(i + 1, targetGiftPrice - servicesList[i].price, candidatesArray)
                // backtrack (get back up one tree node)
                candidatesArray.pop()
            }
        }
        // initial function call
        deepFirstSearch(0, targetGiftPrice, [])
        // return final result array with all combinaisons
        return result;
    }
};

// Handle gift suggestions
function handleGiftSuggestions(targetPrice, servicesList) {
    if (targetPrice && targetPrice >= 40 && targetPrice <= 200 && servicesList && servicesList.length > 0) {
        // remove all the services that are more expensive than the total gift amount
        const filteredServicesList = servicesList.filter(opt => opt.price <= targetPrice);
        if (filteredServicesList && filteredServicesList.length > 0) {
            // find all the unique prices in the filtered services list
            const servicesWithUniquePrice = [...filteredServicesList].reduce((arr, current) => {
              if (!arr) return [];
              return arr.findIndex(service => service.price === current.price) === -1 ? [...arr, current] : arr
            }, []);
            // find out what is the most expensive service the person could get for the gift card amount
            const best_service = handleFindHighestPrice(filteredServicesList);
            const highestServicePrice = best_service && best_service.price ? best_service.price : 0;
            // find out what duos of services the person could get for the gift card amount
            const best_duo = handleFindBestServiceDuo(targetPrice, filteredServicesList);
            const highestDuoPrice = best_duo && best_duo.length > 0 ? best_duo[0][0]?.price + best_duo[0][1]?.price : 0;
            // depending on the gift card amount and the services prices, determine what kind of suggestions to provide
            if (highestDuoPrice + 10 < targetPrice && highestServicePrice + 10 < targetPrice) {
                // CASE 1: two combos - expensive gift
                // find out all the possible combiaisons of unique prices summing up to the gift card amount
                const best_combo = handleFindServicesCombinaisons(servicesWithUniquePrice, targetPrice);

                if (best_combo && best_combo.length >= 2) {

                    let shortestCombo = { comboLength: null, combo: [] };
                    let longestCombo = { comboLength: null, combo: [] };

                    for (let i = 0; i < best_combo.length; i++) {
                        !shortestCombo.comboLength || best_combo[i].length < shortestCombo.comboLength ?
                        shortestCombo = { comboLength: best_combo[i].length, combo: best_combo[i] }
                        : !longestCombo.comboLength || best_combo[i].length > longestCombo.comboLength ?
                        longestCombo = { comboLength: best_combo[i].length, combo: best_combo[i] }
                        : null;
                    }

                    return {
                      combo: [shortestCombo.combo, longestCombo.combo]
                    }
                } 
            } else if (highestDuoPrice + 10 >= targetPrice && highestServicePrice + 10 < targetPrice) {
                  // CASE 2: one duo and one combo (3 services or more) - average gift
                  // select one duo
                  const filteredDuos = best_duo && best_duo.length > 0 ? best_duo.filter(combo => combo[0]?.group !== combo[1]?.group) : null;
                  const selectedDuo = filteredDuos.length === 0 ? best_duo[0] : filteredDuos[0];
                  // select one combo
                  const best_combo = handleFindServicesCombinaisons(servicesWithUniquePrice, targetPrice);
                  const selectedCombo = best_combo && best_combo.length >= 1 ? best_combo.find(combo => combo.length >= 3) : best_combo[0];

                  return {
                    duo: selectedDuo,
                    combo: selectedCombo
                  }
            } else {
                // CASE 3: one single service (best) and one duo - cheaper gift
                // we just need to select a duo as we already have the most expensive service
                const filteredDuos = best_duo && best_duo.length > 0 ? best_duo.filter(combo => combo[0]?.group !== combo[1]?.group) : null;
                const selectedDuo = filteredDuos.length === 0 ? best_duo[0] : filteredDuos[0];

                return {
                  best: best_service,
                  duo: selectedDuo
                }
            }
        }
    }
    throw new Error('Something went wrong in your function. It did not return.');
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

    console.log(simulationResult)

    simulatorInput.value = '';
    simulationResultWrapper.classList.remove('d-none');
    hr.classList.remove('d-none');
})

// handle display potential gifts
function handleGiftsDisplay(simulationOutput, amount) {

  // Fill the amount in the first paragraph
  if (amount) simulatorAmount.innerHTML = `${amount}&euro;`;

  // Fill the single result section
  if (simulationOutput && simulationOutput?.best) {
    const { best } = simulationOutput;
    Array.from(simulatorResultBest.children).map(elem => {
      elem.tagName === 'H4' ? elem.textContent = best?.name
      : elem.tagName === 'IMG' ? elem.setAttribute('src', best?.img) && elem.setAttribute('alt', best?.alt)
      : elem.tagName === 'STRONG' ? elem.innerHTML = `${best?.price}&euro;`
      : null;
    })
  }

  // Fill the duo section
  if (simulationOutput && simulationOutput?.duo) {
      const { duo } = simulationOutput;
      simulatorResultDuo.forEach((div, i) => {
        const children = div.children;
        return Array.from(children).map(elem => {
          return elem.tagName === 'H4' ? elem.textContent = duo[i]?.name
          : elem.tagName === 'IMG' ? elem.setAttribute('src', duo[i]?.img) && elem.setAttribute('alt', duo[i]?.alt)
          : elem.tagName === 'STRONG' ? elem.innerHTML = `${duo[i]?.price}&euro;`
          : null;
        })
      });
  }

  // Fill the combo carousel
  if (simulationOutput && simulationOutput?.combo) {
      simulationOutput.combo
  }

}


{/* <div class="carousel-indicators">
<button type="button" data-bs-target="#giftSimulator" data-bs-slide-to="0"
    class="active" aria-current="true" aria-label="Slide 1">
</button>
</div>
<div class="carousel-inner">
<div class="carousel-item active">
    <div class="giftpage__comboSlide">

    </div>
</div>
</div> */}