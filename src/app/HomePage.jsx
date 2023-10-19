import React from 'react';
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <Container>
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{height: '60vh'}}>
                <h3>Welcome to the my Redux/toolkit training project!</h3>

                <Container className='mt-2 w-25 d-lg-flex justify-content-evenly align-items-center'>
                    <Button className='m-2' size='lg' variant='outline-primary' as={Link} to='/counter'>
                        Counter
                    </Button>
                    <Button className='m-2' size='lg' variant='outline-success' as={Link} to='/posts'>
                        Posts
                    </Button>
                </Container>
            </Container>
        </Container>
    );
};

export default HomePage;
