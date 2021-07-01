const Food = require("../models/food")
// Add a new book
const addFoods = async(req, res) => {

    
    const food = new Food(req.body)
    try {
        //save book to DB
        const result = await food.save()
        console.log(result)
        //send success response to client
        res.status(201).json({
            message: "Food created successfully",
            data: result
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

//get all books
const getFoods = async(req, res) => {
    //console.log(req)
    try {
        const foods = await Food.find()
        console.log(foods)
        res.status(200).json({
            message: "foods found successfully",
            data: foods
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
//find a book by type
const getFoodByType = async (req, res) => {
    console.log(req)
    
    try {
        const food = await Food.find({type : req.params.type })
        if(!food) {
            res.status(404).json({
                message: "Book not found ",
                data: {}
            })
        }
        res.status(200).json({
            message: "Book found successfully",
            data: food
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
//find a book by title
const getFoodByTitle = async (req, res) => {
    console.log(req)
    
    try {
        const food = await Food.find({title : req.params.title })
        if(!food) {
            res.status(404).json({
                message: "Book not found ",
                data: {}
            })
        }
        res.status(200).json({
            message: "Food found successfully",
            data: food
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
module.exports = {
    addFoods ,
    getFoods ,
    getFoodByType,
    getFoodByTitle
}