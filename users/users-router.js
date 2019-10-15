const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

const router = express.Router();

router.post('/register', (req, res) => {
    let { username, password } = req.body;

    if (username && password) {
        const hash = bcrypt.hashSync(password, 10);
    
        req.body.password = hash;
    
        Users.add(req.body)
            .then(saved => {
                res.status(201).json(saved)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        res.status(400).json({ message: "Please provide valid credentials" })
    }
});

router.post('/login', protected, (req, res) => {
    res.status(200).json({ message: "Logged in" });
});

router.get('/users', (req, res) => {
    req.session && req.session.user ?
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    : res.status(400).json({ message: "You shall not pass!" });
});

router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.send('error logging out');
        } else {
          res.send('good bye');
        }
      });
    }
  });


// Middleware
function protected(req, res, next) {
    const { username, password } = req.body;
  
    if (username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    req.session.user = user;
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
