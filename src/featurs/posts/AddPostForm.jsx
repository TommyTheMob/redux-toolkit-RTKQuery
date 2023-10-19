import React, {useState} from 'react';
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {useDispatch} from "react-redux";
import { addPost } from './postsSlice.js';

const AddPostForm = () => {
    const dispatch = useDispatch()

    const [titleValue, setTitleValue] = useState('')
    const [contentValue, setContentValue] = useState('')

    return (
        <Container className='bg-light border border-dark-subtle rounded mb-5 py-3 d-flex flex-column align-items-center'>
            <Form.Label htmlFor="basic-url">
                <h5>Type a new post</h5>
            </Form.Label>

            <InputGroup className="mb-3 w-50">
                <InputGroup.Text id="basic-addon3">
                    Post title
                </InputGroup.Text>
                <Form.Control
                    type='text'
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                />
            </InputGroup>

            <InputGroup>
                <InputGroup.Text>Content</InputGroup.Text>
                <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    value={contentValue}
                    onChange={(e) => setContentValue(e.target.value)}
                />
            </InputGroup>

            <Button
                className='mt-4'
                variant='success'
                onClick={() => {
                    dispatch(addPost(titleValue, contentValue))
                    setTitleValue('')
                    setContentValue('')
                }}
            >
                Create
            </Button>
        </Container>
    );
};

export default AddPostForm;
