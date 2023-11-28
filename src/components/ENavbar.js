import { Button, Container, Navbar } from "react-bootstrap";

function ENavbar({user}){
    const name = user['fname'] + ' ' + user['lname'];

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/";
      };
    

    return(
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">ระบบจองห้องค้นคว้าออนไลน์</Navbar.Brand>
                    <div className="d-flex">
                        <div className="m-2">สวัสดี, {name}</div>
                        <Button variant="primary" type="button" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    </div> 
                </Container>
            </Navbar>
        </>
    )
}

export default ENavbar;