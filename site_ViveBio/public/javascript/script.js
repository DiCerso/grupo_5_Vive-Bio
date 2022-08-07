console.log('script success')
const formDelete = document.getElementById('delete-product-form');

function confirmDelete(){
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir tu decisión.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'Producto eliminado con éxito.',
          )
        }
      })

    if(response == true){
        return true
    }else{
        return false
    }
}
