
const express = require('express');
const auth = require('../middlewares/auth');
const  userRouter =express.Router();
const { verifyUser, createUser, updateUser, loginUser} = require('../controllers/user.Controller');
const { requestRole, getRoleRequests, handleRoleRequest  } = require('../controllers/role.controller');
const authRol = require('../middlewares/authRol');


userRouter.post('/register', createUser);//http://localhost:3000/api/v1/users/register
userRouter.post('/login',loginUser)//http://localhost:3000/api/v1/users/login
userRouter.put('/update',auth, updateUser)//http://localhost:3000/api/v1/users/update
userRouter.get('/verify-user',auth, verifyUser);//http://localhost:3000/api/v1/users/verify-user
// Nueva ruta para solicitar cambio de rol
userRouter.post("/request-role", auth, requestRole); //http://localhost:3000/api/v1/users/request-role

//admin

// Ruta para que el admin vea las solicitudes de rol
userRouter.get("/role-requests-admin", auth, authRol("admin"), getRoleRequests); // http://localhost:3000/api/v1/users/role-requests-admin
// Ruta para que el admin apruebe o rechace una solicitud de rol
userRouter.put("/role-requests-admin/:id", auth, authRol("admin"), handleRoleRequest); // http://localhost:3000/api/v1/users/role-requests-admin/:id



//superuser
module.exports = userRouter;


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 *         role:
 *           type: string
 *           enum: [user, superuser, admin]
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado
 *
 * /users/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token
 *
 * /users/update:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *
 * /users/verify-user:
 *   get:
 *     summary: Verificar usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *
 * /users/request-role:
 *   post:
 *     summary: Solicitar rol superuser
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - motivation
 *             properties:
 *               motivation:
 *                 type: string
 *     responses:
 *       201:
 *         description: Solicitud enviada al admin
 *
 * /users/role-requests-admin:
 *   get:
 *     summary: Ver solicitudes de roles (admin)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de solicitudes pendientes
 *
 * /users/role-requests-admin/{id}:
 *   put:
 *     summary: Aprobar o rechazar solicitud de rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la solicitud de rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - decision
 *             properties:
 *               decision:
 *                 type: string
 *                 enum: [approved, rejected]
 *     responses:
 *       200:
 *         description: Solicitud procesada
 */