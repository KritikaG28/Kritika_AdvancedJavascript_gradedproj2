//validate the login with username and password stored in local storage
function validateLogin() {
    let inputUsername = document.forms["loginForm"]["username"].value;
    let inputPassword = document.forms["loginForm"]["password"].value;
    var error = document.getElementById("error")
    let actualPassword = window.localStorage.getItem(inputUsername)
    if (actualPassword == inputPassword) {
        error.textContent = ""
        return true;
    }
    error.textContent = "Please Enter Valid Username or Password"
    return false
}

//stop back button funtionality upon successful login
function preventBack() {
    window.history.forward();
}
window.onunload = function () {
    null;
};
setTimeout("preventBack()", 0);