import Swal from "sweetalert2";
import { SignOut } from "./SignOut";

const SessionExpired = async () => {
    Swal.fire({
        title: 'เซสชันหมดอายุ',
        text: 'กรุณาลงชื่อเข้าใช้อีกครั้ง',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        allowOutsideClick: false
    }).then(setTimeout(() => {
        SignOut();     
    }, 2000));
}

export { SessionExpired };