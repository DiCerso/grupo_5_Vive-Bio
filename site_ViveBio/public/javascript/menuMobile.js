const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");
const shadow = document.querySelector("#shadow");
const headerMobile = document.querySelector("#header_mobile")

btnMenu.addEventListener("click",function(){
    menu.classList.toggle("mostrar")
    shadow.classList.toggle("mostrar2")
    headerMobile.classList.toggle("fix_nav")
});