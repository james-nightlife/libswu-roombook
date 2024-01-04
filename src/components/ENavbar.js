import { Container, Nav, Navbar } from "react-bootstrap";
import logo from './SWU_Central_Library_TH_Color.png';
import './web.css';
import { useState } from "react";

function ENavbar({user}){
    const name = user['name'];
    var adminNav;

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        window.location.href = "/";
    };

    if(user.role === 'admin'){
        adminNav = <>
            <Nav.Link href="/admin">จัดการการจองห้อง</Nav.Link>
            <Nav.Link href="/admin/users">จัดการผู้ใช้</Nav.Link>
            </>;
    }
    

    return(
        <>
            <Navbar className="bg-white" fixed="top" expand='sm'>
                <Container>
                    <Navbar.Brand href="https://lib.swu.ac.th" className='m-auto'>
                        <img src={logo} height="100" alt="สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ" />
                    </Navbar.Brand>                   
                    <Navbar.Brand href="/">ระบบจองห้องค้นคว้าออนไลน์</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" /> 
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="/check">ตรวจสอบการจองห้อง</Nav.Link>
                            {adminNav}
                        </Nav>
                        <Nav className="d-flex">
                            <Navbar.Text>สวัสดี, {name}</Navbar.Text>
                            <Nav.Link onClick={handleLogout}>(ออกจากระบบ)</Nav.Link>
                        </Nav> 
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default ENavbar;