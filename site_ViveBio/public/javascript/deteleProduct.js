window.addEventListener('load', () => {
  let forms = document.querySelectorAll('#eliminar-producto');
  for (let i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', event => {
              event.preventDefault();
              Swal.fire({
              customClass: {
                  confirmButton: 'swalBtnColor',
                  cancelButton: 'swalBtnColor'
              },

              title: '¿Estas seguro que quieres eliminar el producto?',
              text: "Esta accion es irreversible!",
              icon: 'warning',
              background: "#ebebeb",
              showCancelButton: true,
              confirmButtonColor: '#7ff77f',
              cancelButtonColor: '#cc4141',
              confirmButtonText: 'Eliminar',
              showClass: {
                  popup: 'animate__animated animate__fadeInDown'
              },

              }).then((result) => {

                  if (result.isConfirmed) {
                      forms[i].submit();
                  }

              })
      })
  }
})
  


