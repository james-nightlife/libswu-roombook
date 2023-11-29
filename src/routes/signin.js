import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";

/* รับ username และ password ส่งให้ api ตรวจสอบบัญชีผู้ใช้ */
async function loginUser(credentials){
    /*
    return fetch('http://127.0.0.1:5000/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then((data) => (data.json()))
    .catch((data) => (({'status': 'ok', 'message': 'ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก'})))
    */
   
    /* สำหรับทดสอบเว็บ */
    if(credentials.username == credentials.password && credentials.username == "sc621010029"){
        return {'status' : 'ok',
                'message' : 'ยินดีต้อนรับ สุทธิพงศ์ กรรณิกากลาง',
                'user' : {
                    'id' : '62102010029',
                    'fname' : 'สุทธิพงศ์',
                    'lname' : 'กรรณิกากลาง',
                    'buasri_id' : 'sc621010029',
                    'faculty' : 'คณะวิทยาศาสตร์'
                },
        }
    }else{
        return {'status': 'ok', 
                'message': 'บัวศรีไอดีหรือรหัสผ่านไม่ถูกต้อง'
        }
    }

}

function SignIn(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        let response;
        e.preventDefault();
        if(username && password){
            response = await loginUser({
                username,
                password
            });
            if("user" in response){
                swal("Success", response.message, "success", {
                    buttons: false,
                    timer: 2000,
                }).then((value) => {
                    localStorage.setItem('accessToken', response['accessToken']);
                    localStorage.setItem('user', JSON.stringify(response['user']));
                    window.location.href = '/';
                })
            } else{
                swal("Failed", response.message, "error");
            }
        }else{
            swal("Failed", "โปรดระบุบัวศรีไอดีของคุณ", "error");
        } 
    }
    
    return(
        <div className="m-5">
            <h1 className="text-center mb-3">Sign In</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" onChange={e => setUsername(e.target.value)}>
                    <Form.Label>Buasri ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Buasri ID" />
                </Form.Group>
                <Form.Group className="mb-3" onChange={e => setPassword(e.target.value)}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password for Buasri ID" />
                </Form.Group>
                <div className="d-grid mb-3">
                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                </div> 
            </Form>
        </div>
    );
}
export default SignIn;