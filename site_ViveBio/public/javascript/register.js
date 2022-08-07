console.log("register success");

const regExLetter = /^[a-zA-Z0-9\_\-]{4,8}$/;
const regExName = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
const regExPass = /^[a-zA-Z0-9\_\-]{5,12}$/;
const inputs = document.querySelectorAll("#register-form input");
const errorUsername = document.querySelector("#errorUsername"),
    errorUsernameCross = document.querySelector("#errorUsernameCross"),
    errorEmail = document.querySelector("#errorEmail"),
    errorEmailCross = document.querySelector("#errorEmailCross"),
    errorFirstname = document.querySelector('#errorFirstname'),
    errorFirstnameCross = document.querySelector('#errorFirstnameCross'),
    errorLastname = document.querySelector('#errorLastname'),
    errorLastnameCross = document.querySelector('#errorLastnameCross'),
    errorPassword = document.querySelector('#errorPassword'),
    errorPasswordCross = document.querySelector('#errorPasswordCross'),
    password = document.querySelector('#password'),
    password2 = document.querySelector('#password2'),
    errorPassword2 = document.querySelector('#errorPassword2'),
    errorPassword2Cross = document.querySelector('#errorPassword2Cross'),
    errorTerminos = document.querySelector('#errorTerminos'),
    InpTerminos = document.querySelector('#terminos'),
    registerForm = document.querySelector('#register-form'),
    errorSubmitLogin = document.querySelector('#errorSubmitLogin');

const elementos = registerForm.elements;

/*  Start API checks camps */

const verifyUsername = async (username) => {
    try {
        let response = await fetch("/api/users/check-username", {
            method: "POST",
            body: JSON.stringify({
                username: username,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let result = await response.json();
        return result.data;
    } catch (error) {
        console.error;
    }
};



const verifyEmail = async (email) => {
    try {
        let response = await fetch("/api/users/check-email", {
            method: "POST",
            body: JSON.stringify({
                email: email,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let result = await response.json();
        return result.data;
    } catch (error) {
        console.error;
    }
};

/*  End API checks camps */

/* Start FUNCTIONS verify camps */

const verifyCamp = (exp, input, error, errorCross) => {
    if (input.value == "") {
        error.innerHTML = "Este campo no puede estar vacio.";
        error.classList.add('active-error');
        input.classList.add('register_error_input');
    } else {
        if (exp.test(input.value)) {
            error.innerHTML = null;
            errorCross.classList.remove("register_error_icon");
            input.classList.remove('register_error_input');
        } else {
            switch (input.name) {
                case "firstname":
                    error.innerHTML =
                        "Este campo solo puede tener letras y mínimo 2 caracteres.";
                    errorCross.classList.add("register_error_icon")
                    input.classList.add('register_error_input');
                    break;
                case "lastname":
                    error.innerHTML =
                        "Este campo solo puede tener letras y mínimo 2 caracteres.";
                    errorCross.classList.add("register_error_icon");
                    input.classList.add('register_error_input');
                    break;
                case "password":
                    error.innerHTML =
                        "Este campo tiene que tener entre 5 y 12 caracteres.";
                    errorCross.classList.add("register_error_icon");
                    input.classList.add('register_error_input');
                    break;
                case "username":
                    error.innerHTML = "Este usuario debe tener entre 4 y 8 caracteres de letras o números.";
                    errorCross.classList.add("register_error_icon");
                    input.classList.add('register_error_input');
                    break;
                case "email":
                    error.innerHTML = "Formato de Email invalido.";
                    errorCross.classList.add("register_error_icon");
                    input.classList.add('register_error_input');
                    break;
            }
        }
    }
}

const validarFormulario = async (e) => {
    errorSubmitLogin.innerHTML = null;
    switch (e.target.name) {
        case "firstname":
            verifyCamp(regExName, e.target, errorFirstname, errorFirstnameCross)
            break;
        case "lastname":
            verifyCamp(regExName, e.target, errorLastname, errorLastnameCross)
            break;
        case "password":
            if (password2.value !== password.value) {
                password2.value = "";
            }
            verifyCamp(regExPass, e.target, errorPassword, errorPasswordCross);
            break;
        case "password2":
            if (e.target.value == "") {
                errorPassword2.innerHTML = null;
                errorPassword2Cross.classList.remove("register_error_icon");
            } else {
                if (password.value === e.target.value) {
                    errorPassword2.innerHTML = null;
                    errorPassword2Cross.classList.remove("register_error_icon");
                } else {
                    errorPassword2.innerHTML =
                        "Las contraseñas no coinciden.";
                    errorPassword2Cross.classList.add("register_error_icon");
                }
            }
            break;
        case "username":
            let resultUser = await verifyUsername(e.target.value);
            if (resultUser) {
                errorUsername.innerHTML = "Este usuario ya se encuentra en uso.";
                errorUsernameCross.classList.add("register_error_icon");
                e.target.classList.add('register_error_input');
            } else {
                verifyCamp(regExLetter, e.target, errorUsername, errorUsernameCross);
            }
            break;
        case "email":
            let resultEmail = await verifyEmail(e.target.value);
            if (resultEmail) {
                errorEmail.innerHTML = "Este Email ya se encuentra en uso.";
                errorEmailCross.classList.add("register_error_icon");
                e.target.classList.add('register_error_input');
            } else {
                verifyCamp(regExEmail, e.target, errorEmail, errorEmailCross)
            }
            break;

        default:
            break;
    }
};

/* End FUNCTIONS verify camps */

/* Start Events */

InpTerminos.addEventListener('click', () => {
    if (InpTerminos.checked) {
        errorTerminos.innerHTML = null;
        InpTerminos.classList.remove('register_error_input_terminos');
    } else {
        errorTerminos.innerHTML = "Debes aceptar los terminos y condiciones.";
        InpTerminos.classList.add('register_error_input_terminos');
    }
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    error = false;
    for (let i = 0; i < elementos.length - 3; i++) {
        if (elementos[i].classList.contains('register_error_input') || elementos[i].value == "" || InpTerminos.classList.contains('register_error_input_terminos')) {
            error = true;
        }
    }
    if (error) {
        errorSubmitLogin.innerHTML = "Verificar los campos con errores o vacíos.";
    } else {
        errorSubmitLogin.innerHTML = null;
        Swal.fire({
            title: "Registro exitoso!",
            icon: "success",
            position: 'center'
        })
        setTimeout(() => {
            e.target.submit();
        }, 1200);
    }
})


inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

/* End Events */