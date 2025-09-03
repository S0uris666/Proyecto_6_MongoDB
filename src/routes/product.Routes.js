const express = require("express");
const productRouter = express.Router();
const { getProducts, createProduct, updateProductById, deleteProductById } = require('../controllers/product.Controller');


productRouter.get('/readall', getProducts);
productRouter.post('/create', createProduct);
productRouter.put('update/:id', updateProductById);
productRouter.delete('delete/:id', deleteProductById);   //falta leer por id

module.exports = productRouter;