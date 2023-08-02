const bcrypt = require('bcrypt');
const connection = require('../Connection/mysql_connection');
const jwt=require('jsonwebtoken');

module.exports = {
    userLogin: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        connection.query('select * from users where Email=?', [username], (err, result) => {
            if (err) {
                res.send({ err: false, message: err.message });
            } else {
                const isSame = bcrypt.compareSync(password, result[0].password);
                if (isSame) {
                    const token=jwt.sign({id:result[0].id},'secretkey',{expiresIn:'1h'});
                    res.send({ err: false,token:token, message: "Login sucessfully" });
                }
            }

        })
    }
}