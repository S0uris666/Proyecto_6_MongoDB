const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      required:true
    },
    organizer: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // formato "HH:mm"
      required: true,
    },
    endTime: {
      type: String, // formato "HH:mm"
      required: true,
    },
        createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", // nombre del modelo de usuario
    required: true 
  },
    requiresRegistration: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0, // 0 = gratuito
    },
    capacity: {
      type: Number,
      default: null, // null = ilimitado
    },
    tags: [String], // Ej: ["conferencia", "taller", "online"]
    createdAt: {
      type: Date,
      default: Date.now,
    }

  },
  { timestamps: true }
);


module.exports = mongoose.model("Event", eventSchema);
