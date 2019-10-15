import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register(props) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = evt => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        axios
            .post('http://localhost:5000/api/register', credentials)
            .then(res => {
                props.history.push('/login');
            })
            .catch(err => console.log(err));
    };
    
    console.log(credentials);

    return (
        <div className="register-page">
            <Form className="react-bootstrap-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={evt => handleChange(evt)}
                    />
                </Form.Group>
    
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={evt => handleChange(evt)}
                    />
                </Form.Group>
    
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Register;