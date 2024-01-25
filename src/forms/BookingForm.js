import { Button, Form } from "react-bootstrap";

const BookingForm = (handleSubmit, username, room, handleGuest, collaboratorName, setDate, today_date, date, dailyCount, setStartTime, startTime, startTimeButton, setEndTime, endTime, endTimeButton, submitButton) => {
    return(
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
    )
}

export default BookingForm;