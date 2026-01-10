const express = require("express");
const route = express.Router();
const {
  loginUser,
  getUserInfo,
  registerUser,
} = require("../controllers/authController");

route.post("/register", registerUser);

route.post("/login", loginUser);

// route.post("/getUser", protect, getUserInfo);

module.exports = {
  route,
};
