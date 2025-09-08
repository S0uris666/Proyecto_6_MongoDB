
const express = require('express');
const auth = require('../middlewares/auth');
const authRol = require('../middlewares/authRol');
const eventRouter = express.Router();
const { createEvent, updateEvent, deleteEvent, getEventById, getAllEvents } = require('../controllers/Event.Controller');


//  Rutas públicas (sin auth, cualquiera puede usarlas)
eventRouter.get("/", getAllEvents);         // Listar todos los eventos
eventRouter.get("/:id", getEventById);   // Ver detalle de un evento

//  Rutas privadas (requieren auth y rol)
eventRouter.post("/", auth, authRol("superuser", "admin"), createEvent);
eventRouter.put("/:id", auth, authRol("superuser", "admin"), updateEvent);
eventRouter.delete("/:id", auth, authRol("superuser", "admin"), deleteEvent);

module.exports = eventRouter;