const express = require("express");
const route = express.Router();
const {protect} = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')
const {
  loginUser,
  getUserInfo,
  registerUser,
} = require("../controllers/authController");

route.post("/register", registerUser);

route.post("/login", loginUser);

route.get("/getUser", protect, getUserInfo);

route.post(
  "/upload-image",
  upload.single("image"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" })
      }

      const imageUrl = encodeURI(
        `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      )

      res.status(200).json({ imageUrl })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
)



module.exports = {
  route,
};
