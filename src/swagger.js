// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Proyecto 6 Bootcamp - Documentación",
      version: "1.0.0",
      description: "Documentación de la API desplegada en Render",
    },
    servers: [
      {
        url: "https://proyecto-6-mongodb-erpe.onrender.com/api/v1", // Render
      },
      {
        url: "http://localhost:3000/api/v1", // Local
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Aquí Swagger buscará la documentación de tus rutas
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };