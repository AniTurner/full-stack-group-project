const express = require('express')
const categoryRouter = express.Router()
const Category = require('../models/category.js')

// GET ALL CATEGORIES FOR EVERY USER
// for generating the portfolio's menu and the category dropdowns
categoryRouter.get('/', (req, res) => {
    Category.find((err, userCategories) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userCategories)
    })
})

// GET ALL CATEGORIES FOR A SPECIFIC USER
// for generating the portfolio's menu and the category dropdowns
categoryRouter.get('/search', (req, res) => {
    Category.find({userId: req.query.userid}, (err, userCategories) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userCategories)
    })
})

// CREATE NEW CATEGORY PER USER
categoryRouter.post('/add', (req, res, next) => {
    const newCategory = new Category(req.body)
    newCategory.userId = req.query.userid
    newCategory.save((err, newSavedCategory) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newSavedCategory)
    })
})

// DELETE A CATEGORY
categoryRouter.delete('/:_id', (req, res) => {
    Category.findOneAndRemove({ _id: req.params._id }, (err, deletedCategory) => {
        if (err) {
            res.status(500)
            return res.send(err)
        }
        // 202 allows for a response message, 204 deletes but has no message
        return res.status(202).send(`Successfully deleted Category ${deletedCategory.title}`)
    })
})

// EDIT A CATEGORY
categoryRouter.put('/:_id', (req, res) => {
    Category.findOneAndUpdate(
        { _id: req.params._id },
        req.body,
        { new: true },
        (err, updatedCategory) => {
            if (err) {
                res.status(500)
                return res.send(err)
            }
            return res.status(201).send(updatedCategory)
        })
})

module.exports = categoryRouter