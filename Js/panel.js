// Update the admin side with the content currently displayed on the public side of the website - FUNCTIONALITY
function handleLoadPanel() {

    document.getElementById('webta').value = localStorage.getItem("webp");
    console.log(`webp value : ${localStorage.getItem("webp")}`);

}

document.getElementById('bodypanel').addEventListener("load", handleLoadPanel());

// Get ready the content modifications that are about to be displayed on the public side - FUNCTIONALITY
function handleClick() {

    localStorage.setItem('webta', document.getElementById('webta').value);
    console.log(`webta value : ${localStorage.getItem("webta")}`);

}

document.getElementById('webbtn').addEventListener("click", handleClick);




