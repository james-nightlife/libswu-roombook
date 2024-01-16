import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const BookingAdmin = () => {
    const [data, setData] = useState([]);
    const [raw, setRaw] = useState([]);

    const fetchData = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/risks`, {
            method: "GET",
        }).then((data) => (data.json()))
        .then(async (data) => {
            await setRaw(data.data.sort((a, b) => b.id - a.id));
        }).catch();
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setData(raw);
    }, [raw])

    /* Pagination */
    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return(
            <Container>
                <Table responsive className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>รายละเอียด</th>
                            <th>สถานที่แจ้ง</th>
                            <th>ผู้แจ้ง</th>
                            <th>วันที่รายงาน</th>
                            <th>สถานะการดำเนินการ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.map((data, idx) => (               
                            <tr key={idx}>  
                                <td className="align-middle">{data.id}</td>
                                <td className="align-middle">{data.detail}</td>
                                <td className="align-middle">{data.location}</td>
                                <td className="align-middle">{data.reporter}</td>
                                <td className="align-middle">{data.status}</td>
                            </tr> 
                        ))}
                    </tbody>
                </Table>
            </Container>
    )
};

export default BookingAdmin;