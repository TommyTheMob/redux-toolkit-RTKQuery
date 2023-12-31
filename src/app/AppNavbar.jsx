import React from 'react';
import {Badge, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAllNotifications} from "../featurs/notifications/notificationsSlice.js";

const AppNavbar = () => {
    const allNotifications = useSelector(selectAllNotifications)

    const numUnreadNotifications = allNotifications.filter(notification => !notification.read).length

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src="https://d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg"
                            alt=""
                            width="30"
                            height="30"
                            className='d-inline-block align-top'
                        />
                        Redux/toolkit
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/counter">Counter</Nav.Link>
                            <NavDropdown title="Posts" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/posts">Posts list</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Users" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/users">Users list</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/notifications">
                                Notifications
                                <Badge pill className='align-top ms-1' bg="primary">{numUnreadNotifications}</Badge>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </>
    );
};

export default AppNavbar;
