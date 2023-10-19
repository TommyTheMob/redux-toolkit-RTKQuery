import React from 'react';
import {Container} from "react-bootstrap";
import Counter from "./Counter.jsx";

const CounterPage = () => {
    return (
        <Container className='text-center'>
            <Counter />
        </Container>
    );
};

export default CounterPage;
