
const express = require('express');
const auth = require('../middlewares/auth');
const  userRouter =express.Router();
const { verifyUser, createUser, updateUser, loginUser} = require('../controllers/user.Controller');
const { requestRole, updateRolUser, getRoleRequests, handleRoleRequest  } = require('../controllers/role.controller');
const authRol = require('../middlewares/authRol');


userRouter.post('/register', createUser);//http://localhost:3000/api/v1/users/register
userRouter.post('/login',loginUser)//http://localhost:3000/api/v1/users/login
userRouter.put('/update',auth, updateUser)//http://localhost:3000/api/v1/users/update
userRouter.get('/verify-user',auth, verifyUser);//http://localhost:3000/api/v1/users/verify-user
// Nueva ruta para solicitar cambio de rol
userRouter.post("/request-role", auth, requestRole); //http://localhost:3000/api/v1/users/request-role

//admin
//  cambia el rol de los users
/* userRouter.put('/update',auth, authRol("admin"), updateRolUser) //http://localhost:3000/api/v1/users/update */
// Ruta para que el admin vea las solicitudes de rol
userRouter.get("/role-requests-admin", auth, authRol("admin"), getRoleRequests); // http://localhost:3000/api/v1/users/role-requests-admin
// Ruta para que el admin apruebe o rechace una solicitud de rol
userRouter.put("/role-requests-admin/:id", auth, authRol("admin"), handleRoleRequest); // http://localhost:3000/api/v1/users/role-requests-admin/:id



//superuser
module.exports = userRouter