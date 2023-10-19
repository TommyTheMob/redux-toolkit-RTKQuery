import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {
    increment,
    decrement,
    reset,
    incrementByAmount,
    incrementAsync,
    selectCount,
} from '../../store/counter/counterSlice.js'

const Counter = () => {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()
    const [amount, setAmount] = useState('')

    const onAddAmountBtnClick = () => {
        dispatch(incrementByAmount(Number(amount) || 0))
        setAmount('')
    }

    const onAddAsyncBtnClick = () => {
        dispatch(incrementAsync(Number(amount) || 0))
        setAmount('')
    }

    return (
        <Container className='mt-5'>
            <Button
                variant="success"
                size={"sm"}
                onClick={() => dispatch(increment())}
            >
                +
            </Button>
            <span onClick={() => dispatch(reset())} style={{margin: '0 1em'}}>{count}</span>
            <Button
                variant="danger"
                size={"sm"}
                onClick={() => dispatch(decrement())}
            >
                -
            </Button>
            <Container fluid className='d-flex justify-content-center align-items-end'>
                <Form className='mt-3 w-25'>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Increment amount</Form.Label>
                        <Form.Control type="text" placeholder="type amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </Form.Group>
                </Form>
                <Button onClick={onAddAmountBtnClick} style={{height: '30%', margin: '0 1em'}} variant={"secondary"} >Add amount</Button>
                <Button onClick={onAddAsyncBtnClick} style={{height: '30%'}} variant={"info"} >Add async</Button>
            </Container>
        </Container>
    );
};

export default Counter;
