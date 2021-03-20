const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config')


router.post('/login', function(req, res) {
  const { email, password } = req.body

  if(!email) {
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email'}]})
  }
  if(!password) {
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password'}]})
  }

  User.findOne({email}, function(err, foundUser) {
    if(err) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'Someting went wrong'}]})
    }
    if(!foundUser) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'User is not exist'}]})
    }
    if(!foundUser.hasSamePassword(password)) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password!'}]})
    }

    const token = jwt.sign({
      userId: foundUser.id,
      username: foundUser.username
    }, config.SECRET, { expiresIn: '1h' });

    return res.json(token)
  })

})


router.post('/register', function(req,res){
  // 省略して書く
  const { username,email,password,confirmPassword} = req.body
  //   const username = req.body.username
  //   const email = req.body.email
  //   const password = req.body.password
  //   const confirmPassword = req.body.confirmPassword

    if(!username){
      // Invalid err
      return res.status(422).send({errors: [{title: ' User error', detail: 'Please fill username'}]})
    }
    if(!email){
      // Invalid err
      return res.status(422).send({errors: [{title: ' User error', detail: 'Please fill email'}]})
    }
    if(!password){
      // Invalid err
      return res.status(422).send({errors: [{title: ' User error', detail: 'Please fill password'}]})
    }
    if(password !== confirmPassword){
      // Invalid err
      return res.status(422).send({errors: [{title: ' User error', detail: 'Please check password'}]})
    }

    // 一個目が見つかったら終了
    User.findOne({email}, function(err, foundUser) {
      if(err){
        // err message
        return res.status(422).send({errors: [{title: ' User error', detail: 'Something went wrong'}]})
      }
      if (foundUser){
        // Invalid err
        return res.status(422).send({errors: [{title: ' User error', detail: 'User already exist'}]})
      }

      const user = new User({username, email, password})
      user.save(function(err) {
        if(err) {
          return res.status(422).send({errors: [{title: 'User error', detail: 'Someting went wrong!'}]})
        }
        return res.json({"registerd": true})
      })

    })
})



  // const productId = req.params.productId;
  // Product.findById(productId, function(err, foundProduct) {
  //   if(err) {
  //     return res.status(422).send({errors: [{title: 'Product error', detail: 'Product not found!'}]})
  //   }
  //
  //   return res.json(foundProduct)
  // })

    //return res.json({username,email,password})



module.exports= router;
