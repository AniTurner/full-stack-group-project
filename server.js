const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const app = express();
const config = require('config')




//Bodyparser Middleware
app.use(express.json())

//DB configuration
const db = config.get('mongoURI')

//Connect to mongo
mongoose
    .connect(db, {useNewUrlParser: true, useCreateIndex: true}) //adding a new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

//Use Routes
// app.use('./items', require('./routes/items'))
app.use('./api/users', require('./routes/users'))

//serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        escape.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000




app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
