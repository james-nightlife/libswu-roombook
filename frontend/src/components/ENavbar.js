import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from '../images/SWU_Central_Library_TH_Color.png';
import { SignOut } from "../functions/SignOut";

function ENavbar(){
    const username = sessionStorage.getItem('name');
    const role = sessionStorage.getItem('role');
    var adminNav;

    if(role === 'admin'){
        adminNav = (
            <>
                <Nav.Link href="/admin">จัดการการจองห้อง</Nav.Link>
                <Nav.Link href="/admin/users">จัดการผู้ใช้</Nav.Link>
            </>);
    }
    
    return(
        <Navbar id="navbar" sticky="top" expand='lg'>
            <Container>
                <Navbar.Brand href="https://lib.swu.ac.th" className='border rounded bg-white'>
                    <img src={logo} height="50" alt="สำนักหอสมุดกลาง มหาวิทยาลัยศรีนครินทรวิโรฒ" />
                </Navbar.Brand>  
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse className="justify-content-end">                  
                <Navbar.Brand href="/">ระบบจองห้องค้นคว้าออนไลน์</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/check">ตรวจสอบการจองห้อง</Nav.Link>
                        {adminNav}
                    </Nav>
                    <Nav className="d-flex">
                        <NavDropdown title={`สวัสดี, ${username}`}>
                            {/* <NavDropdown.Item href="/change-password">เปลี่ยนรหัสผ่าน</NavDropdown.Item> */}
                            <NavDropdown.Item onClick={SignOut}>ออกจากระบบ</NavDropdown.Item>
                        </NavDropdown>
                    </Nav> 
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default ENavbar;