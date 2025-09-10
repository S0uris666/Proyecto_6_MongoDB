const RoleRequest = require("../models/roleRequestModel");
const User = require("../models/userModel");


/* exports.updateRolUser = async (req, res) => { //actualizar el rol del user
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!['user', 'superuser'].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, select: "-password" } // Excluir password en la respuesta
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Role updated successfully", user: updatedUser });



  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error" });
  }
} */

exports.requestRole = async (req, res) => {
  try {
    const { motivation } = req.body;

    // Validar si ya tiene solicitud pendiente
    const existing = await RoleRequest.findOne({ user: req.user.id, status: "pending" });
    if (existing) {
      return res.status(400).json({ message: "Ya tienes una solicitud pendiente, por favor espera a que el adminstrador la revise" });
    }

    // Crear nueva solicitud
    const newRequest = new RoleRequest({
      user: req.user.id,
      requestedRole: "superuser",
      motivation
    });

    await newRequest.save();

    res.status(201).json({ message: "Solicitud enviada al administrador", request: newRequest });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al solicitar rol" });
  }
};


exports.getRoleRequests = async (req, res) => { // Obtener todas las solicitudes de rol pendientes (solo para admin)
  try {
    const requests = await RoleRequest.find({ status: "pending" })
      .populate("user", "name email"); // Muestra info básica del usuario
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener solicitudes" });
  }
};


exports.handleRoleRequest = async (req, res) => { // Aprobar o rechazar una solicitud de rol (solo para admin)
  try {
    const { decision } = req.body; // "approved" o "rejected"
    const request = await RoleRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Solicitud no encontrada" });

    if (decision === "approved") {
      await User.findByIdAndUpdate(request.user, { role: request.requestedRole });
      request.status = "approved";
    } else {
      request.status = "rejected";
    }

    await request.save();
    res.json({ message: `Solicitud ${decision}`, request });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al procesar solicitud" });
  }
};

