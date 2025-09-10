
const express = require('express');
const auth = require('../middlewares/auth');
const authRol = require('../middlewares/authRol');
const eventRouter = express.Router();
const { createEvent, updateEvent, deleteEvent, getEventById, getAllEvents } = require('../controllers/Event.Controller');


//  Rutas públicas (sin auth, cualquiera puede usarlas)
eventRouter.get("/readall", getAllEvents);         // Listar todos los eventos
eventRouter.get("read/:id", getEventById);   // Ver detalle de un evento

//  Rutas privadas (requieren auth y rol)
eventRouter.post("/create", auth, authRol("superuser", "admin"), createEvent);
eventRouter.put("update/:id", auth, authRol("superuser", "admin"), updateEvent);
eventRouter.delete("delete/:id", auth, authRol("superuser", "admin"), deleteEvent);

module.exports = eventRouter;


/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - organizer
 *         - location
 *         - startDate
 *         - endDate
 *         - startTime
 *         - endTime
 *       properties:
 *         id:
 *           type: string
 *           description: ID del evento
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         organizer:
 *           type: string
 *         location:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         startTime:
 *           type: string
 *         endTime:
 *           type: string
 *         requiresRegistration:
 *           type: boolean
 *         price:
 *           type: number
 *         capacity:
 *           type: number
 *         tags:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Listar todos los eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Evento creado
 *
 * /events/{id}:
 *   get:
 *     summary: Obtener evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 *   put:
 *     summary: Actualizar un evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Eliminar un evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 */