// Variables declaration 
var form = document.getElementById("passwordManager-Form");
var nameInput = document.getElementById('nameInput');
var passwordInput = document.getElementById('passwordInput');
var addButton = document.getElementById('buttonSubmit'); 
var passwordList = document.getElementById('passwordList-items');
var showAllButton = document.getElementById('showAllPasswords');
var fab = document.getElementById("fab");

// Boolean variables to manage the state of the application
var isShowingAll = false;
var isCardSwapped = false;

// Function to toggle the visibility of a password in the list
function togglePasswordVisibility(passwordSpan) {
    if (passwordSpan.classList.contains('hidden')) {
        passwordSpan.textContent = passwordSpan.dataset.password;
        passwordSpan.classList.remove('hidden');
    } else {
        passwordSpan.textContent = '************';
        passwordSpan.classList.add('hidden');
    }
}

// Event listener to show all passwords on mouse down
showAllButton.addEventListener('mousedown', function () {
    // Set the flag to indicate that all passwords should be shown
    isShowingAll = true;

    // If showing all, reveal all passwords in the list
    if (isShowingAll) {
        // Select all password spans within list items
        var passwordSpans = document.querySelectorAll('.passwordList-item span.password');
        // Iterate over each password span
        passwordSpans.forEach(function (passwordSpan) {
            // Set the text content of the password span to the actual password value
            passwordSpan.textContent = passwordSpan.dataset.password;
            // Remove the 'hidden' class to reveal the password
            passwordSpan.classList.remove('hidden');
        });
    }
});

// Event listener to hide all passwords on mouse up
showAllButton.addEventListener('mouseup', function () {
    // Reset the flag to indicate that all passwords should be hidden
    isShowingAll = false;

    // If not showing all, mask all passwords in the list
    if (!isShowingAll) {
        // Select all password spans within list items
        var passwordSpans = document.querySelectorAll('.passwordList-item span.password');
        // Iterate over each password span
        passwordSpans.forEach(function (passwordSpan) {
            // Set the text content of the password span to asterisks
            passwordSpan.textContent = '************';
            // Remove the 'hidden' class to hide the password
            passwordSpan.classList.add('hidden');
        });
    }
});

// Event listener for form submission
form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the entered URL/name and password from the form
    var urlName = nameInput.value.trim();
    var password = passwordInput.value.trim();

    // Create a new list item to display the password
    var listItem = document.createElement('li');
    listItem.classList.add('passwordList-item');

    // Create spans to display the URL/name and password
    var urlNameSpan = document.createElement('span');
    urlNameSpan.textContent = urlName;

    var passwordSpan = document.createElement('span');
    passwordSpan.textContent = '************';
    passwordSpan.dataset.password = password;
    passwordSpan.classList.add('password', 'hidden');

    // Create buttons to show and delete the password
    var showButton = document.createElement('button');
    showButton.textContent = 'Show';
    showButton.classList.add('showPassword');

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Verwijder';
    deleteButton.classList.add('deletePassword');

    // Append all elements to the list item
    listItem.appendChild(urlNameSpan);
    listItem.appendChild(passwordSpan);
    listItem.appendChild(showButton);
    listItem.appendChild(deleteButton);

    // Append the list item to the password list
    passwordList.appendChild(listItem);

    // Clear the form inputs after submission
    nameInput.value = '';
    passwordInput.value = '';
});

// Event listener for interactions within the password list
passwordList.addEventListener('click', function (event) {
    // Get the target element of the click event
    var target = event.target;

    // If the Show button is clicked, toggle password visibility
    if (target.classList.contains('showPassword')) {
        // Get the previous sibling of the target element, which is the password span
        var passwordSpan = target.previousElementSibling;
        // Call the togglePassword function to toggle visibility of the password
        togglePasswordVisibility(passwordSpan);
        // Change the button text and background color based on password visibility
        target.textContent = passwordSpan.classList.contains('hidden') ? 'Show' : 'Hide';
        // Check if the button text is Hide, then change its color to gray
        if (target.textContent === 'Hide') {
            target.style.backgroundColor = 'gray';
        } else {
            // If it's not Hide, revert back to the original color
            target.style.backgroundColor = 'hsl(176, 63%, 55%)';
        }
        // If the Delete button is clicked, remove the password item from the list
    } else if (target.classList.contains('deletePassword')) {
        var passwordItem = target.parentElement;
        passwordItem.remove();
    }
});


// Function to swap the positions of the two cards
function swapCards() {
    var firstCard = document.querySelector('.passwordManager');
    var secondCard = document.querySelector('.passwordList');
    var parent = firstCard.parentElement;

    // Toggle between the positions of the two cards
    if (isCardSwapped) {
        parent.insertBefore(secondCard, firstCard);
    } else {
        parent.insertBefore(firstCard, secondCard);
    }

    isCardSwapped = !isCardSwapped;
}

// Event listener for the floating action button to swap card positions
fab.addEventListener('click', function () {
    swapCards();
});