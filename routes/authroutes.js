const express = require("express");
const router = express.Router();
const { signup, login, logout, getProfile, checkAuth } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/middleware");


router.post("/signup", signup);
router.post("/login", login);
router.get("/logout",  logout);
router.get("/profile", verifyToken, getProfile);
router.get('/check-auth', checkAuth);

module.exports = router;
