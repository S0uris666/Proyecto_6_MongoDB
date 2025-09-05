const mongoose = require("mongoose");

const roleRequestSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  requestedRole: { 
    type: String, 
    enum: ["superuser"], // Solo se puede solicitar superuser
    default: "superuser",
    required: true 
  },
  motivation: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  }
}, { timestamps: true });

module.exports = mongoose.model("RoleRequest", roleRequestSchema);