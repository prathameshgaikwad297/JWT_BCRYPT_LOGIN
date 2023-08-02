const router = require('express').Router();

const { userLogin } = require('../Controllers/login_controllers')

router.post('/login', userLogin);

module.exports = router;