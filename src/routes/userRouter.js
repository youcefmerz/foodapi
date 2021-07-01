const express = require("express")
const userController = require("../controllers/userController")
const jwt = require("jsonwebtoken");

const userRouter = express.Router() 

userRouter.post('/login' , userController.login)
userRouter.post('/register',userController.register)
userRouter.get('/users', userController.getUsers)
userRouter.get('/checktoken', userController.authMid1)
userRouter.get('/addToCart/:_id' , userController.addToCart)
userRouter.get('/foodsInCard' , userController.getFoodsInCart)
userRouter.get('/removeFromCart/:idd' , userController.removeFoodsFromCart)
userRouter.get('/getuser', userController.authMid1)
module.exports = userRouter
