const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('MIDDLEWARE')
    console.log(req.body)
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRET_KEY');
        const user = decodedToken.user;
        console.log('decoded',decodedToken)
        console.log('req', req.body.username)
        if (req.body.username && req.body.username !== user) {
            //last time i checked : req.body was undefined !
            console.log('invalid user')
            throw 'Invalid user';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};