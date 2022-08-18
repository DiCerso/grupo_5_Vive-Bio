let ubication = document.querySelector(".user__ubication");
let datos = document.querySelector(".user__dats-container")




let provincias = async function(){
    try {
        let response = await fetch('https://apis.datos.gob.ar/georef/api/provincias')
        let provinces = await response.json();
        provinces.provincias.forEach(provincia => {
            document.querySelector("#provinciaSelect").innerHTML += `<option value=${provincia.id}> ${provincia.nombre} </option>` //agrego un option con el nombre de la provincia cargado
        })
    } catch (error) {
        console.log(error);
    }
}

let actMuni  = async function(){
    try {
        let response = await fetch('https://apis.datos.gob.ar/georef/api/localidades?max=1000&provincia=' + document.querySelector("#provinciaSelect").value);
        let result = await response.json()
        let Muni = document.querySelector("#municipioSelect")
        Muni.innerHTML = `<option value="">Seleccione un Municipio</option>`

        result.localidades.forEach(localidad => {
            Muni.innerHTML += `<option value=${localidad.id}> ${localidad.nombre} </option>` //agrego un option con el nombre de la provincia cargado
        })

        
    } catch (error) {
        
    }
}




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
    ubication.style.display = "none";
    datos.innerHTML = `
        <div class="user__ubication__datos">
            <div class="ubication__datos">
                <a class="back__ubication" style="cursor:pointer;" onclick="prueba('${usuario.data.user[0].username}')">volver atras</a>
                <div class="user__info-title">
                    <h2 style="text-decoration: underline;">Datos de ubicacion</h2>
                </div>
            </div>
            <div class="ubication__provincias">                
                <label for="">Provincia:</label>
                <select class="form-control" id="provinciaSelect" onChange="actMuni()">
                    <option value="">Seleccione una provincia</option>
                </select>
            </div>
            <div class="ubication__municipio">                
                <label for="">Municipio:</label>
                <select class="form-control" id="municipioSelect">
                    <option value="">Seleccione un Municipio</option>
                </select>
            </div>
            <a class="accept__ubication" style="cursor:pointer;">Enviar</a>
        </div>
    `
    provincias();
})



let prueba = async function (dato) {
    try {
        let usuario = await user(dato);
        console.log(usuario)
        ubication.style.display = "flex"
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
    let usuario = await user(document.querySelector(".user__info h4").innerHTML)
    if(usuario.data.user[0].ubication != null){
        ubication.innerHTML = `Cambiar ubicacion`
    }
    

})
