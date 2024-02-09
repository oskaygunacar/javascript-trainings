const form = document.getElementById('form')
const username = document.getElementById('username') 
const email = document.getElementById('email')
const password = document.getElementById('password')
const repassword = document.getElementById('repassword')


function error(input, message) {
    input.className = 'form-control is-invalid'
    let div = input.nextElementSibling
    div.innerHTML = message ? `<b>${message}</b>`:`<b>${input.previousElementSibling.innerText} cant be empty.</b>` // ternary (short if)
    div.className = 'invalid-feedback'
}

function success(input) { // input = element
    input.className = 'form-control is-valid'
}

function checkRequired(inputs) {
    inputs.forEach(function(input){
        if (input.value === '') {
            error(input)
        } else {
           success(input)
        }
    })

}

function checkLength(input, min, max){
    if (input.value.length < min) {
        error(input, message=`${input.id} cant be less than ${min} characters.`)
        return false
    } else if (input.value.length > max) {
        error(input, message=`${input.id} cant be longer than ${max} characters.`)
        return false
    } else {
        success(input)
        return true
    }
}

function checkPassword(pass1, pass2) {
    if (pass1.value != pass2.value) {
        error(pass1, 'Password are not identical!')
        error(pass2, 'Password are not identical!')
    } else {
        success(pass1)
        success(pass2)
    }
}

form.addEventListener('submit', function(event){
    event.preventDefault();

    checkRequired([email]);
    checkLength(username, 3, 50)

    password_length = checkLength(password,7, 50)
    password2_length = checkLength(repassword,7, 50)

    if (password_length && password2_length) {
        checkPassword(password, repassword)
    }

});