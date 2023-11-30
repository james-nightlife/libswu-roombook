import { Col, Container, Form, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import { AppointmentPicker } from "react-appointment-picker";




function Booking({user, room}){
    const [date, setDate] = useState(new Date());
    const [guest, setGuest] = useState(['', '', '', '']);
    

    const db = { 'users' : [
        {'id': '62102010029', 'name': 'สุทธิพงศ์ กรรณิกากลาง'},
        {'id': '62102010175', 'name': 'ปรารถนา เขื่อนขวาวงศ์'},
        {'id': '62102010027', 'name': 'ธนาธิป ชนะศรี'},
        {'id': '61101010001', 'name': 'พัทธิ์ชนก รุ่งแจ้ง'},
        {'id': '62130010101', 'name': 'นิธินันท์ ลิ้มสุขนิรันดร์'},
        {'id': '711721', 'name': 'สุทธิพงศ์ กรรณิกากลาง'},
    ]};

    const timeslot = {'timeslot': [
        {'id': '10001',},
        {'id': '10001'},
        {'id': '10001'},
        {'id': '10001'},
        {'id': '10001'},
        {'id': '10001'},
        {'id': '10001'},
        {'id': '10001'},
        {'id': '10001'},
        {'id': '10001'},
    ]}

    const days = [
        [
          { id: 1, number: 1, isSelected: true, periods: 2 },
          { id: 2, number: 2 },
          null,
          { id: 3, number: '3', isReserved: true },
          { id: 4, number: '4' },
          null,
          { id: 5, number: 5 },
          { id: 6, number: 6 }
        ],
        [
          { id: 7, number: 1, isReserved: true, periods: 3 },
          { id: 8, number: 2, isReserved: true },
          null,
          { id: 9, number: '3', isReserved: true },
          { id: 10, number: '4' },
          null,
          { id: 11, number: 5 },
          { id: 12, number: 6 }
        ],
        [
          { id: 13, number: 1 },
          { id: 14, number: 2 },
          null,
          { id: 15, number: 3, isReserved: true },
          { id: 16, number: '4' },
          null,
          { id: 17, number: 5 },
          { id: 18, number: 6 }
        ],
        [
          { id: 19, number: 1 },
          { id: 20, number: 2 },
          null,
          { id: 21, number: 3 },
          { id: 22, number: '4' },
          null,
          { id: 23, number: 5 },
          { id: 24, number: 6 }
        ],
        [
          { id: 25, number: 1, isReserved: true },
          { id: 26, number: 2 },
          null,
          { id: 27, number: '3', isReserved: true },
          { id: 28, number: '4' },
          null,
          { id: 29, number: 5 },
          { id: 30, number: 6, isReserved: true }
        ]
      ];
    
    const handleGuest = async (e, idx) => {
        const newGuest = [...guest];
        const id = e.target.value;
        var result = db.users.find(x => x.id === id);
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
        setLoading(false);
    };

    const removeAppointmentCb = async ({day, number, time, id}, removeCb) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
            `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        removeCb(day, number);
        setLoading(false);
    }

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
                    <p>ผู้ร่วมใช้ห้อง</p>
                    <Row>
                        <Col><Form.Control type="text" placeholder="เลขประจำตัวบุคลากร / นิสิต" onChange={e => handleGuest(e, 0)} /></Col>
                        <Col>{guest[0]}</Col>
                    </Row>
                    <Row>
                        <Col><Form.Control type="text" placeholder="เลขประจำตัวบุคลากร / นิสิต" onChange={e => handleGuest(e, 1)}/></Col>
                        <Col>{guest[1]}</Col>
                    </Row>
                    <Row>
                        <Col><Form.Control type="text" placeholder="เลขประจำตัวบุคลากร / นิสิต" onChange={e => handleGuest(e, 2)} /></Col>
                        <Col>{guest[2]}</Col>
                    </Row>
                    <Row>
                        <Col><Form.Control type="text" placeholder="เลขประจำตัวบุคลากร / นิสิต" onChange={e => handleGuest(e, 3)} /></Col>
                        <Col>{guest[3]}</Col>
                    </Row>
                </Col>
                <Col className="border p-3">
                    <Calendar onChange={setDate} value={date} className="mb-3" />
                    <p>สิทธิ์ในการจองห้องประจำวันที่ {date.getDate()}/{date.getMonth()}/{date.getFullYear()} :</p>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="border p-3">
                    ตารางเวลา
                    <AppointmentPicker 
                    addAppointmentCallback={addAppointmentCb}
                    removeAppointmentCallback={removeAppointmentCb}
                    initialDay={date}
                    days={days}
                    maxReservableAppointments={3}
                    alpha
                    visible
                    selectedByDefault
                    loading={loading}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Booking;