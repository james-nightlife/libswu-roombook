import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from "react-bootstrap";
import logo from '../images/SWU_Central_Library_TH_Color.png';
import Swal from "sweetalert2";
import { FailAlert } from "../alert/FailAlert";
import { SignInRequest } from "../requests/SignInRequest";

const SignIn = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if(inputs.username && inputs.password){
            const response = await SignInRequest({
                username: inputs.username,
                password: inputs.password
            });
            if(response.status === 200){
                Swal.fire({
                    title: 'สำเร็จ',
                    text: response.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                    allowOutsideClick: false,
                }).then(() => {
                    sessionStorage.setItem('username', response.payload.user.username);
                    sessionStorage.setItem('role', response.role);
                    sessionStorage.setItem('name', response.fullname);
                    window.location.href = '/';
                })
            }else{
                FailAlert(response.message);   
            }
        }else{
            FailAlert('โปรดระบุบัวศรีไอดีและรหัสผ่านของคุณ');
        } 
    }
    
    return(
        <Container className="p-5">
            <div className="text-center p-3">
                <img src={logo} height="100" alt="สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ" />
            </div>
            <h1 className="text-center p-3">ลงชื่อเข้าใช้</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="p-3">
                    <Form.Label>บัวศรีไอดี</Form.Label>
                    <Form.Control 
                        type="text" 
                        name='username' 
                        value={inputs.username || ''} 
                        onChange={handleChange} 
                        placeholder="กรอกบัวศรีไอดีของคุณ" 
                    />
                </Form.Group>
                <Form.Group className="p-3" >
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <Form.Control 
                        type="password" 
                        name='password' 
                        value={inputs.password || ''} 
                        onChange={handleChange} 
                        placeholder="กรอกรหัสผ่านของคุณ" 
                    />
                </Form.Group>
                <div className="d-grid p-3">
                    <Button variant="primary" type="submit">
                        ลงชื่อเข้าใช้
                    </Button>
                </div> 
            </Form>
        </Container>
    );
}
export default SignIn;
