


let usuarioUbication = async function (value) {
    try {
        let result = await fetch(`/api/users/search?keyword=${value}`)
        let users = await result.json()
        return users
    } catch (error) {
        console.log(error)
    }
}

window.addEventListener('load', async function(){
    console.log("header success!!")
    if(document.querySelector(".header__user a p").innerHTML != "Logueate"){
        let dat = await usuarioUbication(document.querySelector(".header__user a p").innerHTML)
        console.log(dat)
        document.querySelector(".header__localizacion a").textContent = `${dat.data.user[0].ubication}`
    }


})