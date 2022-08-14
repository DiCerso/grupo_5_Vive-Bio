window.addEventListener('load', () => {
  console.log("Estoy vinculado");
  let forms = document.querySelectorAll('#eliminar-producto');
  for (let i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', event => {
              event.preventDefault();
              Swal.fire({
              customClass: {
                  confirmButton: 'swalBtnColor',
                  cancelButton: 'swalBtnColor'
              },

              title: '¿Quieres eliminar el producto?',
              text: "Acción irreversible!",
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
  


