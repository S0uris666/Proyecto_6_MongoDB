const Event = require("../models/EventModel");

// Crear un nuevo evento

exports.createEvent = async (req, res) => {
  try {
    const { title, startDate, endDate, location } = req.body;
    const existingEvent = await Event.findOne({ title, startDate, endDate, location });

    if (existingEvent) {
      return res.status(400).json({
        error: "Ya existe un evento con el mismo título, fecha y lugar.",
      });
    }

    // falta validar que el evento no existe
    const newEvent = await Event.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar evento
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Evento no encontrado" });

    // Admin puede todo
    if (req.user.role === "admin") {
      const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.json(updated);
    }

    // Superuser solo puede editar lo que creó
    if (
      req.user.role === "superuser" &&
      event.createdBy.toString() === req.user._id.toString()
    ) {
      const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.json(updated);
    }

    return res
      .status(403)
      .json({ message: "No tienes permisos para editar este evento" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar evento
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Evento no encontrado" });

    if (
      req.user.role === "admin" ||
      (req.user.role === "superuser" &&
        event.createdBy.toString() === req.user._id.toString())
    ) {
      await Event.findByIdAndDelete(req.params.id);
      return res.json({ message: "Evento eliminado correctamente" });
    }

    return res
      .status(403)
      .json({ message: "No tienes permisos para eliminar este evento" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos los eventos
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email role");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un evento por ID
exports.getEventById = async (req, res) => {
  try {
    // Buscamos solo por _id, no usamos populate
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    return res.status(200).json({ event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
