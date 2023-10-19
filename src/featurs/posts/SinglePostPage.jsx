import React from 'react';
import {Button, Card, Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";


const SinglePostPage = () => {
    const {postId} = useParams()


    const post = useSelector(state => state.posts.find(post => post.id === postId))

    if (!post) {
        return (
            <Container className='text-center'>
                <h3>Post not found!</h3>
            </Container>
        )
    }

    return (
        <Container className='text-center'>
            <h1>Post details</h1>
            <Card className="text-center mt-2">
                <Card.Header>#id-{post.id}</Card.Header>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>
                        {post.content}
                    </Card.Text>
                    <Button as={Link} to='/posts' className='me-1' variant="primary">Go to posts</Button>
                    <Button as={Link} to={`/editPost/${post.id}`} variant="secondary">Edit</Button>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </Container>
    );
};

export default SinglePostPage;
