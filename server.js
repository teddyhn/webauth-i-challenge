const express = require('express');
const session = require('express-session');
const cors = require('cors');

const restricted = require('./middleware/restricted.js');
const UsersRouter = require('./users/users-router.js');

const server = express();

server.use(
    session({
        name: 'bignut',
        secret: 'super secret',
        cookie: {
            maxAge: 300000,
            secure: false,
            httpOnly: true
        },
        resave: false,
        saveUninitialized: false,
    })
);
server.use(express.json());
server.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
server.use('/api/restricted/*', restricted);
server.use('/api', UsersRouter);

module.exports = server;