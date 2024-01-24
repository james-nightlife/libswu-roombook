import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";

// ส่ง Request เพื่อแก้ไขข้อมูลความเสี่ยง
async function updateUser(input){
    return fetch('http://127.0.0.1:9000/update-user', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
    }).then((data) => (data.json()))
    .catch((data) => ({
        'status': 'ok',
        'message': 'ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก'
    }))
}

const AdminEditUser = () => {
    const [input, setInput] = useState([]);

    // อัปเดต input
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [name]: value}));
    }

    // ตรวจสอบการเพิ่มบัญชีผู้ใช้
    const handleSubmit = async (e) => {
        let response;
        e.preventDefault();
        console.log(input);
        if(input.username &&
           input.uni_id &&
           input.name &&
           input.faculty &&
           input.status &&
           input.role &&
           input.faculty !== '0' &&
           input.status !== '0' &&
           input.role !== '0' ){
            Swal.fire({
                title: 'ยืนยันการแก้ไข',
                html: `บัวศรีไอดี : ${input.username} <br>
                            เลขประจำตัวบุคลากร / นิสิต : ${input.uni_id} <br>
                            ชื่อ - สกุล : ${input.name} <br>
                            ส่วนงาน : ${input.faculty} <br>
                            สถานะ : ${input.status} <br>
                            สถานะการใช้งาน : ${input.role} <br>
                            เปลี่ยนรหัสผ่าน : ${Boolean(input.password)}`,
                icon: 'warning',
                showCancelButton: true,
            }).then(async confirm =>  {
                if(confirm.isConfirmed){
                    response = await updateUser({
                        username: input.username,
                        password: input.password,
                        uni_id: input.uni_id,
                        name: input.name,
                        faculty: input.faculty,
                        status: input.status,
                        role: input.role
                    })
                    if(response.status === '201'){
                        Swal.fire({
                            title: 'Success',
                            text: response.message,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            window.location.href = '/admin/users';
                        })
                    }else{
                        Swal.fire({
                            title: 'ล้มเหลว',
                            text: 'เกิดปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
                            icon: 'error',
                        })
                    }  
                }
            }) 
        }else{
            Swal.fire({
                title: 'ล้มเหลว',
                text: 'โปรดระบุข้อมูลของผู้ใช้',
                icon: 'error'
            })
        }    
    }

    // ดึงข้อมูลความเสี่ยง (datatype id ความเสี่ยงต้องเป็น number)
    const fetchRiskData = async () => {
        await fetch('http://127.0.0.1:9000/get-user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: localStorage.getItem('edit_username')
            })
        }).then((data) => (data.json()))
        .then((data) => {
            setInput(data.user);    
        }).catch((error) => {
            console.error('Error fetching risk data:', error);
        });
    }

    useEffect(() => {
        fetchRiskData();
    }, []);

    

    return(
        <Container className="p-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>บัวศรีไอดี</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="username"  
                        onChange={handleChange} 
                        value={input.username}
                        disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <Form.Control 
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={input.password} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>เลขประจำตัวบุคลากร / นิสิต</Form.Label>
                    <Form.Control
                        type="text"
                        name="uni_id"
                        onChange={handleChange}
                        value={input.uni_id} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ชื่อ - สกุล</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={input.name} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ส่วนงาน</Form.Label>
                    <Form.Select 
                        name="faculty" 
                        onChange={handleChange}
                        value={input.faculty}>
                        <option value='0'>-- ส่วนงาน --</option>
                        <option>คณะศึกษาศาสตร์</option>
                        <option>คณะมนุษยศาสตร์</option>
                        <option>คณะสังคมศาสตร์</option>
                        <option>คณะวิทยาศาสตร์</option>
                        <option>คณะพลศึกษา</option>
                        <option>คณะแพทยศาสตร์</option>
                        <option>คณะทันตแพทยศาสตร์</option>
                        <option>คณะเภสัชศาสตร์</option>
                        <option>คณะกายภาพบำบัด</option>
                        <option>คณะพยาบาลศาสตร์</option>
                        <option>คณะวิศวกรรมศาสตร์</option>
                        <option>คณะศิลปกรรมศาสตร์</option>
                        <option>วิทยาลัยนานาชาติเพื่อศึกษาความยั่งยืน</option>
                        <option>วิทยาลัยนวัตกรรมสื่อสารสังคม</option>
                        <option>คณะเศรษฐศาสตร์</option>
                        <option>คณะเทคโนโลยีและนวัตกรรมผลิตภัณฑ์การเกษตร</option>
                        <option>วิทยาลัยโพธิวิชชาลัย</option>
                        <option>คณะวัฒนธรรมสิ่งแวดล้อมและการท่องเที่ยวเชิงนิเวศ</option>
                        <option>วิทยาลัยอุตสาหกรรมสร้างสรรค์</option>
                        <option>คณะบริหารธุรกิจเพื่อสังคม</option>
                        <option>บัณฑิตวิทยาลัย</option>
                        <option>สำนักหอสมุดกลาง</option>
                        <option>สำนักคอมพิวเตอร์</option>
                        <option>สำนักสื่อและเทคโนโลยีการศึกษา</option>
                        <option>สำนักนวัตกรรมการเรียนรู้</option>
                        <option>สำนักทดสอบทางการศึกษาและจิตวิทยา</option>
                        <option>สถาบันวัฒนธรรมและศิลปะ</option>
                        <option>สถาบันวิจัย พัฒนา และสาธิตการศึกษา</option>
                        <option>สถาบันวิจัยพฤติกรรมศาสตร์</option>
                        <option>สถาบันยุทธศาสตร์ทางปัญญาและวิจัย</option>
                        <option>สำนักงานอธิการบดี</option>
                        <option>สำนักงานสภามหาวิทยาลัย</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>สถานะ</Form.Label>
                    <Form.Select
                        name="status"
                        onChange={handleChange}
                        value={input.status}>
                        <option value='0'>-- สถานะ --</option>
                        <option>บุคลากร</option>
                        <option>นิสิต</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>สถานะการใช้งาน</Form.Label>
                    <Form.Select
                        name="role"
                        onChange={handleChange}
                        value={input.role}>
                        <option value='0'>-- สถานะการใช้งาน --</option>
                        <option value='admin'>ผู้ดูแล</option>
                        <option value='committee'>กรรมการ</option>
                        <option value='visitor'>ผู้ใช้ทั่วไป</option>
                    </Form.Select>
                </Form.Group>
                <div className="d-grid mt-3">
                    <Button
                        type="submit">
                        บันทึก
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
export default AdminEditUser;