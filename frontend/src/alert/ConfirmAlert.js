import Swal from "sweetalert2"

const ConfirmAlert = async ({title, text, html}, callback) => {
    Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        html
    }).then(async (confirm) => {
        if(confirm.isConfirmed){
            await callback();
        }
    })
}

export {ConfirmAlert}