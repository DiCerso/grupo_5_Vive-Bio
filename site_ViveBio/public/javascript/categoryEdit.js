console.log('categoryEdit.js success!');

const formulario = document.querySelector('form.categoryEdit')
const forms = document.querySelectorAll('form.categoryEdit')
const cname = document.querySelector('#name')
const description = document.querySelector('#description')

const expresiones = {
    categoryName: /^[a-zA-ZÀ-ÿ\s]{5,20}$/, // Letras y espacios, pueden llevar acentos. Entre 5 y 20.
    images: /(.jpg|.jpeg|.png)$/,
    description: /^[a-zA-ZÀ-ÿ\s]{20,200}$/, // Letras y espacios, pueden llevar acentos. Entre 20 y 200.
}

window.addEventListener("load", function () {


    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "cname":
                if (expresiones.categoryName.test(e.target.value)) {
                    productName.classList.remove("errorActive")
                    productName.classList.add("errorInactive")
                    errorName.innerHTML = null;
                    errors = false
                }
                else {
                    errorName.innerHTML = " Entre 5 y 20 letras, espacios y acentos.";
                    productName.classList.remove("errorInactive")
                    productName.classList.add("errorActive")
                    errors = true
                }
                break;
            case "description":
                if (expresiones.description.test(e.target.value)) {
                    description.classList.remove("errorActive")
                    description.classList.add("errorInactive")
                    errorDescription.innerHTML = null;
                    errors = false
                } else {
                    errorDescription.innerHTML = "Entre 20 y 200 letras, espacios y acentos.";
                    description.classList.remove("errorInactive")
                    description.classList.add("errorActive")
                    errors = true
                }
                break;
        }
    }

    forms.forEach((form) => {
        form.addEventListener('keyup', validarFormulario);
        form.addEventListener('blur', validarFormulario);
    });


    /*Image validation*/
    image.addEventListener('change',
        function fileValidation() {
            var fileInput = document.getElementById('image');
            var filePath = fileInput.value;
            if (!expresiones.images.exec(filePath)) {
                errorImages.innerHTML = "Subir archivo con extensiones válidas: .jpeg/.jpg/.png";
                fileInput.value = '';
                errors = true
                return false;
                
            } else {
                /*Image preview*/
                if (fileInput.files && fileInput.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        document.getElementById('imagePreview').innerHTML = '<img src="' + e.target.result + '"/>';
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                    errors = false
                    errorImages.innerHTML = null ;
                }

            }
        })


 /* Validation submit */
 formulario.addEventListener('submit', function (e) {

    forms.forEach((form) => {
        if (form.classList.contains('errorActive') || errors == true ){
            e.preventDefault()
                    errors = true;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Por favor, revisa los campos editados, no pueden quedar vacíos',
                      })

        }else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Categoría editada con éxito',
                showConfirmButton: false,
                timer: 2200
              })
                formulario.submit();
            }
        })
    })
})