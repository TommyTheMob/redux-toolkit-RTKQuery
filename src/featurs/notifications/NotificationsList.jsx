import React, {useEffect} from 'react';
import {Button, Container, ListGroup} from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {
    allNotificationsRead,
    createNewNotify,
    fetchNotifications,
    selectAllNotifications
} from "./notificationsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {selectAllUsers} from "../users/usersSlice.js";
import {formatDistanceToNow, parseISO} from "date-fns";
import {FiRefreshCw} from "react-icons/fi";

const NotificationsList = () => {
    const notifications = useSelector(selectAllNotifications)
    const users = useSelector(selectAllUsers)
    const dispatch = useDispatch()

    const notificationsStatus = useSelector(state => state.notifications.status)
    const error = useSelector(state => state.notifications.error)

    useEffect(() => {
        dispatch(allNotificationsRead())
    }, [])

    let content
    if (notificationsStatus === 'loading') {
        content =
            <>
                SKELETON
            </>
    } else if (notificationsStatus === 'succeeded') {
        const orderedNotifications = notifications.concat().sort((a, b) => b.date.localeCompare(a.date))

        content =
            <ListGroup className='mt-3' as="ul">
                {orderedNotifications
                    .map(notification => {
                        const date = parseISO(notification.date)
                        const timeAgo = formatDistanceToNow(date)
                        const user = users.find(user => user.id === notification.user) || {name: 'Unknown User'}

                        return (
                            <ListGroup.Item
                                className={notification.isNew ? `bg-dark-subtle` : ``}
                                key={notification.id}
                            >
                                <Container>
                                    <span className='fw-bold'>{user.name}</span>
                                    &nbsp;
                                    <span>{notification.message}</span>
                                </Container>
                                <Container>
                                    <span className='fst-italic text-muted'>{timeAgo} ago</span>
                                </Container>
                            </ListGroup.Item>
                        )
                    })}
            </ListGroup>

    } else if (notificationsStatus === 'failed') {
        content =
            <Container>
                {error}
            </Container>
    }

    return (
        <Container className='text-center'>
            <Container>
                <h1>Notifications</h1>
                <Container className='d-flex justify-content-between'>
                    <OverlayTrigger
                        placement="right"
                        delay={{show: 250, hide: 400}}
                        overlay={<Tooltip id="button-tooltip">Mark all as read</Tooltip>}
                    >
                        <Button
                            variant='success'
                            onClick={() => dispatch(allNotificationsRead())}
                        >
                            Read
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="right"
                        delay={{show: 250, hide: 400}}
                        overlay={<Tooltip id="button-tooltip">Creates a new notify on server and updates state.</Tooltip>}
                    >
                        <Button
                            variant='secondary'
                            onClick={() => dispatch(createNewNotify())}
                        >
                            Create notify
                        </Button>
                    </OverlayTrigger>
                </Container>
            </Container>


            {content}
        </Container>
    );
};

export default NotificationsList;
