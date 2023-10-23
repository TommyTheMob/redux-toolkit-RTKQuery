import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {addReactionThroughServer} from './postsSlice.js'
import {useDispatch} from "react-redux";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const canSave = addRequestStatus === 'idle'

    const onReactionClick = async (name) => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(addReactionThroughServer({postId: post.id, name})).unwrap()
            } catch (err) {
                console.error('Failed to update reaction', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    const reactionButtons = Object.entries(reactionEmoji)
        .map(([name, emoji]) => (
            <Button
                className={`m-1`}
                size='sm'
                variant='outline-secondary'
                key={name}
                disabled={!canSave}
                onClick={() => {onReactionClick(name)}}
            >
                {emoji} {post.reactions[name]}
            </Button>
        ))
    return (
        <div>
            {reactionButtons}
        </div>
    );
};

export default ReactionButtons;
