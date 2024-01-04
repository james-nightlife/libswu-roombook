import { Button, Col, Container, Form, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import { AppointmentPicker } from "react-appointment-picker";
import '../components/web.css';

function Booking(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [inputs, setInputs] = useState({});
    const room = localStorage.getItem('room');

    // ดักการลักไก่เข้าหน้าจองห้องผ่าน Url
    if(!room){
        window.location.href = "/";
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const [date, setDate] = useState(new Date(new Date().setHours(8,30,0,0)));
    const [guest, setGuest] = useState(['', '', '', '']);
    const [select, setSelect] = useState('');
    const [chance, setChance] = useState(1);
    
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
        var result = await fetch('http://127.0.0.1:9000/get-user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uni_id: id,
            })
        }).then((data) => (data.json()))
        .catch((data) => ({
            user: {
                name: '',
            },
        }));
        if(result.user){
            newGuest[idx] = result.user.name;
        }else{
            newGuest[idx] = '';
        }
        setGuest(newGuest);
    }

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
        <Container className="p-5">
            <Form>
                <Row>
                    <Col className="border p-3 mb-3">
                        <Form.Group>
                        <Form.Label>เลขประจำตัวบุคลากร / นิสิต :</Form.Label>
                        <Form.Control 
                            type="text" 
                            disabled 
                            value={user.uni_id} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-3">ชื่อ :</Form.Label>
                            <Form.Control 
                                type="text" 
                                disabled 
                                value={user.name} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-3">ส่วนงาน :</Form.Label>
                            <Form.Control 
                                type="text" 
                                disabled 
                                value={user.faculty} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-3">เลขห้อง :</Form.Label>
                            <Form.Control 
                                type="text" 
                                disabled 
                                value={room} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-3">ผู้ร่วมใช้ห้อง</Form.Label>
                            <Row>
                                <Col sm>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="เลขประจำตัวบุคลากร / นิสิต" 
                                        onChange={e => handleGuest(e, 0)} />
                                </Col>
                                <Col sm>
                                    <Form.Control 
                                        type="text" 
                                        disabled 
                                        value={guest[0]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="เลขประจำตัวบุคลากร / นิสิต" 
                                        onChange={e => handleGuest(e, 1)}/>
                                </Col>
                                <Col sm>
                                    <Form.Control 
                                        type="text" 
                                        disabled 
                                        value={guest[1]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm>
                                    <Form.Control 
                                        type="text"
                                        placeholder="เลขประจำตัวบุคลากร / นิสิต"
                                        onChange={e => handleGuest(e, 2)} />
                                </Col>
                                <Col sm>
                                    <Form.Control 
                                        type="text" 
                                        disabled 
                                        value={guest[2]} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm>
                                    <Form.Control
                                        type="text"
                                        placeholder="เลขประจำตัวบุคลากร / นิสิต"
                                        onChange={e => handleGuest(e, 3)} />
                                </Col>
                                <Col sm>
                                    <Form.Control 
                                        type="text" 
                                        disabled 
                                        value={guest[3]} />
                                </Col>
                            </Row>
                        </Form.Group>    
                    </Col>
                    <Col className="border p-3 mb-3">
                        <Calendar className="mb-3" onChange={e => handleTimeSlot(e)} value={date}  />
                        <Form.Group>
                            <Form.Label>
                                สิทธิ์ในการจองห้องประจำวันที่ {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()} :
                            </Form.Label>
                            <Form.Control 
                                className="mb-3" 
                                type="text" 
                                disabled 
                                value={chance} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="border p-3">
                        <Form.Group>
                            <Form.Label>
                                ตารางเวลา :
                            </Form.Label>
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
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-3">เวลาที่เลือก :</Form.Label>
                            <Form.Control 
                                className="mb-3"
                                type="text"
                                disabled
                                defaultValue={select} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button type="submit" >จองห้อง</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default Booking;