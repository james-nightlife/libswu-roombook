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
    if(credentials.username === "sc621010029" && credentials.password === "62102010029"){
        return {'status' : 'ok',
                'message' : 'ยินดีต้อนรับ สุทธิพงศ์ กรรณิกากลาง',
                'user' : {
                    'id' : '62102010029',
                    'fname' : 'สุทธิพงศ์',
                    'lname' : 'กรรณิกากลาง',
                    'buasri_id' : 'sc621010029',
                    'faculty' : 'คณะวิทยาศาสตร์',
                    'status': 'visitor'
                },
        }
    }else if(credentials.username === "sutthiphong" && credentials.password === "711721"){
        return {'status' : 'ok',
                'message' : 'ยินดีต้อนรับ สุทธิพงศ์ กรรณิกากลาง',
                'user' : {
                    'id' : '711721',
                    'fname' : 'สุทธิพงศ์',
                    'lname' : 'กรรณิกากลาง',
                    'buasri_id' : 'sutthiphong',
                    'faculty' : 'สำนักหอสมุดกลาง',
                    'status': 'admin'
                },
        }
    }
    else{
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
                    sessionStorage.setItem('accessToken', response['accessToken']);
                    sessionStorage.setItem('user', JSON.stringify(response['user']));
                    window.location.href = '/';
                })
            } else{
                swal("ล้มเหลว", response.message, "error");
            }
        }else{
            swal("ล้มเหลว", "โปรดระบุบัวศรีไอดีและรหัสผ่านของคุณ", "error");
        } 
    }
    
    return(
        <div className="m-5">
            <h1 className="text-center mb-3">ลงชื่อเข้าใช้ระบบจองห้องค้นคว้าออนไลน์</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" onChange={e => setUsername(e.target.value)}>
                    <Form.Label>บัวศรีไอดี</Form.Label>
                    <Form.Control type="text" placeholder="กรอกบัวศรีไอดีของคุณ" />
                </Form.Group>
                <Form.Group className="mb-3" onChange={e => setPassword(e.target.value)}>
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <Form.Control type="password" placeholder="กรอกรหัสผ่านของคุณ" />
                </Form.Group>
                <div className="d-grid mb-3">
                    <Button variant="primary" type="submit">
                        ลงชื่อเข้าใช้
                    </Button>
                </div> 
            </Form>
        </div>
    );
}
export default SignIn;