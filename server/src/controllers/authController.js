const jwt = require('jsonwebtoken')
const User  =require('../models/userSchema')

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}

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

exports.getUserInfo=async(req,res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password')
    if(!user) throw new Error("User not found")
      res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}