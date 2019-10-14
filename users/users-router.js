const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

const router = express.Router();

router.post('/register', (req, res) => {
    let { username, password } = req.body;

    if (username && password) {
        const hash = bcrypt.hashSync(password, 10);
    
        password = hash;
    
        Users.add(req.body)
            .then(saved => {
                res.status(201).json(saved)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    } else {
        res.status(400).json({ message: "Please provide valid credentials" })
    }
});

module.exports = router;
