

console.log('edit profile success')

const regExLetter = /^[a-zA-Z0-9\_\-]{4,8}$/;
const regExName = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
const regExPass = /^[a-zA-Z0-9\_\-]{5,12}$/;
const inputs = document.querySelectorAll("#edit-form input");
const popInputs = document.querySelectorAll('#form-popup input');
const formpop = document.querySelector('#form-popup');
const errorUsername = document.querySelector("#errorUsername"),
    errorFirstname = document.querySelector('#errorFirstname'),
    errorLastname = document.querySelector('#errorLastname'),
    eye1 = document.querySelector('#eye1'),
    eye2 = document.querySelector('#eye2'),
    eye3 = document.querySelector('#eye3'),
    OldPassword = document.querySelector('#OldPassword'),
    Newpassword = document.querySelector('#Newpassword'),
    Newpassword2 = document.querySelector('#Newpassword2'),
    btnclose = document.querySelector('#btn-close-popup'),
    popup = document.querySelector('#popup'),
    btnopen = document.querySelector('#btn-change-pass'),
    errorOldPassword = document.querySelector('#errorOldPassword'),
    errorNewpassword = document.querySelector('#errorNewpassword'),
    errorNewpassword2 = document.querySelector('#errorNewpassword2'),
    errorSubmit = document.querySelector('#errorSubmit');

eye1.addEventListener('click', () => {
    if (OldPassword.type === "password") {
        OldPassword.setAttribute("type", "text")
        eye1.setAttribute("class", "fas fa-eye-slash")
    } else {
        OldPassword.setAttribute("type", "password")
        eye1.setAttribute("class", "fas fa-eye")
    }
})
eye2.addEventListener('click', () => {
    if (Newpassword.type === "password") {
        Newpassword.setAttribute("type", "text")
        eye2.setAttribute("class", "fas fa-eye-slash")
    } else {
        Newpassword.setAttribute("type", "password")
        eye2.setAttribute("class", "fas fa-eye")
    }
})
eye3.addEventListener('click', () => {
    if (Newpassword2.type === "password") {
        Newpassword2.setAttribute("type", "text")
        eye3.setAttribute("class", "fas fa-eye-slash")
    } else {
        Newpassword2.setAttribute("type", "password")
        eye3.setAttribute("class", "fas fa-eye")
    }
})

btnclose.addEventListener('click', () => {
    popup.classList.remove('show-popup')
})

btnopen.addEventListener('click', () => {
    popup.classList.add('show-popup')
    OldPassword.value = "";
    Newpassword.value = "";
    Newpassword2.value = "";
    OldPassword.classList.remove("active-error");
    Newpassword.classList.remove("active-error");
    Newpassword2.classList.remove("active-error");
    errorOldPassword.innerHTML = null;
    errorNewpassword.innerHTML = null;
    errorNewpassword2.innerHTML = null;
})

const checkPassword = async (password) => {
    try {
        let response = await fetch("/api/users/check-password", {
            method: "POST",
            body: JSON.stringify({
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        let result = await response.json()
        return result.data

    } catch (error) {
        console.log(error);
    }
}

const verifyUsername = async (username) => {
    try {
        let response = await fetch("/api/users/check-username", {
            method: "POST",
            body: JSON.stringify({
                username: username,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        let result = await response.json();
        return result.data;
    } catch (error) {
        console.error;
    }
};
const verifyCamp = (exp, input, error) => {
    if (input.value == "") {
        error.innerHTML = "Este campo no puede estar vacio.";
    } else {
        if (exp.test(input.value)) {
            error.innerHTML = null;
        } else {
            switch (input.name) {
                case "firstname":
                    error.innerHTML =
                        "Este campo solo puede tener letras y mínimo 2 caracteres.";

                    break;
                case "lastname":
                    error.innerHTML =
                        "Este campo solo puede tener letras y mínimo 2 caracteres.";
                    break;
                case "username":
                    error.innerHTML = "Este usuario debe tener entre 4 y 8 caracteres de letras o números.";
                    break;
            }
        }
    }
}

const validarPass = async (e) => {
    switch (e.target.name) {
        case "OldPassword":
            let resulPassword = await checkPassword(e.target.value);
            if (e.target.value == "") {
                errorOldPassword.innerHTML = "Este campo no puede estar vacío.";
                OldPassword.classList.add("active-error")
            } else {
                if (resulPassword) {
                    errorOldPassword.innerHTML = null;
                    OldPassword.classList.remove("active-error")

                } else {
                    errorOldPassword.innerHTML = "La contraseña invalida.";
                    OldPassword.classList.add("active-error")
                }
            }
            break;
        case "Newpassword":
            if (e.target.value != Newpassword2.value) {
                Newpassword2.value = "";
            }
            if (e.target.value == "") {
                errorNewpassword.innerHTML = "Este campo no puede estar vacío.";
                Newpassword.classList.add("active-error")
            } else {
                if (regExPass.test(e.target.value)) {
                    errorNewpassword.innerHTML = null;
                    Newpassword.classList.remove("active-error");
                } else {
                    errorNewpassword.innerHTML = "La contraseña debe tener entre 5 y 12 caracteres de números o letras.";
                    Newpassword.classList.add("active-error");
                }
            }
            break;
        case "Newpassword2":
            if (Newpassword.value === e.target.value) {
                errorNewpassword2.innerHTML = null;
                Newpassword2.classList.remove("active-error")
            } else {
                errorNewpassword2.innerHTML =
                    "Las contraseñas no coinciden.";
                Newpassword2.classList.add("active-error")
            }
            break;
    }
}

const validarFormulario = async (e) => {

    switch (e.target.name) {
        case "firstname":
            verifyCamp(regExName, e.target, errorFirstname)
            break;
        case "lastname":
            verifyCamp(regExName, e.target, errorLastname)
            break;
        case "username":
            let resultUser = await verifyUsername(e.target.value);

            if (resultUser) {
                errorUsername.innerHTML = "Este usuario ya se encuentra en uso.";
            } else {
                verifyCamp(regExLetter, e.target, errorUsername);
            }
            break;
    }
};

Newpassword.addEventListener('keyup', (e) => {
    if (e.target.value != Newpassword2.value) {
        Newpassword2.value = "";
    }
})

formpop.addEventListener('submit', (e) => {
    e.preventDefault();
    if (OldPassword.value == "" || Newpassword.value == "" || Newpassword2.value == "") {
        errorSubmit.innerHTML = "Los campos no pueden estar vacíos."
    } else {
        errorSubmit.innerHTML = null;
        if (OldPassword.classList.contains('active-error') || Newpassword.classList.contains('active-error') || Newpassword2.classList.contains('active-error')) {
            errorSubmit.innerHTML = "Verificar que los campos esten completos correctamente.";
        } else {
            errorSubmit.innerHTML = null;
            e.submit();
        }
    }

})

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

popInputs.forEach((input) => {
    input.addEventListener("blur", validarPass);
});
