// Initializing Variables
const signinEmailInput = document.getElementById("signinEmail");
const signinPasswordInput = document.getElementById("signinPassword");
const signupNameInput = document.getElementById("signupName");
const signupEmailInput = document.getElementById("signupEmail");
const signupPasswordInput = document.getElementById("signupPassword");
const submitBtn = document.getElementById("submitBtn");
let Arr = [];


// Local Storage
if (localStorage.getItem("userData")) {
    Arr = JSON.parse(localStorage.getItem("userData"));
    sayWelcomeToUser();
}


// Login
function isLoginFormEmpty() {
    if (signinEmailInput.value =="" && signinPasswordInput.value == "" || signinEmailInput.value =="" || signinPasswordInput.value == "") {
        return true;
    } else {
        return false;
    }
}
// Home Page
let homePage = "";
function sayWelcomeToUser() {
    if (isLoginFormEmpty() == false) {
        let email = signinEmailInput.value;
        let password = signinPasswordInput.value;
        for (let i = 0; i < Arr.length; i++) {
            if (Arr[i].email.toLowerCase() === email.toLowerCase() && Arr[i].password.toLowerCase() === password.toLowerCase()) {
                homePage += 
                `
                <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                    <div class="container">
                        <a class="navbar-brand" href="#">
                            <img src="./favicon.ico" alt="Logo">
                            ${Arr[i].username}
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li class="nav-item mt-2 mt-lg-0">
                                    <a id=""logout onclick="logout()" class="nav-link btn btn-outline-danger" aria-current="page" href="">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <header class="header vh-100 text-white d-flex justify-content-center align-items-center text-center">
                    <div class="container">
                        <div class="wrapper w-75 mx-auto py-5 px-3 text-center shadow-sm rounded-5">
                            <h1>Welcome ${Arr[i].username}</h1>
                        </div>
                    </div>
                </header>
                `
                document.getElementById("home").innerHTML = homePage;
                clearLoginForm();
            } else if (Arr[i].username == "") {
                /* document.querySelector(".signup-alert").classList.replace("d-none", "d-block");
                document.querySelector(".required-alert").classList.replace("d-block", "d-none"); */
                console.log("hii");
                
            }
        }
    } else {
        document.querySelector(".required-alert").classList.replace("d-none", "d-block");
        document.querySelector(".signup-alert").classList.replace("d-block", "d-none");
        return true;
    }
}
// Clear Login
function clearLoginForm() {
    signinEmailInput.value = "";
    signinPasswordInput.value = "";
}


// Signup
function getUserData() {
    if (signupNameInput.value !== "" && signupEmailInput.value !== "" && signupPasswordInput.value !== "") {
        const userData = {
        username: signupNameInput.value,
        email: signupEmailInput.value,
        password: signupPasswordInput.value,
    }
    Arr.push(userData);
    localStorage.setItem("userData", JSON.stringify(Arr));
    document.querySelector(".loginNow").classList.replace("d-none", "d-block");
    clearSignupForm();
    } else {
        document.querySelector(".required-alert").classList.replace("d-none", "d-block");
    }
}
// Signup Page
function signupPage() {
    document.getElementById("signup").classList.replace("d-none", "d-block");
    document.getElementById("login").classList.replace("d-block", "d-none");
}
// Clear Signup
function clearSignupForm() {
    signupNameInput.value = "";
    signupEmailInput.value = "";
    signupPasswordInput.value = "";
}


// Validate Inputs
function validateForm(input) {
    const regex = {
        signupName: /^[a-zA-Z][a-zA-Z0-9._]{2,15}(?<![._])$/,
        signinEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        signinPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.)[A-Za-z\d]{8,}$/,
        signupEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        signupPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.)[A-Za-z\d]{8,}$/,
    }
    var isValid = regex[input.id].test(input.value);
    if (isValid) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        input.nextElementSibling.classList.replace("d-block", "d-none");
    }
    else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        input.nextElementSibling.classList.replace("d-none", "d-block");
    }
    return isValid;
}


// Logout
function logout() {
    localStorage.removeItem("userData");
    document.getElementById("logout").href = "./index.html";
}