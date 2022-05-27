const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");
const shadow = document.querySelector("#shadow");

btnMenu.addEventListener("click",function(){
    menu.classList.toggle("mostrar")
    shadow.classList.toggle("mostrar2")
});