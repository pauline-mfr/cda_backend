const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/user.model');

exports.authenticateToken = (req, res) => {
    // const token = localStorage.getItem('access_token');
    // const token = req.headers.authorization.split(' ')[1];
    //
    const token = req.headers.cookie;
    console.log('token',token)

    // if (token == null) {
    //     return res.sendStatus(401)
    // } else {
    //
    //     jwt.verify(token, 'SECRET_KEY', (err, data) => {
    //         if (err) {
    //             return res.sendStatus(401)
    //         } else {
    //             res.status(200).send(data);
    //         }
    //
    //     });
    // }
}

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
            //refactor compare()
            bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                if (err) { throw (err); }
                if (result === true) {
                    console.log('user allowed');



                    res.status(200).json({
                        user_id: data[0].id,
                        username: req.body.username,
                        message: 'User allowed',
                        token: jwt.sign(
                            { username: req.body.username },
                            'SECRET_KEY',
                            { expiresIn: '24h' }
                        )
                    });
                } else {
                    console.log('not matching')
                    res.status(404).send('Incorrect username and/or password!')
                }
            });
            // bcrypt.compare(req.body.password, data[0].password)
            //     .then(valid => {
            //         console.log(req.body.password)
            //         console.log(data[0].password)
            //         console.log('user', data)
            //         //TOKEN
            //         res.status(200).send('User allowed')
            //         // res.status(200).json({
            //         //     user: req.body.username,
            //         //     message: 'User allowed',
            //         //     token: jwt.sign(
            //         //         { user: req.body.username },
            //         //         'SECRET_KEY',
            //         //         { expiresIn: '24h' }
            //         //     )
            //         // });
            //     })
            //     .catch(err => res.status(404).send('Incorrect username and/or password!'))


        }
        else res.status(404).send('Incorrect username and/or password!');
    });
};