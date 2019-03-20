const express = require('express');
const mongoose = require('mongoose')
const expressJwt = require("express-jwt");
const morgan = require('morgan')
const PORT = process.env.PORT || 7000;
const app = express();
require("dotenv").config();


// Middlewares for every request
app.use(express.json())
app.use(morgan('dev'))
app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/todo.js"));

// Make the app use the express-jwt authentication middleware on anything starting with "/api"
app.use("/api", expressJwt({secret: process.env.SECRET}));

// Add `/api` before your existing `app.use` of the todo routes.
// This way, it must go through the express-jwt middleware before
// accessing any todos, making sure we can
app.use("/api/todo", require("./routes/todo"));


// Middlewares for every request
mongoose.connect("mongodb://localhost:27017/db-relations", {useNewUrlParser: true}, () => {
    console.log("[o] Connected to the DB")
})

// Routes
app.use('/', require('./routes/userRoutes.js'))


// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    if (err.name === "UnauthorizedError") {
        // express-jwt gives the 401 status to the err object for us
        res.status(err.status);
    }
    return res.send({errMsg: err.message})
})

// Server
app.listen(PORT, () => {
    console.log(`[+] Server is running on port ${PORT}` )
})
