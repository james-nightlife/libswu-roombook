import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import '../index.css';

const UserManager = () => {
    const session = JSON.parse(sessionStorage.getItem('user'));
    if(session.role !== 'admin'){
        window.location.href = "/";
    }

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch('http://127.0.0.1:9000/users', {
            method: "GET",
        }).then((data) => (data.json()))
        .then((data) => {
            setUsers(data.data)
        }).catch();
    }

    // Pagination
    const itemsPerPage = 5;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = users.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(users.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

    const handleEditButton = (e, id) => {
        e.preventDefault()
        localStorage.setItem('edit_username', id);
        window.location.href = "/admin/users/edit";
    }

    return(
        <Container className='p-5'>
            <Row>
                <Col>
                    <div className="d-grid">
                        <Button href="/admin/users/add">เพิ่มผู้ใช้</Button>
                    </div> 
                </Col>
                <Col>
                    <div className="d-grid">
                        <Button>เพิ่มผู้ใช้</Button>
                    </div> 
                </Col>
            </Row>

            <Table className="mt-3" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>ชื่อ - สกุล</th>
                        <th>ส่วนงาน</th>
                        <th>สิทธิ์ใช้งาน</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map((data, idx) => (
                        <tr key={idx+itemOffset+1}>
                            <td>{idx+itemOffset+1}</td>
                            <td>{data.username}</td>
                            <td>{data.name}</td>
                            <td>{data.faculty}</td>
                            <td>{data.role}</td>
                            <td className="align-middle"><Button onClick={e => handleEditButton(e, data.username)}>แก้ไข</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel='...'
                nextLabel='Next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel='< Previous'
                renderOnZeroPageCount={null}
            />
        </Container>
    );
}
export default UserManager;