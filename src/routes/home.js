import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import '../App.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
    const responsive = {
        xxl: {
            breakpoint: { max: 4000, min: 1400 },
            items: 5
        },
        xl: {
            breakpoint: { max: 1400, min: 1200 },
            items: 5
        },
        lg: {
            breakpoint: { max: 1200, min: 992 },
            items: 5
        },
        md: {
            breakpoint: { max: 992, min: 768 },
            items: 3
        },
        sm: {
            breakpoint: { max: 768, min: 576 },
            items: 2
        },
        xs: {
            breakpoint: { max: 576, min: 0 },
            items: 1
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        localStorage.setItem('room', e.target.value)
        window.location.href = "/Booking";
    }

    return(
        <div className='m-5'>
            <h2 className='mb-3' >ชั้น 3</h2>
            <Carousel responsive={responsive} className="mb-3">
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 305</h3>
                    <Button onClick={handleClick} value={305}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 306</h3>
                    <Button onClick={handleClick} value={306}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 307</h3>
                    <Button onClick={handleClick} value={307}>จองห้อง</Button>
                </Container>
            </Carousel>
            <h2 className='mb-3'>ชั้น 4</h2>
            <Carousel responsive={responsive} className="mb-3">
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 403</h3>
                    <Button onClick={handleClick} value={403}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 404</h3>
                    <Button onClick={handleClick} value={404}>จองห้อง</Button>
                </Container>
            </Carousel>
            <h2 className='mb-3'>ชั้น 5</h2>
            <Carousel responsive={responsive} className="mb-3">
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 505</h3>
                    <Button onClick={handleClick} value={505}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 506</h3>
                    <Button onClick={handleClick} value={506}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 506/1</h3>
                    <Button onClick={handleClick} value={506/1}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 506/2</h3>
                    <Button onClick={handleClick} value={506/2}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 506/3</h3>
                    <Button onClick={handleClick} value={506/3}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 506/4</h3>
                    <Button onClick={handleClick} value={506/4}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 506/5</h3>
                    <Button onClick={handleClick} value={506/5}>จองห้อง</Button>
                </Container>
            </Carousel>
            <h2 className='mb-3'>ชั้น 6</h2>
            <Carousel responsive={responsive} className="mb-3">
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 604</h3>
                    <Button onClick={handleClick} value={604}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 605</h3>
                    <Button onClick={handleClick} value={605}>จองห้อง</Button>
                </Container>
                <Container className='border p-3 text-center'>
                    <h3 className='mb-3'>ห้องค้นคว้า 606</h3>
                    <Button onClick={handleClick} value={606}>จองห้อง</Button>
                </Container>
            </Carousel>
        </div>
    );
}
export default Home;