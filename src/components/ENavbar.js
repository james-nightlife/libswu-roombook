import { Button, Container, Form, Navbar } from "react-bootstrap";

function ENavbar({token}){
    const name = token['name'];
    const buasri_id = token['buasri_id'];

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/";
      };
    

    return(
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">Lib</Navbar.Brand>
                    <div className="d-flex">
                        <div>{name}</div>
                        <Button  variant="primary" type="button" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    </div> 
                </Container>
            </Navbar>
        </>
    )
}

export default ENavbar;