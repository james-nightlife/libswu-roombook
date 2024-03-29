import { Button, Container, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BookingForm from "../forms/BookingForm";

const countDailyBooking = async (input) => {
    return fetch(`${process.env.REACT_APP_SERVER}/check-daily-booking-count`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }).then((data) => data.json())
        .catch((data) => (0))
}

async function submitBooking(input){
    return fetch(`${process.env.REACT_APP_SERVER}/insert-book`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
    }).then((data) => (data.json()))
    .catch((data) => ({
        status: 'ok',
        message: 'ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก'
    }))
}

function Booking(){
    // TITLE

    // FORM
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    // SUBMIT BUTTON
    const [startTimeButton, setStartTimeButton] = useState(true);
    const [endTimeButton, setEndTimeButton] = useState(true);
    const [submitButton, setSubmitButton] = useState(true);

    const username = sessionStorage.getItem('username');
    const room = Number(localStorage.getItem('room'));


    // ดักการลักไก่เข้าหน้าจองห้องผ่าน Url
    if(!room){
        window.location.href = "/";
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
            username: username,
            date: date,
        })
        setDailyCount(1 - result.count)
    }

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
        const result = await fetch(`${process.env.REACT_APP_SERVER}/check-booking`, {
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
            setInputs(values => ({
                ...values,
                 start_time: new Date(`${date} ${startTime}:00`),
            }));
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
        const result = await fetch(`${process.env.REACT_APP_SERVER}/check-booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                end_time: `${date} ${endTime}:00`,
            })
        }).then((data) => data.json())
        .catch((data) => (0))

        if(result.message === 'ทับซ้อน'){
            setSubmitButton(true)
        }else if(endTime <= startTime){
            console.log(Date.parse(endTime));
            setSubmitButton(true)
        }else{
            setSubmitButton(false)
            setInputs(values => ({
                ...values,
                 end_time: new Date(`${date} ${endTime}:00`),
            }));
        }
    }


    const [collaboratorName, setCollaboratorName] = useState(['', '', '', '']);
    const [collaboratorUsername, setCollaboratorUsername] = useState(['', '', '', '']);

    /* แสดงชื่อจากรหัสบุคลากร / นิสิต */
    const handleGuest = async (e, idx) => {
        const newCollaboratorName = [...collaboratorName];
        const newCollaboratorUsername = [...collaboratorUsername];
        const id = e.target.value;

        var result = await fetch(`${process.env.REACT_APP_SERVER}/get-user`, {
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
            newCollaboratorName[idx] = result.user.name;
            newCollaboratorUsername[idx] = result.user.username;

        }else{
            newCollaboratorName[idx] = '';
            newCollaboratorUsername[idx] = '';
        }
        setCollaboratorName(newCollaboratorName);
        setCollaboratorUsername(newCollaboratorUsername);
        
    }

    const handleSubmit = async (e) => {
        let response;
        e.preventDefault();
        if(inputs.collaborator &&
            inputs.start_time &&
            inputs.end_time){
                Swal.fire({
                    title: 'ยืนยันการจองห้อง',
                    html: `ยืนยันการจองห้อง<br>
                            ${inputs.collaborator} <br>
                            ${inputs.start_time} <br>
                            ${inputs.end_time} `,
                    icon: 'warning',
                    showCancelButton: true,
                }).then(async confirm => {
                    if(confirm.isConfirmed){
                        response = await submitBooking({
                            booker: username,
                            room_id: room, 
                            collaborator: inputs.collaborator,
                            start_time: inputs.start_time,
                            end_time: inputs.end_time,
                        });
                        if(response.status === '201'){
                            Swal.fire({
                                title: 'Success',
                                text: response.message,
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(() => {
                                window.location.href = '/';
                            });
                        }else{
                            Swal.fire({
                                title: 'ล้มเหลว',
                                text: response.message,
                                icon: 'error'
                            });
                        }

                    }
                })

        }else{
            Swal.fire({
                title: 'ล้มเหลว',
                text: 'โปรดระบุรายละเอียดการจองห้อง',
                icon: 'error'
            });
        }
    };

    useEffect(() => {
        setInputs(values => ({...values, collaborator: collaboratorUsername}));
    }, [collaboratorName])


    return(
        <Container className="p-3">
            <Container className="p-3 border rounded">
                <h1 className="text-center">บันทึกการจองห้อง</h1>
                <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>บัวศรีไอดีผู้จองห้อง</Form.Label>
                    <Form.Control 
                        type="text"
                        name="username" 
                        disabled 
                        value={username || ''} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="mt-3">เลขห้อง</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="room_id"
                        disabled 
                        value={room || ''} />
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
                        value={collaboratorName[0] || ''} />                    
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
                        value={collaboratorName[1] || ''} />
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
                        value={collaboratorName[2] || ''} />
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
                        value={collaboratorName[3] || ''} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="mt-3">วันที่</Form.Label>
                    <Form.Control 
                        type="date"
                        onChange={e => setDate(e.target.value)}
                        min={today_date}
                        value={date || ''} />
                </Form.Group>
                <Form.Group>
                            <Form.Label className="pt-3">
                                สิทธิ์ในการจองห้องประจำวันที่ {date} :
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                disabled 
                                value={dailyCount || ''} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        เวลาเริ่ม
                    </Form.Label>
                    <Form.Control 
                        type="time"
                        name="start_time" 
                        onChange={e => setStartTime(e.target.value)}
                        value={startTime || ''}
                        disabled={startTimeButton} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        เวลาสิ้นสุด
                    </Form.Label>
                    <Form.Control 
                        type="time" 
                        onChange={e => setEndTime(e.target.value)}
                        value={endTime || ''}
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



            
            {/*
            <BookingForm 
                handleSubmit={handleSubmit} 
                username={username}
                room={room} 
                handleGuest={handleGuest} 
                collaboratorName={collaboratorName}
                setDate={setDate} 
                today_date={today_date} 
                date={date} 
                dailyCount={dailyCount}
                setStartTime={setStartTime}
                startTime={startTime} 
                startTimeButton={startTimeButton}
                setEndTime={setEndTime} 
                endTime={endTime}
                endTimeButton={endTimeButton}
                submitButton={submitButton} />
                 */}
        </Container>
    )
}

export default Booking;