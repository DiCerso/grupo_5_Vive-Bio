console.log('edit profile success')

const regExLetter = /^[a-zA-ZÀ-ÿ\s]{2,20}$/;
const regExEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const regExName = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
const regExPass = /^[a-zA-Z0-9\_\-]{5,12}$/;
const regImage = /(.jpg|.jpeg|.png)$/;
const inputs = document.querySelectorAll('#edit-form input');
const popInputs = document.querySelectorAll('#form-popup input');
const formpop = document.querySelector('#form-popup');
const errorUsername = document.querySelector("#errorUsername"),
    errorFirstname = document.querySelector('#errorFirstname'),
    errorLastname = document.querySelector('#errorLastname'),
    InpUser = document.querySelector('#username'),
    InpFirstname = document.querySelector('#firstname'),
    InpLastname = document.querySelector('#lastname'),
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
    errorSubmit = document.querySelector('#errorSubmit'),
    sabeEdit = document.querySelector('#btn-save-edit'),
    formEdit = document.querySelector('#edit-form'),
    impImage = document.querySelector('#image');
const deleteForm = document.querySelector('#profile_user_delete')

/* Start Event Buttons */

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

btnopen.addEventListener('click', () => {
    popup.classList.add('show-popup')
})

/* End Event Buttons */

/* Start Validations apis */
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

const checkEditUsername = async (username) => {
    try {
        let response = await fetch("/api/users/check-edit-user", {
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

/* End Validations apis */

/* Start verifications camps */

const verifyCamp = (exp, input, error, inputerror) => {
    if (input.value == "") {
        error.innerHTML = "Este campo no puede estar vacio.";
        inputerror.classList.add('active-error');
    } else {
        if (exp.test(input.value)) {
            error.innerHTML = null;
            inputerror.classList.remove('active-error');
        } else {
            switch (input.name) {
                case "firstname":
                    InpFirstname.classList.add('active-error');
                    error.innerHTML =
                        "Este campo solo puede tener letras y mínimo 2 caracteres.";

                    break;
                case "lastname":
                    InpLastname.classList.add('active-error');
                    error.innerHTML =
                        "Este campo solo puede tener letras y mínimo 2 caracteres.";
                    break;
                case "username":
                    InpUser.classList.add('active-error');
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
            verifyCamp(regExName, e.target, errorFirstname, InpFirstname)
            break;
        case "lastname":
            verifyCamp(regExName, e.target, errorLastname, InpLastname)
            break;
        case "username":
            let resultCheckEditUser = await checkEditUsername(e.target.value);
            if (resultCheckEditUser) {
                InpUser.classList.add("active-error")
                errorUsername.innerHTML = "Este usuario ya se encuentra en uso.";
            } else {
                verifyCamp(regExLetter, e.target, errorUsername, InpUser);
            }
            break;
    }
};

/* End verifications camps */

/* Start Events  Validations */

Newpassword.addEventListener('keyup', (e) => {
    if (e.target.value != Newpassword2.value) {
        Newpassword2.value = "";
    }
})

const elementosPop = formpop.elements;

formpop.addEventListener('submit', (e) => {
    e.preventDefault();
    error = false;
    for (let i = 0; i < elementosPop.length - 1; i++) {
        if (elementosPop[i].classList.contains('active-error') || elementosPop[i].value == "") {
            error = true;
        }
    }
    if (error) {
        errorSubmit.innerHTML = "Campos invalidos o vacíos.";
    } else {
        Swal.fire({
            title: "Cambio de contraseña exitoso!",
            icon: "success",
            position: 'center'
        })

        setTimeout(() => {
            e.target.submit();
        }, 1200);

    }
})

formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    if (InpFirstname.classList.contains('active-error') || InpLastname.classList.contains('active-error') || InpUser.classList.contains('active-error')) {
        errorSubmitDats.innerHTML = "Verificar los campos.";
    } else {
        Swal.fire({
            title: "Cambio exitoso!",
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

popInputs.forEach((input) => {
    input.addEventListener("blur", validarPass);
});

impImage.addEventListener('change', () => {
    let fileInput = document.getElementById('image');
    let filePath = fileInput.value;
    if (!regImage.exec(filePath)) {
        errorImage.innerHTML = "Subir archivo con extensiones válidas: .jpeg/.jpg/.png";
        impImage.classList.add('register_error_input');
        fileInput.value = '';
    } else {
        for (let i = 0; i < fileInput.files.length; i++) {
            const element = URL.createObjectURL(fileInput.files[i]);
            const imagen = document.createElement("img");
            imagen.setAttribute('class', "previewAvatar")
            imagen.src = element;
            document.querySelector('#box-image-preview').appendChild(imagen);
        }
        deletePreview.style.display = "flex"
    }
})



deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    Swal.fire({
        customClass: {
            confirmButton: 'swalBtnColor',
            cancelButton: 'swalBtnColor'
        },

        title: '¿Seguro que deseas eliminar tu usuario?',
        text: "Acción irreversible!",
        icon: 'warning',
        background: "#ebebeb",
        showCancelButton: true,
        confirmButtonColor: '#7ff77f',
        cancelButtonColor: '#cc4141',
        confirmButtonText: 'Eliminar',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },

    }).then((result) => {
        if (result.isConfirmed) {
            e.target.submit()
        }

    })
})

/* End Events  Validations */
