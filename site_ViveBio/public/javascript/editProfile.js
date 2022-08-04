

console.log('edit profile success')

const regExLetter = /^[a-zA-Z0-9\_\-]{4,8}$/;
const regExName = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
const regExPass = /^[a-zA-Z0-9\_\-]{5,12}$/;
const inputs = document.querySelectorAll("#edit-form input");
const popInputs = document.querySelectorAll('#form-popup');
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
    btnopen = document.querySelector('#btn-change-pass');

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
})

const findUser = async (password) => {
    try {
        let response = await fetch("/api/users/finduser", {
            method: "GET",
            body: JSON.stringify({
                password: password
            }),
            headers: {
                "Content-Type": "aplication/json",
            },
        });
        let result = await response.json()
        return result.data

    } catch (error) {
        console.log(error);
    }
}


OldPassword.addEventListener('blur', async () => {
    let result = await findUser(OldPassword.value)
    if (result) {
        alert('Contraseña correcta')
    } else {
        alert('contraseña incorrecta')
    }
})

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

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

/* popInputs.forEach((input) => {
    input.addEventListener("blur", validarFormulario);
});
 */