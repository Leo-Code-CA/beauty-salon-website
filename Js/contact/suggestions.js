//////////////////////////// HANDLE APPOINTMENT SELECTS ////////////////////////////

// Imports
import { suggestions } from './data.js';
// Media Queries

// HTML Elements
const form = document.querySelector('.contact__form');
const suggestionsWrapper = document.querySelector('.contact__formSuggestions');
const contactTopicSelect = document.querySelector('.contact__contactTopic');
const apptSuggestions = document.querySelector('.contact__apptSuggestions');
const otherSuggestions = document.querySelector('.contact__otherSuggestions');
const feedbackSuggestions = document.querySelector('.contact__feedbackSuggestions');
// Data

// Variables

form.addEventListener('submit', handleSuggestions);

function handleSuggestions() {

    const selectedTopic = contactTopicSelect.selectedOptions[0].value;

    if (selectedTopic === 'appt') {

        apptSuggestions.classList.remove('d-none');
        apptSuggestions.classList.add('d-flex');
        const hiddenSelect = document.querySelectorAll('.contact__hiddenSelect');

        if (hiddenSelect.length >= 4) {

            hiddenSelect.forEach((select, i) => {

                if (i < 4) {

                    const imgElem = document.querySelector(`.contact__apptSuggestions div:nth-child(${i + 1}) img`);
                    const btnElem = document.querySelector(`.contact__apptSuggestions div:nth-child(${i + 1}) button`);
                    btnElem.textContent = select.selectedOptions[0].textContent;
    
                    suggestions.map(item => {
                        if (item.value === select.selectedOptions[0].value) {
                            imgElem.setAttribute('src', item.img);
                            imgElem.setAttribute('alt', item.alt);
                        }
                    })
                }
            })

        } else {

            let suggestionType = [];

            for (let i = 0; i < 4; i++) {

                const hiddenSelect = document.querySelectorAll('.contact__hiddenSelect');
                const imgElem = document.querySelector(`.contact__apptSuggestions div:nth-child(${i + 1}) img`);
                const btnElem = document.querySelector(`.contact__apptSuggestions div:nth-child(${i + 1}) button`);

                if (i + 1 <= hiddenSelect.length) {
    
                    const select = hiddenSelect[i];
                    btnElem.textContent = select.selectedOptions[0].textContent;
                    const optgroup = select.selectedOptions[0].closest('optgroup').label;
                    suggestionType.includes(optgroup) ? null : suggestionType.push(select.selectedOptions[0]);
    
                    suggestions.map(item => {
                        if (item.value === select.selectedOptions[0].value) {
                            imgElem.setAttribute('src', item.img);
                            imgElem.setAttribute('alt', item.alt);
                        }
                    })
                    
                } else {

                    console.log(suggestionType);


                    while (suggestionType.length < 4) {

                        suggestionType.map(suggestion => suggestionType.push(suggestion));

                    }

                    const filteredSuggestions = suggestions.filter(suggestion => {

                        const parentLabel = suggestionType[3 - i].closest('optgroup').label;
                        const currentValue = suggestionType[3 - i].value;

                        console.log(parentLabel, currentValue)

                        return suggestion.group === parentLabel && suggestion.value !== currentValue

                    });

                    const suggestionPicked = Math.floor(Math.random() * filteredSuggestions.length);

                    imgElem.setAttribute('src', filteredSuggestions[suggestionPicked].img);
                    imgElem.setAttribute('alt', filteredSuggestions[suggestionPicked].alt);
                    const suggestionValue = filteredSuggestions[suggestionPicked].value;
                    btnElem.textContent = document.querySelector(`option[value=${suggestionValue}]`).textContent;
                    

                }

            }
        }

    } else if (selectedTopic === 'product' || selectedTopic === 'info' || selectedTopic === 'other') {

        otherSuggestions.classList.remove('d-none');
        otherSuggestions.classList.add('d-block')

    } else if (selectedTopic === 'feedback') {

        feedbackSuggestions.classList.remove('d-none');
        feedbackSuggestions.classList.add('d-block');

    } else {
        throw new Error("The option is not valid");
    }


}