// Handle prefill of the form select when the user clicked "book" somewhere on the website - on a specific service
const bookBtn = document.querySelectorAll('[data-book]');

if (bookBtn.length > 0) {

    bookBtn.forEach(btn => btn.addEventListener('click', (e) => handlePrefillForm(e)));

    function handlePrefillForm(e) {

        // e.preventDefault()
        const selectedValue = e.target.dataset.book;
        localStorage.setItem('book', selectedValue);
    
    }

} else {

    const select = document.querySelector('.contact__contactTopic option[value="appt"]');
    const hiddenSelect = document.querySelectorAll('.contact__hiddenSelect option');
    const bookRequest = localStorage.getItem('book');

    if (bookRequest) {
        select.setAttribute("selected", true);
        hiddenSelect.forEach(opt => opt.value === bookRequest ? opt.setAttribute("selected", true) : null);
    }



}





