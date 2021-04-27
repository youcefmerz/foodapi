//title description author, rating, nbVoters, img
const mongoose = require ('mongoose')
const validator = require('validator')
const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: String,
        required: true,
        trim: true
    },

    imgsrc: {
        type: String,
        default: "https://miro.medium.com/max/3200/1*xdo0UBpyszvD7-7EH4TkIA.png",
    }
},{
    timestamps: true  // create at, updated at
})
const Food = mongoose.model("Food", foodSchema)
module.exports = Food