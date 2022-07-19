console.log('script succes')

/* const buttonDelete = document.getElementById('buttonDelete'); */
const formDelete = document.getElementById('delete-product-form');

function confirmDelete(){
    let response = confirm('¿Estas seguro que deseas eliminar este producto?');

    if(response == true){
        return true
    }else{
        return false
    }
}

/* formDelete.addEventListener('submit',(e)=>{
    if(!isValid){
        e.preventDefault();
    }
}) */
