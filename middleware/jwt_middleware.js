var jwt = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.headers.token;
        if (token) {
            jwt.verify(token, 'secretkey', (err, decoded) => {
                if (err) {
                    res.send({ err: true, message: "unauthorised user" })
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.send({ err: true, message: "Token not Provided" });
        }
    }
}