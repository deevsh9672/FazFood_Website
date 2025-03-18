const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/AuthController');

// Define routes
router.post('/signup', AuthController.Signup); 
// special fetch users
// router.get('/show/:id', AuthController.getUserById);
//all user get
// router.get('/ show', AuthController.getUserById);

// put methods --> updte data
router.put('/update/:id', AuthController.PutUsers);
// router.delete('/delete/:id', AuthController.DeleteUsers); // Delete all
// login

router.post ('/login',AuthController.loginUsers);


module.exports = router;
