import Swal from "sweetalert2";

const FailAlert = (text) => {
    Swal.fire({
        title: 'ล้มเหลว',
        text: text,
        icon: 'error',
        allowOutsideClick: false,
    })
}

export {FailAlert};