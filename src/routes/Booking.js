import { Button, Col, Container, Form, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import { AppointmentPicker } from "react-appointment-picker";
import '../components/web.css';





function Booking({user, room}){
    const [date, setDate] = useState(new Date(new Date().setHours(8,30,0,0)));
    const [guest, setGuest] = useState(['', '', '', '']);
    const [select, setSelect] = useState('');
    const [chance, setChance] = useState(1);
    
    /* จำลองฐานข้อมูลผู้ใช้ */
    const db_users = { 'users' : [
        {'id': '62102010029', 'name': 'สุทธิพงศ์ กรรณิกากลาง'},
        {'id': '62102010175', 'name': 'ปรารถนา เขื่อนขวาวงศ์'},
        {'id': '62102010027', 'name': 'ธนาธิป ชนะศรี'},
        {'id': '61101010001', 'name': 'พัทธิ์ชนก รุ่งแจ้ง'},
        {'id': '62130010101', 'name': 'นิธินันท์ ลิ้มสุขนิรันดร์'},
        {'id': '711721', 'name': 'สุทธิพงศ์ กรรณิกากลาง'},
        {'id': '62102010063', 'name': 'คุณัชญ์ ศิริสมบูรณ์เวช'},
    ]};

    /* จำลองฐานข้อมูลเวลาที่จองแล้ว */
    const db_timeslot = {'timeslot': [
        {'id': '10001', 'booktime': '2023-12-01 08:30:00', 'number': 1},
        {'id': '10002', 'booktime': '2023-12-01 09:30:00', 'number': 2},
        {'id': '10003', 'booktime': '2023-12-01 10:30:00', 'number': 3},
        {'id': '10004', 'booktime': '2023-12-01 11:30:00', 'number': 4},
        {'id': '10005', 'booktime': '2023-12-01 12:30:00', 'number': 5},
        {'id': '10006', 'booktime': '2023-12-01 13:30:00', 'number': 6},
        {'id': '10007', 'booktime': '2023-12-01 14:30:00', 'number': 7},
        {'id': '10008', 'booktime': '2023-12-01 15:30:00', 'number': 8},
        {'id': '10009', 'booktime': '2023-12-01 16:30:00', 'number': 9},
        {'id': '10010', 'booktime': '2023-12-01 17:30:00', 'number': 10},
    ]}

    /* ตารางเวลา */
    const def_days = [
        [
          { id: 1, number: 1, periods: 4 },
          { id: 2, number: 2, periods: 4 },
          { id: 3, number: 3, periods: 4 },
          { id: 4, number: 4, periods: 4 },
          { id: 5, number: 5, periods: 4 },
          { id: 6, number: 6, periods: 4 },
          { id: 7, number: 7, periods: 4 },
          { id: 8, number: 8, periods: 4 },
          { id: 9, number: 9, periods: 4 },
          { id: 10, number: 10, periods: 4 },
          { id: 11, number: 11, periods: 4 },
          { id: 12, number: 12, periods: 4 },
        ]
    ]
    const [days, setDays] = useState(def_days);
    
    /* แสดงชื่อจากรหัสบุคลากร / นิสิต */
    const handleGuest = async (e, idx) => {
        const newGuest = [...guest];
        const id = e.target.value;
        var result = db_users.users.find(x => x.id === id);
        if(result){
            newGuest[idx] = result.name;
        }else{
            newGuest[idx] = '';
        }
        setGuest(newGuest);
    }

    useEffect(() => {

    }, [guest])

    const [loading, setLoading] = useState(false);

    const  addAppointmentCb = async ({
        addedAppointment: {day, number, time, id},
        addCb
    }) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
                `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        addCb(day, number, time, id);
        setSelect(time);
        setLoading(false);
    };

    const removeAppointmentCb = async ({day, number, time, id}, removeCb) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
            `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        removeCb(day, number);
        setSelect();
        setLoading(false);
    }

    if(!room){
        window.location.href = "/";
    }

    const handleTimeSlot = async (e) => {
        var newDaysLocal = [...days];
        setDate(new Date(e.setHours(8,30,0,0)));

        for(var i = 0; i < db_timeslot.timeslot.length; i++){
            if(newDaysLocal[0].find(x => x.number === db_timeslot.timeslot[i].number)){
                newDaysLocal[0].find(x => x.number === db_timeslot.timeslot[i].number).isReserved = true;
            }
        }
        setDays(newDaysLocal);
    }


    return(
        <Container className="px-5 py-3">
            <Row>
                <Col className="border p-3 mb-3">
                    <Form.Label>เลขประจำตัวบุคลากร / นิสิต :</Form.Label>
                    <Form.Control className="mb-3" type="text" disabled value={user.id} />
                    <Form.Label>ชื่อ :</Form.Label>
                    <Form.Control className="mb-3" type="text" disabled value={`${user.fname} ${user.lname}`} />
                    <Form.Label>ส่วนงาน :</Form.Label>
                    <Form.Control className="mb-3" type="text" disabled value={user.faculty} />
                    <Form.Label>เลขห้อง :</Form.Label>
                    <Form.Control className="mb-3" type="text" disabled value={room} />
                    <Form.Label className="mb-3">ผู้ร่วมใช้ห้อง</Form.Label>
                    <Row>
                        <Col sm className="mb-3"><Form.Control type="text" placeholder="เลขประจำตัวบุคลากร / นิสิต" onChange={e => handleGuest(e, 0)} /></Col>
                        <Col sm className="mb-3"><Form.Control type="text" disabled value={guest[0]} /></Col>
                    </Row>
                    <Row>
                        <Col sm className="mb-3"><Form.Control type="text" placeholder="เลขประจำตัวบุคลากร / นิสิต" onChange={e => handleGuest(e, 1)}/></Col>
                        <Col sm className="mb-3"><Form.Control type="text" disabled value={guest[1]} /></Col>
                    </Row>
                    <Row>
                        <Col sm className="mb-3"><Form.Control type="text" placeholder="เลขประจำตัวบุคลากร / นิสิต" onChange={e => handleGuest(e, 2)} /></Col>
                        <Col sm className="mb-3"><Form.Control type="text" disabled value={guest[2]} /></Col>
                    </Row>
                    <Row>
                        <Col sm className="mb-3"><Form.Control type="text" placeholder="เลขประจำตัวบุคลากร / นิสิต" onChange={e => handleGuest(e, 3)} /></Col>
                        <Col sm className="mb-3"><Form.Control type="text" disabled value={guest[3]} /></Col>
                    </Row>
                </Col>
                <Col className="border p-3 mb-3">
                    <Calendar className="mb-3" onChange={e => handleTimeSlot(e)} value={date}  />
                    <Form.Label>สิทธิ์ในการจองห้องประจำวันที่ {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()} :</Form.Label>
                    <Form.Control className="mb-3" type="text" disabled value={chance} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="border p-3">
                    <Form.Label>ตารางเวลา :</Form.Label>
                    <AppointmentPicker 
                    addAppointmentCallback={addAppointmentCb}
                    removeAppointmentCallback={removeAppointmentCb}
                    initialDay={date}
                    days={days}
                    maxReservableAppointments={1}
                    alpha
                    visible
                    loading={loading}
                    />
                <Form.Label className="mt-3">เวลาที่เลือก :</Form.Label>
                <Form.Control className="mb-3" type="text" disabled defaultValue={select} />
                <div className="d-grid gap-2">
                    <Button type="submit" >จองห้อง</Button>
                </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Booking;