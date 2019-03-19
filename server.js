const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7000;


app.use(express.json())
app.use(morgan('dev'))


app.use('/',require('./Routes/'))





app.listen(PORT , () => {
    console.log(`[+] Server is running on port ${PORT}` )
})