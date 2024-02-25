//////////////////////////// MASSAGES PAGE ////////////////////////////

// Imports

// Media Queries

// HTML Elements
const overview = document.querySelectorAll('.massages__overview');
// Data

// Variables

function handleOpenMassagesOverview(e) {

    // Select the element that has been clicked AND the three others massage elements
    const selectedMassage = e.currentTarget;
    const activeInfo = selectedMassage.children[2];
    let notSelectedMassages;
    overview.forEach((massage, key) => {
        massage === selectedMassage ?
        notSelectedMassages = document.querySelectorAll(`.massages__overview:not(:nth-child(${key + 1}))`)
        : null;
    });

    const checkIfSelected = document.querySelector('.massages__overview--selected');

    if (!checkIfSelected) {

        // Give the three elements not selected an opacity of 0
        notSelectedMassages.forEach(massage => massage.style.opacity = 0);
        // Add a class to the active massage element - it increases its size
        selectedMassage.classList.add('massages__overview--selected');
        // Show the info that were hidden
        activeInfo.classList.remove("d-none");

    } else {

        console.log(e.target, activeInfo.children[0].children[0])

        if (e.target === activeInfo.children[0].children[0]) {
            // Give the three elements that were hidden an opacity of 1
            notSelectedMassages.forEach(massage => massage.style.opacity = 1);
            // Remove the class of the massage element that was active - decreases its size
            selectedMassage.classList.remove('massages__overview--selected');
            // Hide the info that were showed when the massage element was selected
            activeInfo.classList.add("d-none");
        };

    };
    
};

// Call the function to handle the overview on click
overview.forEach(massage => {
    massage.addEventListener('click', (e) => handleOpenMassagesOverview(e));
});