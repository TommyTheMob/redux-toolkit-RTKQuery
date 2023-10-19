import React from 'react';
import {Container} from "react-bootstrap";
import Counter from "./Counter.jsx";

const CounterPage = () => {
    return (
        <Container>
            <Container className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
                <Counter />
            </Container>
        </Container>
    );
};

export default CounterPage;
