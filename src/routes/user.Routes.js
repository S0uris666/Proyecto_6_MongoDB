
const express = require('express');
const auth = require('../middlewares/auth');
const  userRouter =express.Router();
const { verifyUser, createUser, updateUser, loginUser } = require('./controllers/user.Controller');


userRouter.post('/register', createUser);
userRouter.post('/login',loginUser)
/* userRouter.put('/update', updateUser); */
userRouter.get('/verify-user',auth, verifyUser);

module.exports = userRouter;