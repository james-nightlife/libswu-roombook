import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";




function Booking({user, room}){
    const [date, setDate] = useState(new Date());
    
    

    if(!room){
        window.location.href = "/";
    }
    return(
        <Container className="p-5">
            <Row className="mb-3">
                <Col className="border p-3">
                    <p>เลขประจำตัว : {user.id}</p>
                    <p>ชื่อ : {user.fname} {user.lname}</p>
                    <p>ส่วนงาน : {user.faculty}</p>
                    <p>เลขห้อง : {room}</p>
                </Col>
                <Col className="border p-3">
                    <Calendar onChange={setDate} value={date} className="mb-3" />
                    <p>สิทธิ์ในการจองห้องประจำวันที่ {date.getDate()}/{date.getMonth()}/{date.getFullYear()} :</p>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="border p-3">
                    ตารางเวลา
                </Col>
            </Row>
            
        </Container>
    )
}

export default Booking;