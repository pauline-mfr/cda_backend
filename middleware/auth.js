const jwt = require('jsonwebtoken');
//
// module.exports = (req, res, next) => {
//     next();
// }



module.exports = (req, res, next) => {
    console.log('Auth middleware')
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRET_KEY');
        const user = decodedToken.user;
        // console.log('decoded',decodedToken)
        if (req.body.username && req.body.username !== user) {
            //last time i checked : req.body was undefined !
            console.log('invalid user')
            throw 'Invalid user';
        } else {
            next();
        }
    } catch {
        console.log('ici que ça merde')
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};