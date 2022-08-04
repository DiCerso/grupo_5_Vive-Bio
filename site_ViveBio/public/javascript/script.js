console.log('script success')
const formDelete = document.getElementById('delete-product-form');

function confirmDelete(){
    let response = confirm('¿Estás seguro que deseas eliminar este producto?');

    if(response == true){
        return true
    }else{
        return false
    }
}
