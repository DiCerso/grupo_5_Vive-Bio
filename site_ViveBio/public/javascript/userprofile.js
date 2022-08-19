let ubication = document.querySelector(".user__ubication");
let datos = document.querySelector(".user__dats-container")




let provincias = async function(username){
    try {
        let response = await fetch('https://apis.datos.gob.ar/georef/api/provincias')
        let provinces = await response.json();
        let usuario = await user(username)
        if(usuario.data.user[0].ubication != null){
            let dato = await fetch('https://apis.datos.gob.ar/georef/api/localidades?max=1000&nombre=' + usuario.data.user[0].ubication);
            let datoMuni = await dato.json()
            provinces.provincias.forEach(provincia => {
                if(datoMuni.localidades[0].provincia.nombre == provincia.nombre){
                    document.querySelector("#provinciaSelect").innerHTML += `<option value="${provincia.nombre}" selected> ${provincia.nombre} </option>` 
                    actMuni(usuario.data.user[0].ubication)
                }else{
                    document.querySelector("#provinciaSelect").innerHTML += `<option value="${provincia.nombre}"> ${provincia.nombre} </option>` 
                }
            })
        }else{
            provinces.provincias.forEach(provincia => {
                    document.querySelector("#provinciaSelect").innerHTML += `<option value="${provincia.nombre}"> ${provincia.nombre} </option>` 
            })
        }
    } catch (error) {
        console.log(error);
    }
}

let actMuni  = async function(ubication){
    try {
        let response = await fetch('https://apis.datos.gob.ar/georef/api/localidades?max=1000&provincia=' + document.querySelector("#provinciaSelect").value);
        let result = await response.json()
        let Muni = document.querySelector("#municipioSelect")
        if(!ubication){
            Muni.innerHTML = `<option value="">Seleccione un Municipio</option>`
            result.localidades.forEach(localidad => {
                Muni.innerHTML += `<option value="${localidad.nombre}"> ${localidad.nombre} </option>` //agrego un option con el nombre de la provincia cargado
            })
        }else{
            result.localidades.forEach(localidad => {
                if(ubication == localidad.nombre){
                    Muni.innerHTML += `<option value="${localidad.nombre}" selected> ${localidad.nombre} </option>` //agrego un option con el nombre de la provincia cargado

                }
                Muni.innerHTML += `<option value="${localidad.nombre}"> ${localidad.nombre} </option>` //agrego un option con el nombre de la provincia cargado
            })
        }
    } catch (error) {
        console.log(error)
    }
}


let ubicationuser = async function(ubication, id){
    try {
        let vali = await fetch('/api/users/changeubication', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                ubication: ubication
            })
        })
    } catch (error) {
        console.log(error)
    }
}


let user = async function (value) {
    try {
        let result = await fetch(`/api/users/search?keyword=${value}`)
        let users = await result.json()
        return users
    } catch (error) {
        console.log(error)
    }
}

ubication.addEventListener('click', async function () {
    let usuario = await user(document.querySelector(".user__info h4").innerHTML)
    datos.innerHTML = null;
    ubication.style.display = "none";
    datos.innerHTML = `
        <div class="user__ubication__datos">
            <div class="ubication__datos">
                <a class="back__ubication" style="cursor:pointer;" onclick="back_profile('${usuario.data.user[0].username}')">volver atras</a>
                <div class="user__info-title">
                    <h2 style="text-decoration: underline;">Datos de ubicación</h2>
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
            <a class="accept__ubication" style="cursor:pointer;" onclick="enviar_ubi('${usuario.data.user[0].id}','${usuario.data.user[0].username}')" >Enviar</a>
        </div>
    `
    provincias(usuario.data.user[0].username);
})

let enviar_ubi = async function(id, name){
    try {
        let selectMuni = document.querySelector("#municipioSelect")
        let ubication = selectMuni.value;
        if(ubication != ''){
            await ubicationuser(ubication, id);
            await back_profile(name)
        }else{
            console.log("error")//elimina su municipio
            await ubicationuser(null, id);
            await back_profile(name)
        }
    } catch (error) {
        console.log(error)
    }
}
 

let back_profile = async function (dato) {
    try {
        let usuario = await user(dato);
        ubication.style.display = "flex"
        if(usuario.data.user[0].ubication != null){
            ubication.innerHTML = `Cambiar ubicación`
        }
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
        ubication.innerHTML = `Cambiar ubicación`
    }
})
