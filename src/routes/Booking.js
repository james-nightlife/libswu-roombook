import { Button, Container, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import '../components/web.css';

const countDailyBooking = async (input) => {
    return fetch('http://127.0.0.1:9000/check-daily-booking-count', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }).then((data) => data.json())
        .catch((data) => (0))
}

function Booking(){
    //
    const user = JSON.parse(sessionStorage.getItem('user'));
    const room = localStorage.getItem('room');

    // ดักการลักไก่เข้าหน้าจองห้องผ่าน Url
    if(!room){
        window.location.href = "/";
    }

    //
    const [inputs, setInputs] = useState({});
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const today = new Date();
    const today_date = today.toISOString().substring(0,10);
    const [date, setDate] = useState(today_date);
    const [dailyCount, setDailyCount] = useState(0)

    useEffect(() => {
        handleDate()
    }, [date])

    const handleDate = async () => {
        const result = await countDailyBooking({
            username: user.username,
            date: date,
        })
        setDailyCount(1 - result.count)
    }

    const [startTimeButton, setStartTimeButton] = useState(true);
    const [endTimeButton, setEndTimeButton] = useState(true);
    const [submitButton, setSubmitButton] = useState(true);
    
    useEffect(() => {
        if(dailyCount === 0){
            setStartTimeButton(true)
            setStartTime()
        }else{
            setStartTimeButton(false)
            setStartTime()
        }
    }, [dailyCount])

    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()

    useEffect(() => {
        if(startTime){
            handleStartTime();
        }else{
            setEndTimeButton(true)
        }
        
    }, [startTime])

    const handleStartTime = async () => {
        const result = await fetch('http://127.0.0.1:9000/check-booking', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                start_time: `${date} ${startTime}:00`,
            })
        }).then((data) => data.json())
        .catch((data) => (0))
        if(result.message === 'ทับซ้อน'){
            console.log(result.message)
            setEndTimeButton(true)
        }else{
            console.log(result.message)
            setEndTimeButton(false)
        }
    }

    useEffect(() => {
        if(endTime){
            handleEndTime()
        }else{
            setSubmitButton(true)
        }
    }, [endTime])

    const handleEndTime = async () => {
        const result = await fetch('http://127.0.0.1:9000/check-booking', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                end_time: `${date} ${endTime}:00`,
            })
        }).then((data) => data.json())
        .catch((data) => (0))

        if(result.message === 'ทับซ้อน' && (endTime < startTime)){
            console.log(result.message)
            console.log(`${endTime} > ${startTime}`)
            setSubmitButton(true)
        }else{
            console.log(result.message)
            setSubmitButton(false)
        }
    }


    const [guest, setGuest] = useState(['', '', '', '']);

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

    return(
        <Container className="p-5">
            <Form>
                <Form.Group>
                    <Form.Label>บัวศรีไอดี :</Form.Label>
                    <Form.Control 
                        type="text"
                        name="username" 
                        disabled 
                        value={user.username} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">เลขประจำตัวบุคลากร / นิสิต :</Form.Label>
                    <Form.Control 
                        type="text"
                        name="uni_id" 
                        disabled 
                        value={user.uni_id} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="pt-3">ชื่อ :</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name"
                        disabled 
                        value={user.name} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="mt-3">ส่วนงาน :</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="faculty"
                        disabled 
                        value={user.faculty} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="mt-3">เลขห้อง :</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="room_id"
                        disabled 
                        value={room} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="mt-3">ผู้ร่วมใช้ห้องคนที่ 1</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="เลขประจำตัวบุคลากร / นิสิต" 
                            onChange={e => handleGuest(e, 0)} />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        className="mt-3"
                        type="text" 
                        disabled 
                        value={guest[0]} />                    
                </Form.Group> 
                <Form.Group>
                    <Form.Label className="mt-3">ผู้ร่วมใช้ห้องคนที่ 2</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="เลขประจำตัวบุคลากร / นิสิต" 
                        onChange={e => handleGuest(e, 1)}/>
                </Form.Group>
                <Form.Group>     
                    <Form.Control 
                        className="mt-3"
                        type="text" 
                        disabled 
                        value={guest[1]} />
                </Form.Group>        
                <Form.Group>
                    <Form.Label className="mt-3">ผู้ร่วมใช้ห้องคนที่ 3</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="เลขประจำตัวบุคลากร / นิสิต"
                        onChange={e => handleGuest(e, 2)} />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        className="mt-3" 
                        type="text" 
                        disabled 
                        value={guest[2]} />
                </Form.Group>            
                <Form.Group>
                    <Form.Label className="mt-3">ผู้ร่วมใช้ห้องคนที่ 4</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="เลขประจำตัวบุคลากร / นิสิต"
                        onChange={e => handleGuest(e, 3)} />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        className="mt-3" 
                        type="text" 
                        disabled 
                        value={guest[3]} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="mt-3">วันที่</Form.Label>
                    <Form.Control 
                        type="date"
                        onChange={e => setDate(e.target.value)}
                        min={today_date}
                        value={date} />
                    {/* 
                        <Calendar 
                            onChange={e => handleTimeSlot(e)} 
                            value={date}
                          />
                    */}
                </Form.Group>
                <Form.Group>
                            <Form.Label className="pt-3">
                                สิทธิ์ในการจองห้องประจำวันที่ {date} :
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                disabled 
                                value={dailyCount} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        เวลาเริ่ม
                    </Form.Label>
                    <Form.Control 
                        type="time"
                        name="start_time" 
                        onChange={e => setStartTime(e.target.value)}
                        value={startTime}
                        disabled={startTimeButton} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        เวลาสิ้นสุด
                    </Form.Label>
                    <Form.Control 
                        type="time" 
                        onChange={e => setEndTime(e.target.value)}
                        value={endTime}
                        disabled={endTimeButton} />
                </Form.Group>
                <div className="d-grid gap-2 mt-3">
                    <Button 
                        type="submit"
                        disabled={submitButton}>
                            จองห้อง
                </Button>
                </div>
            </Form>
        </Container>
    )
}

export default Booking;