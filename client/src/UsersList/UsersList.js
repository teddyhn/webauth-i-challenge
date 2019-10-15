import React, { useState, useEffect } from 'react'
import axios from 'axios';

import CardDeck from 'react-bootstrap/CardDeck';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/users', { withCredentials: true })
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    console.log(users);

    return (
        <div className="users-list">
            <h1>Users</h1>
            {users.map(user => (
                <p>{user.username}</p>
            ))}
        </div>
    );
};

export default UsersList;