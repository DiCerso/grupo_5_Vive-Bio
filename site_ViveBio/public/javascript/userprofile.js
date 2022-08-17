let ubication = document.querySelector(".user__ubication");
let datos = document.querySelector(".user__dats-container")


let user = async function (value) {
    try {
        let result = await fetch(`/api/users/search?keyword=${value}`)
        let users = await result.json()
        console.log(users)
        return users
    } catch (error) {
        console.log(error)
    }

}

ubication.addEventListener('click', async function () {
    let usuario = await user(document.querySelector(".user__info h4").innerHTML)
    console.log(usuario.data.user[0].username)
    datos.innerHTML = null;
    datos.innerHTML = `
        <div class="user__ubication__datos">
            <div class="ubication__datos">
                <a class="back__ubication" style="cursor:pointer;" onclick="prueba('${usuario.data.user[0].username}')">volver atras</a>
                <div class="user__info-title">
                    <h2 style="text-decoration: underline;">Datos de ubicacion</h2>
                </div>
            </div>
        </div>
    `
})



let prueba = async function (dato) {
    try {
        let usuario = await user(dato);
        console.log(usuario)
        datos.innerHTML = `<div class="user__dats">
    <div class="user__info-title">
        <h2 style="text-decoration: underline;">Datos del usuario</h2>
    </div>
    <div class="user__info">
        <h3> Usuario: </h3>
        <h4>${usuario.data.user[0].username}</h4>

    </div>
    <div class="user__info">
        <h3>Email: </h3>
        <h4>
        ${usuario.data.user[0].email}
        </h4>
    </div>
    <div class="user__info">
        <h3>Rol : </h3>
        <h4>
        ${usuario.data.user[0].rol.name}
        </h4>
    </div>
        </div>
        <div class="user__historial">
    <h3>Historial de compras:</h3>
    <h4>No se encontraron compras realizadas</h4>
        </div>`
    } catch (error) {
        console.log(error)
    }

}

window.addEventListener('load', async function () {
    console.log("userprofile success!!")

})
