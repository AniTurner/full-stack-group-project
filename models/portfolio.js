const mongoose = require('mongoose')
const Schema = mongoose.Schema

const portfolioSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    title:{
        type: String,
        required:true
    },
    imageUrl:{
        type:String,
        required: true
    },
    imageTitle:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    featured:{
        type:Boolean
    }

})


module.exports = mongoose.model("Portfolio",portfolioSchema)

