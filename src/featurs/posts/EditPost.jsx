import React, {useState} from 'react';
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {useParams, useNavigate} from "react-router-dom";
import {useEditPostMutation, useGetSinglePostQuery} from "../api/apiSlice.js";

const EditPost = () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    let {postId} = useParams()
    postId = Number(postId)

    const { data: post } = useGetSinglePostQuery(postId)
    const [editPost, {isLoading}] = useEditPostMutation()


    const [titleValue, setTitleValue] = useState(post.title)
    const [contentValue, setContentValue] = useState(post.content)

    const onSaveBtnClick = async () => {
        if (titleValue && contentValue) {
            await editPost({title: titleValue, content: contentValue, id: postId})
            navigate(-1)
        }
    }

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

            <Container className='mt-4 text-center'>
                <Button
                    className='me-2'
                    variant='success'
                    onClick={onSaveBtnClick}
                    disabled={isLoading}
                >
                    Save
                </Button>
                <Button
                    variant='secondary'
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    Go back
                </Button>
            </Container>

        </Container>
    );
};

export default EditPost;
