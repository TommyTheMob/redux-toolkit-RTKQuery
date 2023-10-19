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
                    <Link className='me-1' to='/posts'>
                        <Button variant="primary">Go to posts</Button>
                    </Link>
                    <Link to={`/editPost/${post.id}`}>
                        <Button variant="secondary">Edit</Button>
                    </Link>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </Container>
    );
};

export default SinglePostPage;
