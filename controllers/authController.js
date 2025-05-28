const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword, role });
    await user.save();
    user.password = undefined;

    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.SECRET_KEY || "default_secret", 
  { expiresIn: "1h" }
);

    console.log(process.env.SECRET_KEY)

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000
    });

    res.status(200).json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

const logout = (req, res) => {
   res.clearCookie('token', {
    httpOnly: true,
    secure: false,  
    sameSite: 'strict'
  });
  res.json({ message: 'Logged out successfully' });
};

const getProfile = (req, res) => {
  res.status(200).json(req.user);
};
const checkAuth = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "default_secret");
    //  console.log( process.env.SECRET_KEY)
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    res.status(200).json({ success: true, message: "Authenticated", user });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token", error: err.message });
  }
};


module.exports = { signup, login, logout, getProfile, checkAuth };
