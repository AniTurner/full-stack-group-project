const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7000;

// Middlewares for every request
app.use(express.json())
app.use(morgan('dev'))

// Middlewares for every request
mongoose.connect("mongodb://localhost:27017/attache", {useNewUrlParser: true}, () => {
    console.log("[o] Connected to the DB")
})

// Routes
app.use('/signup/v1', require('./routes/userRoutes.js'))


// Error handler
app.use((err, req, res, next) => {
    console.error(err)
    return res.send({errMsg: err.message})
})

// Server
app.listen(PORT, () => {
    console.log(`[+] Server is running on port ${PORT}` )
})