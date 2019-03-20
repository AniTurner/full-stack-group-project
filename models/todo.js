const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({    
    // Add a reference to the user to whom this todo belongs
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('todo', todoSchema)