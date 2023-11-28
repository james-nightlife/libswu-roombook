import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";

/* รับ username และ password ส่งให้ api ตรวจสอบบัญชีผู้ใช้ */
async function loginUser(credentials){
    return fetch('http://127.0.0.1:5000/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
    .catch(data => ({'status': 'ok', 'message': 'โปรดตรวจสอบการเชื่อมต่อของคุณ'}))
}

function SignIn(){
    const [username, setUserName] = useState();

    const handleSubmit = async e => {
        let response;
        e.preventDefault();
        if(username){
            response = await loginUser({
                username
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
        <>
        <div className="m-5">
            <h1 className="text-center mb-3">ลงชื่อเข้าสู่ระบบ</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={e => setUserName(e.target.value)}>
                    <Form.Label>บัวศรีไอดี</Form.Label>
                    <Form.Control type="text" placeholder="กรอกบัวศรีไอดีของคุณ" />
                </Form.Group>
                <div className="d-grid mb-3">
                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                </div>
                
            </Form>
        </div>
        </>
    );
}
export default SignIn;