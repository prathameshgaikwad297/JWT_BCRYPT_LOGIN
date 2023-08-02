var express = require('express');
var router = express.Router();
const usersControllers = require('../Controllers/users_controllers');
const {body}=require('express-validator');

/* GET users listing. */
router.get('/', usersControllers.getAllUsers);

/*create users. */
router.post('/create',[
    body('name').notEmpty().withMessage('name is required').isAlpha().withMessage("please enter the valid name in character only").isLength({min:2,max:250}).withMessage('name must be more than 2 characters'),
    body('Email').notEmpty().withMessage('Email is required').isEmail().withMessage('please enter valid email'),
    body('password').notEmpty().withMessage("password is required").isStrongPassword().withMessage("please enter a strong password"),
    body('mobile').notEmpty().withMessage('mobile is required').isMobilePhone().withMessage('please enter a mobile no')],
    usersControllers.createUsers);

    
/* Update users data. */
router.post('/update/:id', usersControllers.updateUsers);

/* Delete users. */
router.post('/delete/:id', usersControllers.deleteUsers);

/*Find users . */
router.post('/find/:id', usersControllers.findUsers);



module.exports = router;
