const bcrypt = require('bcrypt');

const User = require('../models/user.model');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const newUser = new User({
                username: req.body.username,
                password: hash,
                email: req.body.email,
            });

            User.create(newUser, (err, data) => {
                if (err)
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving users."
                    });
                else res.status(201).send('New user created');
            });
        })
};

exports.login = (req, res) => {

    const user = {
        username: req.body.username,
    };

    User.checkUser(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users."
            });
        if (data.length > 0) {
            //username is found
            bcrypt.compare(req.body.password, data[0].password)
                .then(valid => {
                    console.log('user', data)
                    res.status(200).send('User allowed')
                })
                .catch(err => res.status(404).send('Incorrect username and/or password!'))
        }
        else res.status(404).send('Incorrect username and/or password!');
    });
};