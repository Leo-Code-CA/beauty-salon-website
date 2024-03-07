//////////////////////////// CONTACT PAGE ////////////////////////////

// Imports

// Media Queries
const form = document.querySelector('.contact__form');
const select = document.querySelector('.contact__form select');
const textarea = document.querySelector('.contact__form textarea');
const formSummary = document.querySelector('.contact__formSummary');
const formTopic = document.querySelector('.contact__formTopic');
const formMessage = document.querySelector('.contact__formMessage');
const formSuggestions = document.querySelector('.contact__formSuggestions');
const formTime = document.querySelector('.contact__formTime');
// HTML Elements

// Data

// Variables

form.addEventListener(
	'submit',
	e => handleValidForm(e)
	// !form.reportValidity() ? handleInvalidForm(e) : handleValidForm(e)
);

function handleValidForm(e) {
	e.preventDefault();
	form.classList.remove('d-flex');
	form.classList.add('d-none');
	formSummary.classList.remove('d-none');
	formSummary.classList.add('d-flex');

	const submittedMessageContent = textarea.value;
	const submittedMessageTopic = select.selectedOptions[0].textContent;
	const submittedMessageDate = new Date().toLocaleString('fr', {
		hour: 'numeric',
		minute: 'numeric',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long',
	});

	formTopic.textContent += submittedMessageTopic;
	formTime.textContent += submittedMessageDate;
	formMessage.textContent = `"${submittedMessageContent}"`;
}

function handleInvalidForm(e) {
	e.preventDefault();
	form.classList.add('was-validated');
}
