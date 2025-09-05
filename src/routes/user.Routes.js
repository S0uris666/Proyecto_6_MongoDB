
const express = require('express');
const auth = require('../middlewares/auth');
const  userRouter =express.Router();
const { verifyUser, createUser, updateUser, loginUser} = require('../controllers/user.Controller');
const { requestRole, updateRolUser, getRoleRequests, handleRoleRequest  } = require('../controllers/role.controller');
const authRol = require('../middlewares/authRol');


userRouter.post('/register', createUser);
userRouter.post('/login',loginUser)
userRouter.put('/update',auth, updateUser)
userRouter.get('/verify-user',auth, verifyUser);
userRouter.post("/request-role", auth, requestRole); // Nueva ruta para solicitar cambio de rol

//admin
userRouter.put('/update',auth, authRol("admin"), updateRolUser) // Ruta protegida, solo accesible para usuarios autenticados y con rol admin, cambia el rol de los users
userRouter.get("/role-requests-admin", auth, autorizeRoles("admin"), getRoleRequests); // Ruta para que el admin vea las solicitudes de rol
userRouter.put("/role-requests-admin/:id", auth, autorizeRoles("admin"), handleRoleRequest); // Ruta para que el admin apruebe o rechace una solicitud de rol



//superuser
module.exports = userRouter