console.log('login success')

const InpUser = document.querySelector('#username'),
    InpPass = document.querySelector('#password'),
    errorLogin = document.querySelector('#errorLogin'),
    formLogin = document.querySelector('#form-login'),
    errorPass = document.querySelector('#errorPassword'),
    errorUsername = document.querySelector('#errorUsername');

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

InpUser.addEventListener('keyup', () => {
    errorLogin.innerHTML = null;
})

InpPass.addEventListener('keyup', () => {
    errorLogin.innerHTML = null;
})

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    let error1 = false;
    let error2 = false;
    let result = await verifyUsername(InpUser.value);
    if (InpUser.value == "" || InpPass.value == "") {
        errorLogin.innerHTML = "Verificar los campos vacios.";
        error1 = true;
    }else{
        error1=false;
    }
    if (!result) {
        errorLogin.innerHTML = "El usuario o la contraseña son invalidos.";
        error2 = true;
    }else{
        error2 = false;
    }

    if(error1 == false && error2 == false ){
        e.target.submit()
    }
})