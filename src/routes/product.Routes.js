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