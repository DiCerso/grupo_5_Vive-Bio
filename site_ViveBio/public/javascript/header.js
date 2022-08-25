window.addEventListener('load', async function(){
    let usuarioUbication = async function (value) {
        try {
            let result = await fetch(`/api/users/search?keyword=${value}`)
            let users = await result.json()
            return users
        } catch (error) {
            console.log(error)
        }
    }
    console.log("header success!!")
    if(document.querySelector(".header__user a p").innerHTML != "Logueate"){
        let dat = await usuarioUbication(document.querySelector(".header__user a p").innerHTML)
        if(dat.data.user[0].ubication != null){
            document.querySelector(".header__localizacion a").textContent = `${dat.data.user[0].ubication}`
        }
    }


})