import React from 'react';
import {Container} from "react-bootstrap";
import PostsList from "./PostsList.jsx";

const PostsPage = () => {
    return (
        <Container className='text-center'>
            <PostsList />
        </Container>
    );
};

export default PostsPage;
