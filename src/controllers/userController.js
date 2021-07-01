const User = require("../models/user")
require("dotenv").config()
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  
  const { email , password } = req.body;
  
    try {  
      console.log('passs',password)
      const user = await User.findOne({email:email});
  console.log('useer',user)
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('ismatc',isMatch)
      if (!isMatch) {
        return res.status(400).json({ erorr: "Invalid Credentials" });
      }
  
      const payload = {
        user: {
          _id: user._id,
        },
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });
  const namee = user.name
  
      res.status(200).json({ token , namee });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server Error" });
    }
  }

//register
const register = async (req, res) => {
    const { name, email, password , numtel } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      const hashedPsw = await bcrypt.hash(password, 10);
  
      user = new User({
        name,
        email,
        password: hashedPsw,
        numtel,
      });
  
      const newUser = await user.save();
  
      const payload = {
        user: {
          _id: newUser._id,
        },
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });
  
      res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
//getusers
const getUsers = async(req, res) => {
  //console.log(req)
  try {
      const users = await User.find()
      console.log(users)
      res.status(200).json({
          message: "users found successfully",
          data: users
      })
  } catch(err){
      console.log(`Error is: ${err}`)
      //send error response to client
      res.status(500).json({
          message: "Intrenal server error",
          data: {}
      }) 
  }
}

  //checktoken
  const authMid1 = async (req, res) => {
    const token = req.header('x-auth-token');
    console.log('token',token)
    if (!token) return res.status(401).send('Unauthorized, please login first');

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
              
        const user1 = await User.findById(user.user._id); 
      console.log(user1)  
        res.json({user1});
        
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
};

const addToCart = async (req, res) => {
  const foodId = req.params._id
  
  const token = req.header('auth');
  console.log('token',token)
  if (!token) return res.status(401).send('Unauthorized, please login first');

  try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log('userid',user)
      const user1 =  await User.findByIdAndUpdate(user.user._id,
        {$push: {cart: foodId}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
            console.log(err);
            }else{
            //do stuff
            }
        }
    );
       
    console.log(user1)  

      res.status(200).json("sucesss");
      
  } catch (err) {
      return res.status(401).send('Invalid token');
  }
};

//getcardfooods
const getFoodsInCart = async (req, res) => {
    const token = req.header('auth');
  console.log('token',token)
  if (!token) return res.status(401).send('Unauthorized, please login first');

  try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log('userid',user)
      const user1 =   await User.findById(user.user._id).populate('cart');
      console.log('user 11',user1) 
    
      res.json(user1);
      
  } catch (err) {
      return res.status(401).send('Invalid token');
  }
};
//remove food from cart
const removeFoodsFromCart = async (req, res) => {
  const idFood = req.params.idd
  const token = req.header('auth');
console.log('token',token)
if (!token) return res.status(401).send('Unauthorized, please login first');

try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log('userid',user)
    const user1 =   await User.findByIdAndUpdate(user.user._id ,
       { $pull: { cart: idFood }})
    console.log('user 11',user1) 
    res.json(user1);
    
} catch (err) {
    return res.status(401).send('Invalid token');
}
};


module.exports = {
    login,
    register,
    authMid1,
    getUsers,
    addToCart,
    getFoodsInCart,
    removeFoodsFromCart,
}
