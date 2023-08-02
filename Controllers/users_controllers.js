const connection = require('../Connection/mysql_connection');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

module.exports = {
  getAllUsers: (req, res) => {

    connection.query(`Select id ,name,Email,mobile from users where isActive=1 and id=${req.user.id}`, (err, result) => {
      if (err) {
        res.send({ error: true, message: err.message });
      } else {
        res.send({ error: false, message: "successfully get users", data: result });
      }
    })
  },
  createUsers: (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ error: true, errors: errors.array() })
    } else {
      let user = req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(user.password, salt);
      connection.query(`INSERT INTO users(id, name, Email, mobile, password, isActive) VALUES (0,'${user.name}','${user.Email}','${user.mobile}','${hashPassword}',1)`, (err, result) => {
        if (err) {
          res.send({ error: true, message: err.message });
        } else {
          res.send({ error: false, message: "successfully create users", data: result });
        }
      })
    }
  },
  updateUsers: (req, res) => {
    let id = req.params.id;
    let user = req.body;
    connection.query(`update users set mobile=${user.mobile} where id=${id}`, (err, result) => {
      if (err) {
        res.send({ error: true, message: err.message });
      } else {
        res.send({ error: false, message: "success update user", data: result[0] });
      }
    })
  },
  deleteUsers: (req, res) => {
    let id = req.params.id;
    connection.query(`update users set isActive=0  where id=${id}`, (err, result) => {
      if (err) {
        res.send({ error: true, message: err.message });
      } else {
        res.send({ error: false, message: "successfully delete user", data: result[0] });
      }
    })
  },
  findUsers: (req, res) => {
   
    connection.query(`Select id ,name,Email,mobile from users where id=${req.user.id}`, (err, result) => {
      if (err) {
        res.send({ error: true, message: err.message });
      } else {
        res.send({ error: false, message: "successfully find user", data: result[0] });
      }
    })
  }
}