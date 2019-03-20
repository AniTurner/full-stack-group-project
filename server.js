const express = require('express');
const mongoose = require('mongoose')
const app = express();
require("dotenv").config();





//Bodyparser Middleware
app.use(express.json())
app.use("/auth", require("./routes/auth"));


//Connect to mongo
mongoose
    .connect(db, {useNewUrlParser: true, useCreateIndex: true}) //adding a new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

//Use Routes



const PORT = process.env.PORT || 5000




app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
