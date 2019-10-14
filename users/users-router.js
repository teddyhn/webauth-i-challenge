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

router.post('/login', protected, (req, res) => {
    res.status(200).json({ message: "Logged in" });
});


// Middleware
function protected(req, res, next) {
    const { username, password } = req.body;
  
    if (username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compare(password, user.password)) {
                    req.session.user = {
                        id: user.id
                    };
                    next();
                } else res.status(400).json({ error: "You shall not pass!" });
            })
            .catch(err => {
                res.status(400).json(err)
            })
    } else {
        res.status(400).json({ message: "Invalid credentials" })
    };
};

module.exports = router;
