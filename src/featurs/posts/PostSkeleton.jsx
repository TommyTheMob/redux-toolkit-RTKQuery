import React from 'react';
import {Card, Placeholder} from "react-bootstrap";

const PostSkeleton = () => {
    return (
        <Card className='mb-4' bg='light'>
            <Placeholder as={Card.Header} animation='glow'>
                <Placeholder xs={2} />
            </Placeholder>
            <Card.Body>
                <Placeholder as={Card.Title} animation='glow'>
                    <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as={Card.Subtitle} animation='glow'>
                    <Placeholder xs={2} />
                </Placeholder>
                <Placeholder as={Card.Text} animation='glow'>
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder.Button style={{width: '8%'}} className='me-2' variant="primary"/>
                <Placeholder.Button style={{width: '8%'}} variant="secondary" />
            </Card.Body>
            <Placeholder as={Card.Footer} animation='glow'>
                <Placeholder xs={4} />
            </Placeholder>
        </Card>
    );
};

export default PostSkeleton;
