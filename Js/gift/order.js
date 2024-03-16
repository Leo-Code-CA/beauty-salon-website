//////////////////////////// GIFTS ORDER ////////////////////////////

// Imports

// Media Queries

// HTML Elements
const closeBtn = document.querySelector('.giftpage__closeConditions');
const orderBtn = document.querySelector('.giftpage__orderBtn');
const conditions = document.querySelector('.giftpage__conditions');
const checkbox = document.querySelector('.giftpage__checkConditions');
const confirmBtn = document.querySelector('.giftpage__acceptConditions');
// Data

// Variables

// handle access to the sale conditions
orderBtn.addEventListener('click', handlePurchaseStepOne);

function handlePurchaseStepOne() {
    conditions.classList.remove('d-none');
}

// handle dismiss sale conditions and cancel
closeBtn.addEventListener('click', handleCancelPurchase)

function handleCancelPurchase() {
    conditions.classList.add('d-none');
}

// handle checkbox and submit button states
checkbox.addEventListener('change', handleToggleBtnState)

function handleToggleBtnState() {
    if (checkbox.checked) {
        confirmBtn.removeAttribute('disabled');
    } else {
        confirmBtn.setAttribute('disabled', true);
    }
}
// handle accept sale conditions and proceed
confirmBtn.addEventListener('click', handlePurchaseStepTwo);

function handlePurchaseStepTwo(e) {
    e.preventDefault();
    if (checkbox.checked) alert('Redirection to the order endpoint managed by a third party.');
}


