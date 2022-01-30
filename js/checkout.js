// Get the input fields
var password = document.querySelector(".password");
var phone = document.querySelector('.phone');
var nameperson = document.querySelector('.name');
var lastname = document.querySelector('.lastname');
var address = document.querySelector('.address');
var email = document.querySelector('.email');

// Get the error elements
var errorPassword = document.getElementById("errorPassword");
var errorName = document.getElementById('errorName');  
var errorLastName = document.getElementById('errorLastName'); 
var errorPhone = document.getElementById('errorPhone'); 
var errorEmail = document.getElementById('errorEmail'); 
var errorAddress = document.getElementById('errorAddress');

// Exercise 6
function validate() {
    // Validate fields entered by the user: name, phone, password, and email

    // hide all message errors
    var listerrors = document.querySelectorAll(".error");
    for (let i = 0; i < listerrors.length; i++) {
        var error = listerrors[i];
        error.style.display = 'none';
    }

    // set inputs ok
    var wrongInputs = document.querySelectorAll(".wrongInput");
    
    for (let i = 0; i < wrongInputs.length; i++) {
        var input = wrongInputs[i];
        input.classList.remove('wrongInput');
    }

    // create a variable to count the errors
    var errors = 0;
    
    // validation 
    if(nameperson.value.length < 3 || nameperson.value.length >=3 && /\d/.test(nameperson.value)){
        errors++;
        errorName.style.display= 'block';
        nameperson.classList.add("wrongInput");
    }
    if(lastname.value.length < 3 || lastname.value.length >=3 && /\d/.test(lastname.value)){
        errors++;
        errorLastName.style.display= 'block';
        lastname.classList.add("wrongInput");
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.length < 3 || email.value.length >= 3 && !email.value.match(mailformat)){
        errors++;
        errorEmail.style.display= 'block';
        email.classList.add("wrongInput");
    }
    if(address.value.length < 3){
        errors++;
        errorAddress.style.display= 'block';
        address.classList.add("wrongInput");
    }
    if(! /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/.test(password.value)){
        errors++;
        errorPassword.style.display= 'block';
        password.classList.add("wrongInput");
    }
    if(! /^\d{3,}$/.test(phone.value)){
        errors++;
        errorPhone.style.display= 'block';
        phone.classList.add("wrongInput");
    }
	
    if(errors > 0){
        return false;
    }else{
        $( "#form" ).submit();
    }
}