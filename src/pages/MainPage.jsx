import React from 'react';
import {Container} from "react-bootstrap";
import Counter from "../components/counter/Counter.jsx";

const MainPage = () => {
    return (
        <Container className='text-center'>
            <Counter />
        </Container>
    );
};

export default MainPage;
