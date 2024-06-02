// Get signup page's inputs and button
var userNameInput = document.querySelector(".signup-form input[type=text]");
var userEmailInput = document.querySelector(".signup-form input[type=email]");
var userPasswordInput = document.querySelector(".signup-form input[type=password]");
var signupBtn = document.querySelector(".signup-form button");
var loginLink = document.querySelector("#signup-content a");

// Get login page's inputs and button
var loginEmail = document.querySelector(".login-form input[type=email]");
var loginPass = document.querySelector(".login-form input[type=password]");
var loginBtn = document.querySelector(".login-form button");
var signupLink = document.querySelector("#login-content a");

// Get pages' content (sign up, log in, user page)
var signupContent = document.getElementById("signup-content");
var loginContent = document.getElementById("login-content");
var nav = document.querySelector("nav");
var loggedInContent = document.querySelector(".logged-in");
var logoutBtn = document.querySelector("nav button[type=submit]");

var usersList;

if (localStorage.getItem("users") == null) {
    usersList = [];
} else {
    usersList = JSON.parse(localStorage.getItem("users"));
}

// Check if email exists in the localStorage
function isEmailExist() {
    for (var i = 0; i < usersList.length; i++) {
        if (userEmailInput.value.toLowerCase() == usersList[i].email) {
            return true;
        }
    }
}

// Display messages (error or success) when user sign up
function displaySignupMessage(msg) {
    userPasswordInput.nextElementSibling.classList.remove("d-none");
    userPasswordInput.nextElementSibling.innerHTML = msg;
}

// Signup users and save data to localStorage (if not exist) and if data exists display error message
function signUp() {

    if (userNameInput.value == "" || userEmailInput.value == "" || userPasswordInput.value == "") {
        
        displaySignupMessage(`<div class="alert alert-danger mb-0" role="alert">All inputs are required</div>`)
    
    } else {
        if ( isEmailExist() === true) {
            
            displaySignupMessage(`<div class="alert alert-danger mb-0" role="alert">Email already exist</div>`);

        } else {

            var user = {
                username: userNameInput.value,
                email: userEmailInput.value.toLowerCase(),
                password: userPasswordInput.value
            }
            usersList.push(user);
            localStorage.setItem("users", JSON.stringify(usersList));            
            displaySignupMessage(`<div class="alert alert-info" role="alert">Your account has been created successfully, you will be redirected to the login page in 5 seconds </div>`);
            setTimeout(displayLoginContent, 5000);
        }
    }
}

// signup when click on signup button
signupBtn.addEventListener("click", function(e){
    e.preventDefault();
    signUp ();
});

// Display messages (error or success) when user log in
function displayLoginMessage (msg) {
    loginPass.nextElementSibling.classList.remove('d-none');
    loginPass.nextElementSibling.innerHTML = msg;
}

// log the user in when the user's data is correct and display errors when it is not.
function login() {

    if (loginEmail.value == "" || loginPass.value == "") {
        displayLoginMessage (`<div class="alert alert-danger mb-0" role="alert">All inputs are required</div>`);
    } else {

        if (usersList.length == 0) {
            displayLoginMessage (`<div class="alert alert-danger mb-0" role="alert">incorrect email or password</div>`);
        } else {

            for (var i=0; i < usersList.length; i++) {
               
                if (loginEmail.value.toLowerCase() == usersList[i].email && loginPass.value == usersList[i].password) {
                    localStorage.setItem("loggedUser", usersList[i].username);
                    displayUserContent();
                    clearLoginForm();
        
                } else {

                    displayLoginMessage (`<div class="alert alert-danger mb-0" role="alert">incorrect email or password</div>`);
                
                }
            }
        }
    }
}

// login user when click on login button
loginBtn.addEventListener("click", function(e){
    e.preventDefault();
    login();
});

// Go to signup page when click on "signup" link
signupLink.addEventListener("click", function(e){
    e.preventDefault();
    displaySignupContent();
    localStorage.setItem("currentPage", "signup");
});

// Go to login page when click on "login" link
loginLink.addEventListener("click", function(e){
    e.preventDefault();
    displayLoginContent();
});

// Stay in user page as long as the user still logged in, even when refresh the page
if (localStorage.getItem("loggedUser")) {
    displayUserContent();
}

// log the user out and go to the log in page
function logout() {
    localStorage.removeItem("loggedUser");
    loginContent.classList.remove("d-none");
    loggedInContent.classList.add("d-none");
    nav.classList.add("d-none");
    loggedInContent.innerHTML = null;
}

logoutBtn.addEventListener("click", logout)

// Stay on signup page when refreshing the page
if (localStorage.getItem("currentPage") == "signup") {
    displaySignupContent ();
}

function displaySignupContent () {
    loginContent.classList.add("d-none");
    signupContent.classList.remove("d-none");
    clearLoginForm();
    loginPass.nextElementSibling.classList.add('d-none');
}

function displayLoginContent () {
    loginContent.classList.remove("d-none");
    signupContent.classList.add("d-none");
    localStorage.removeItem("currentPage");
    clearSignupForm();
    userPasswordInput.nextElementSibling.classList.add("d-none");
}

function displayUserContent() {
    loggedInContent.innerHTML = `<h1>Welcome ${localStorage.getItem("loggedUser")}</h1>`
    loggedInContent.classList.remove("d-none");
    nav.classList.remove("d-none"); 
    loginContent.classList.add("d-none");
}

function clearLoginForm() {
    loginEmail.value = null;
    loginPass.value = null;
}

function clearSignupForm() {
    userNameInput.value = null;
    userEmailInput.value = null;
    userPasswordInput.value = null;
}