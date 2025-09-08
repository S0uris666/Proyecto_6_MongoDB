const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  products: [
    {
      quantity: { type: Number, required: true, min: 1 },
      priceID: { type: String, required: true },
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      slug: { type: String, required: true }
    }
  ]
});
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
