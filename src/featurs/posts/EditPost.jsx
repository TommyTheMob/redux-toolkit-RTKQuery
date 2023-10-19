import React, {useState} from 'react';
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {editPost} from "./postsSlice.js";
import {nanoid} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams, useNavigate} from "react-router-dom";

const EditPost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {postId} = useParams()

    const post = useSelector(state => state.posts.find(post => post.id === postId))

    if (!post) {
        return (
            <Container className='text-center'>
                <h3>Post not found!</h3>
            </Container>
        )
    }

    const [titleValue, setTitleValue] = useState(post.title)
    const [contentValue, setContentValue] = useState(post.content)

    return (
        <Container
            className='bg-light border border-dark-subtle rounded mt-2 py-3 d-flex flex-column align-items-center'>
            <Form.Label htmlFor="basic-url">
                <h5>Edit post</h5>
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
                    dispatch(editPost(post.id, titleValue, contentValue))
                    navigate(-1)
                }}
            >
                Save
            </Button>

        </Container>
    );
};

export default EditPost;
