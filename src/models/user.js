const mongoose = require ('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        //required : true,
        trim : true
    },
    email : {
        type : String,
        required :true,
        unique : true,
        trim: true,
        lowercase : true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        } 
    },
    password : {
        type : String,
        required : true,
        trim: true,
        minlength: 7,
        validate(value){
            if (value.toLowerCase().includes("password")){
                throw new Error('Password cannot contain "password"')
            }
        } 
    },
    numtel : {
        type : Number,
        //required : true,
        trim: true
    },
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: 'Food',
    }]
    },
    {
        timestamps: true  // create at, updated at
    })
/*userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);

    this.password = hashed;

    next();
});


userSchema.methods.genAuthToken = function () {
    return jwt.sign(this.toJSON(),  process.env.JWT_SECRET);
};

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password)
}
*/

const User = mongoose.model("User", userSchema)
module.exports = User