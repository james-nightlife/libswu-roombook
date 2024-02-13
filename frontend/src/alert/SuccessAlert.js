import Swal from "sweetalert2";

const SuccessAlert = (response, redir = '/') => {
    Swal.fire({
        title: 'สำเร็จ',
        text: response,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        allowOutsideClick: false,
     }).then(() => {
        window.location.href = redir;
    })
}

export {SuccessAlert}