const express = require("express")
const foodController = require("../controllers/foodController")
const foodRouter = express.Router()
foodRouter.post('/foods', foodController.addFoods)
foodRouter.get('/foods', foodController.getFoods)

module.exports = foodRouter





