const express = require("express")
const todoRouter = express.Router();
const Todo = require("../models/todo");

todoRouter.get("/", (req, res, next) => {

    // Addition: include filtering criteria to the find so that it only finds 
    // todo items with a 'user' property with the current user's id.
    Todo.find({user: req.user._id}, (err, todos) => {
        if (err) {
            res.status(500);
            return next(err);
        };
        return res.send(todos);
    });
});

todoRouter.post("/", (req, res, next) {
    const todo = new Todo(req.body);

    // Set the user property of a todo to req.user._id (logged-in user's `_id` property)
    todo.user = req.user._id;

    // Same as before
    todo.save(function (err, newTodo) {
        if (err) {
            res.status(500);
            return next(err);
        };
        return res.status(201).send(newTodo);
    })
});

todoRouter.get("/:todoId", (req, res, next) => {

    // Addition: Change to findOne and include the search criteria for users
    Todo.findOne({_id: req.params.todoId, user: req.user._id}, (err, todo) => {
        if (err) {
            res.status(500);
            return next(err);
        };
        if (!todo) {
            res.status(404);
            return next(new Error("No todo item found."));
        };
        return res.send(todo);
    });
});

todoRouter.put("/:todoId", (req, res, next) => {

    // Addition: Change to findOneAndUpdate and include the query for users
    Todo.findOneAndUpdate(
        // Updated query to include user
        {_id: req.params.todoId, user: req.user._id},
        req.body,
        {new: true},
        (err, todo) => {
            if (err) {
                res.status(500)
                return next(err);
            };
            return res.send(todo);
        }
    );
});

todoRouter.delete("/:todoId", (req, res, next) => {

    // Addition: Change to findOneAndRemove and include the search criteria for users
    Todo.findOneAndRemove({_id: req.params.todoId, user: req.user._id}, (err, todo) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.send(todo);
    });
});

module.exports = todoRouter;

module.exports = todoRouter;