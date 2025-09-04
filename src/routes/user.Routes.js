
const express = require('express');
const auth = require('../middlewares/auth');
const  userRouter =express.Router();
const { verifyUser, createUser, updateUser, loginUser,updateRolUser } = require('../controllers/user.Controller');
const authRol = require('../middlewares/authRol');


userRouter.post('/register', createUser);
userRouter.post('/login',loginUser)
userRouter.put('/update',auth, updateUser)
userRouter.get('/verify-user',auth, verifyUser);
userRouter.put('/update',auth, authRol("admin"), updateRolUser)

module.exports = userRouter