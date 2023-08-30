// popup.js
var crnList = [];

function updateUI() {

    chrome.storage.local.set({ "crnList": crnList }, function () {});

    // Get the tags and input elements from the DOM
    const tags = document.getElementById('tags');
    const input = document.getElementById('input-tag');
    tags.innerHTML = "";

    crnList.forEach(element => {
        // Create a new list item element for the tag
        const tag = document.createElement('li');

        // If the trimmed value is not an empty string
        if (element !== '') {
            // Set the text content of the tag to 
            // the trimmed value
            tag.innerText = element;

            // Add a delete button to the tag
            tag.innerHTML += `<button class="delete-button" value="${element}">X</button>`;

            // Append the tag to the tags list
            tags.appendChild(tag);

            // Clear the input element's value
            input.value = '';
        }
    });

}

document.addEventListener('DOMContentLoaded', (event) => {

    chrome.storage.local.get(["crnList"], function (result) {
        if (result.crnList === undefined) {
            // if it's not set, initialize it with an empty list
            chrome.storage.local.set({ "crnList": [] }, function () {
                console.log('CRN List is set to empty list.');
            });
        } else {
            crnList = result.crnList;
        }
        console.log('CRN List: ', crnList);
        updateUI();
    });

    const input = document.getElementById('input-tag');
    // Add an event listener for keydown on the input element
    input.addEventListener('keydown', function (event) {

        // Check if the key pressed is 'Enter'
        if (event.key === 'Enter' || (event.key == " " ||
            event.code == "Space" ||
            event.keyCode == 32)) {

            // Prevent the default action of the keypress
            // event (submitting the form)
            event.preventDefault();

            // Get the trimmed value of the input element
            const tagContent = input.value.trim();

            if (crnList.includes(tagContent) == false && tagContent!="") {
                crnList.push(tagContent);
                updateUI(crnList);
            }

            

        }
    });

    // Add an event listener for click on the tags list
    tags.addEventListener('click', function (event) {

        // If the clicked element has the class 'delete-button'
        if (event.target.classList.contains('delete-button')) {

            // Get the value of the clicked button,
            // i.e., the content of the tag to be removed
            const tagToRemove = event.target.value;
    
            // Remove the tag from the crnList
            crnList = crnList.filter(tag => tag !== tagToRemove);
    
            // Update the UI
            updateUI(crnList);
        }
    });

    document.body.addEventListener('click', function(e){
        let target = e.target;
        while (target && target != this) { // Check for null or undefined
            if (target.tagName == 'A') {
                e.preventDefault();
                window.open(target.getAttribute('href'), '_blank');
                return false;
            }
            target = target.parentNode; // Ensure the loop will eventually terminate
        }
    });

    document.getElementById('input-tag').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

});

