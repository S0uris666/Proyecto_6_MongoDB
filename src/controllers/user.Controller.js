const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    if (!newUser) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    return res.status(201).json({ datos: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "No se encontro el usuario" });
    }
    //compare passwords
    const correctPassword = await bcrypt.compare(password, foundUser.password);
    if (!correctPassword) {
      return res
        .status(400)
        .json({ message: "email o contrasenia no corresponde" });
    }

    const payload = {
      id: foundUser._id,
    };
    //sign token
    jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.verifyUser = async (req, res) => {
    
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ usuario: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    
  }
}

