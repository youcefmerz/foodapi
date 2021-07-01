const express = require("express")
const foodController = require("../controllers/foodController")
const foodRouter = express.Router()
foodRouter.post('/foods', foodController.addFoods)
foodRouter.get('/foods', foodController.getFoods)
foodRouter.get('/food/:type', foodController.getFoodByType)
foodRouter.get('/foodbytitle/:title', foodController.getFoodByTitle)
module.exports = foodRouter





