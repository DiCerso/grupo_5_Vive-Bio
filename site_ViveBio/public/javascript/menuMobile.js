const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");
const burger = document.querySelector("#burger")
const navclose = document.querySelector('.navClose')
btnMenu.addEventListener("click",function(){
    burger.classList.toggle('active')
    navclose.classList.toggle('active')
    menu.classList.toggle("mostrar")  
});