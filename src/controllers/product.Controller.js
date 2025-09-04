const Product = require("../models/productModel");

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getProducts = async (req, res) => {
    
  try {
    const products = await Product.find({});
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price , category,stock} = req.body;
    const newProduct = await Product.create({  name, description, price , category,stock});
    if (!newProduct) {
      return res.status(400).json({ message: "Invalid product data" });
    }
    return res.status(201).json({ datos: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProductById = async (req, res) => {
    
  try {
    const {name, description, price, category, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ datos: updatedProduct });
  } catch (error) {
    console.error("Error updating Product:", error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.deleteProductById = async (req, res) => {
    
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting Product:", error);
    res.status(500).json({ message: "Server error" });
  }
}