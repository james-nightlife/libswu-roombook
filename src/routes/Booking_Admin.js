import { useState } from "react";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const Items = ({currentItems}) => {
    return(
        <>
        {currentItems && 
        currentItems.map((item) => (
            <div>
                <h3>Item #{item}</h3>
            </div>
        ))}
        </>
    );
}

const PaginatedItems = ({itemsPerPage}) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    }

    return(
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel='next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

const BookingAdmin = () => {
    return(
        <>
            <Container>
                <PaginatedItems itemsPerPage={4} />
            </Container>
            
        </>
    )
};

export default BookingAdmin;