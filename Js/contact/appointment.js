//////////////////////////// HANDLE APPOINTMENT SELECTS ////////////////////////////

// Imports

// Media Queries
const form = document.querySelector('.contact__form');
const select = document.querySelector('.contact__contactTopic');
const hiddenSelect = document.querySelector('.contact__hiddenSelect');
const apptFormHidden = document.querySelector('.contact__apptFormHidden');
const textarea = document.querySelector('.contact__form textarea');
const formSummary = document.querySelector('.contact__formSummary');
const formTopic = document.querySelector('.contact__formTopic');
const formMessage = document.querySelector('.contact__formMessage');
const formSuggestions = document.querySelector('.contact__formSuggestions');
const formTime = document.querySelector('.contact__formTime');
const addBtn = document.querySelector('.contact__addBtn');
// HTML Elements

// Data

// Variables

form.addEventListener(
	'submit',
	e => !form.reportValidity() ? handleInvalidForm(e) : handleValidForm(e)
);

// Handle page display after valid form submission
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

// Handle invalid form submission
function handleInvalidForm(e) {
	e.preventDefault();
	form.classList.add('was-validated');
}

// Handle form display depending on the user selection // CHANGE OR IMPROVE THIS ONE
function handleFormDisplay() {
	const currentChoice = select.selectedOptions[0].value;

	switch (currentChoice) {
		case 'appt':
			apptFormHidden.classList.remove('d-none');
			break;
		case 'info':
			apptFormHidden.classList.add('d-none');
			break;
		case 'product':
			apptFormHidden.classList.add('d-none');
			break;
		case 'feedback':
			apptFormHidden.classList.add('d-none');
			break;
		case 'other':
			apptFormHidden.classList.add('d-none');
			break;
		default:
			throw new Error('The current Choice is not reconized');
	}
}

select.addEventListener('change', handleFormDisplay);

// Handle adding more services to book
function handleAddService() {
	// create the wrapper
	const wrapper = document.createElement('div');
	wrapper.classList.add('contact__apptFormWrapper');
	wrapper.classList.add('mt-3');

	// create the select clone
	const newSelect = hiddenSelect.cloneNode(true);
	const numberOfSelect = document.querySelectorAll('.contact__apptFormHidden select').length;
	newSelect.setAttribute('id', `appointment${numberOfSelect}`);

	// create the trash icon
	const trashIconWrapper = document.createElement('button');
	const trashIcon = document.createElement('i');
	trashIcon.classList.add('fa-solid', 'fa-trash-can');
	trashIconWrapper.appendChild(trashIcon);
	trashIconWrapper.setAttribute('type', 'button');
	trashIconWrapper.addEventListener('click', e => handleDeleteService(e));

	// put everything together and add to the dom
	wrapper.appendChild(newSelect);
	wrapper.appendChild(trashIconWrapper);
	addBtn.before(wrapper);

	const allSelects = document.querySelectorAll('.contact__hiddenSelect');
	allSelects.forEach(select =>
		select.addEventListener('change', () => handleDisabledOptions(allSelects))
	);
	handleDisabledOptions(allSelects);
}

addBtn.addEventListener('click', handleAddService);

// Handle disabled options when the user wants to book more than one service
function handleDisabledOptions(getAllSelects) {
	const allOptions = document.querySelectorAll('.contact__apptFormHidden option');
	allOptions.forEach(option => option.removeAttribute('disabled'));

	getAllSelects.forEach((select, i) => {
		let currentOptionValue = select.selectedOptions[0].value;
		const options = document.querySelectorAll(`option[value=${currentOptionValue}]`);
		options.forEach((opt, index) => {
			if (index !== i) {
				opt.setAttribute('disabled', true);
			}
		});
	});
}

// Handle delete service when there is more than one selected
function handleDeleteService(e) {
	const elemToDelete = e.currentTarget.parentElement;
	elemToDelete.remove();

	const allSelects = document.querySelectorAll('.contact__hiddenSelect');
	handleDisabledOptions(allSelects);
}

// Check if the main select has is selected option set on 'appt', if so, show the next select
window.addEventListener('load', handleFormDisplay);

