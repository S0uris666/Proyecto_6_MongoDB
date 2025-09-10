const express = require("express");
const productRouter = express.Router();
const { getProducts, createProduct, updateProductById, deleteProductById, getProductById } = require('../controllers/product.Controller');
const autorizeRoles = require("../middlewares/authRol");
const auth = require("../middlewares/auth");

productRouter.get('/readall', getProducts);
productRouter.post('/create',auth,autorizeRoles("admin"), createProduct);
productRouter.put('update/:id', auth ,autorizeRoles("admin"), updateProductById);
productRouter.delete('delete/:id',auth, autorizeRoles("admin"), deleteProductById);  
productRouter.get('/read/:id', getProductById); 

module.exports = productRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         stock:
 *           type: number
 */

/**
 * @swagger
 * /products/readall:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *
 * /products/read/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *
 * /products/create:
 *   post:
 *     summary: Crear un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *
 * /products/update/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *
 * /products/delete/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 */
