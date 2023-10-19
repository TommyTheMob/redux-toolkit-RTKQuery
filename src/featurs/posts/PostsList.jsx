import React from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import AddPostForm from "./AddPostForm.jsx";
import {Link} from "react-router-dom";


const PostsList = () => {
    const posts = useSelector(state => state.posts)

    return (
        <Container>
            <h1>Posts</h1>

            <AddPostForm/>

            {posts.map((post, idx) => (
                <Card key={post.id} className='mb-2' bg='light'>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">#id-{post.id}</Card.Subtitle>
                        <Card.Text>
                            {post.content}
                        </Card.Text>
                        <Button className='me-2' as={Link} to={`/posts/${post.id}`} variant="primary">See post</Button>
                        <Button as={Link} to={`/editPost/${post.id}`} variant="secondary">Edit</Button>
                    </Card.Body>
                </Card>

            ))}
        </Container>
    );
};

export default PostsList;
