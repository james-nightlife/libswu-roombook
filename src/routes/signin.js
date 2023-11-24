import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";

const localhost = 'http://127.0.0.1:5000';
const server = 'http://10.1.217.219:5000';

async function loginUser(credentials){

    return fetch(server + '/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

function SignIn(){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });


        if("accessToken" in response){
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
    }
    
    return(
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={e => setUserName(e.target.value)}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => setPassword(e.target.value)}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign In
            </Button>
        </Form>
        </>
    );
}
export default SignIn;