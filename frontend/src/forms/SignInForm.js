import { Button, Form } from "react-bootstrap";

const SignInForm = ({handleSubmit, handleChange, inputs}) => {
    return(
        <>
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
        </>
        
    )   
}

export default SignInForm;