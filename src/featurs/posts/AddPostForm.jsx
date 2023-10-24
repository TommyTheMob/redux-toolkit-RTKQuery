import React, {useState} from 'react';
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useAddNewPostMutation} from "../api/apiSlice.js";
import {selectAllUsers} from "../users/usersSlice.js";

const AddPostForm = () => {

    const [titleValue, setTitleValue] = useState('')
    const [contentValue, setContentValue] = useState('')
    const [userId, setUserId] = useState(0)

    const users = useSelector(selectAllUsers)

    const [addNewPost, {isLoading}] = useAddNewPostMutation()

    const canSave = Boolean(titleValue) && Boolean(contentValue) && Boolean(userId) && !isLoading


    const onCreateBtnClick = async () => {
        if (canSave) {
            try {
                await addNewPost({title: titleValue, content: contentValue, user: userId, date: new Date().toISOString(), reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}}).unwrap()
                setTitleValue('')
                setContentValue('')
                setUserId(0)
            } catch (err) {
                console.error('Failed to save post', err)
            }
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

    return (
        <Container
            className='bg-light border border-dark-subtle rounded mb-5 py-3 d-flex flex-column align-items-center'>
            <Form.Label htmlFor="basic-url">
                <h5>Type a new post</h5>
            </Form.Label>

            <InputGroup className='mb-3'>
                <InputGroup.Text id="basic-addon3">
                    Select User
                </InputGroup.Text>
                <Form.Select
                    aria-label="Default select example"
                    value={userId}
                    onChange={(e) => setUserId(Number(e.target.value))}
                >
                    <option value=""></option>
                    {usersOptions}
                </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
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
                onClick={onCreateBtnClick}
                disabled={!canSave}
            >
                Create
            </Button>
        </Container>
    );
};

export default AddPostForm;
