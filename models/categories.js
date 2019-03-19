const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type:String
    }
})

module.exports = mongoose.model("Categories",categoriesSchema)