// User Authentication APIs
const jwt = require('jsonwebtoken')
const User  =require('../models/userSchema')

//Generate token
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}

//register or SignUP API
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//Login or SignIn API
exports.loginUser=async(req,res)=>{
  try {
    const {email,password} = req.body
    if(!email || !password) throw new Error("All fields are rquired")
      const user = await User.findOne({email})
    if(!user || !(await user.comparePassword(password))){
      throw new Error('Invalid Crenditail')
    }
    res.status(200).json({id : user._id,
      user,
      token : generateToken(user._id)
    })
  } catch (error) {
        res.status(500).json({error: error.message})    
  }
}

//Get User Info API
exports.getUserInfo=async(req,res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password')
    if(!user) throw new Error("User not found")
      res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

//Update user name and Profile Image API
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw new Error("User not found");

    // FE  name come then update 
    if (req.body.name) user.name = req.body.name;

    // FE image file come then update 
    if (req.file) {
      const imageUrl = encodeURI(
        `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      );
      user.profileImageUrl = imageUrl;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
