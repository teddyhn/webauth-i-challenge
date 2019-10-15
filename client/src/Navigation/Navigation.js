import React from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

function Navigation(props) {
    const logout = () => {
        localStorage.clear();
        axios
            .get('http://localhost:5000/api/logout')
            .then(res => {
                props.history.push('/login');
            })
    };

    if (props.location.pathname === "/users") {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Auth demo</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        )
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Auth demo</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Navigation;