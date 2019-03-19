const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt.js')
const config = require('config')
const jwt = require('jsonwebtoken')

//User Model
const User = require('../../models/User')

router.post('/', (req, res) => {
    const {username, password} = req.body
})

    //Validation
    if(!username || !password) {
        return res.status(400).json({msg: "please enter all fields"})
    }

    //check for existing user
    User.findOne({username}).then(user => {
        if(user) {
            return res.status(400).json({msg: 'User already exists'})

            //if user doesn't exist - create one
            const newUser = new User({
                username,
                password
            })

            //crete salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash
                    newUser.save()
                    .then(user => {
                        //payload
                        jwt.sign(
                            {id: user.id},
                            config.get('jwtSecret'),
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        username: user.username
                                    }
                                })
                            }
                        )
                       
                    })
                })
            } )
        }
    }



module.exports = router