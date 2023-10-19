import React from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import AddPostForm from "./AddPostForm.jsx";
import {Link} from "react-router-dom";
import PostAuthor from "./postAuthor.jsx";
import TimeAgo from "./TimeAgo.jsx";
import ReactionButtons from "./ReactionButtons.jsx";


const PostsList = () => {
    const posts = useSelector(state => state.posts)

    const orderedPosts = posts.concat().sort((a, b) => b.date.localeCompare(a.date))

    return (
        <Container>
            <h1>Posts</h1>

            <AddPostForm/>

            {orderedPosts.map((post) => (
                <Card key={post.id} className='mb-4' bg='light'>
                    <Card.Header>
                        <TimeAgo timestamp={post.date}/>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            <PostAuthor userId={post.user}/>
                        </Card.Subtitle>
                        <Card.Text>
                            {post.content}
                        </Card.Text>
                        <Button className='me-2' as={Link} to={`/posts/${post.id}`} variant="primary">See post</Button>
                        <Button as={Link} to={`/editPost/${post.id}`} variant="secondary">Edit</Button>
                    </Card.Body>
                    <Card.Footer>
                        <ReactionButtons post={post}/>
                    </Card.Footer>
                </Card>

            ))}
        </Container>
    );
};

export default PostsList;
