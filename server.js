const express = require('express');
const session = require('express-session');

const UsersRouter = require('./users/users-router.js');

const server = express();

server.use(
    session({
        name: 'bignut',
        secret: 'super secret',
        cookie: {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            secure: false,
        },
        httpOnly: true,
        resave: false,
        saveUninitialized: false,
    })
);
server.use(express.json());
server.use('/api', UsersRouter);

module.exports = server;