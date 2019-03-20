const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String
    },

    lastName:{
        type:String
    },

    aboutMe:{
        type:String
    },

    email:{
        type:String
    },

    address:{
        type:String

    },

    phone:{
        type:Number
    },

    themeId:{
        type:String,
        required: true
    },

    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required: true
    }
})


module.exports = mongoose.model("User",userSchema)

