import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from './SWU_Central_Library_TH_Color.png'

function ENavbar({user}){
    const name = user['fname'] + ' ' + user['lname'];

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/";
      };
    

    return(
        <>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="https://lib.swu.ac.th">
                        <img src={logo} height="100" />
                    </Navbar.Brand>                   
                    <Nav.Link href="/">
                    ระบบจองห้องค้นคว้าออนไลน์
                    </Nav.Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="d-flex">
                            <Navbar.Text>
                            สวัสดี, {name}
                            </Navbar.Text>
                            <Nav.Link onClick={handleLogout}>
                                    (ออกจากระบบ)
                            </Nav.Link>
                        </Nav> 
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default ENavbar;