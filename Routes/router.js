const express = require('express')
const router = express.Router()

const Controller = require('../Controllers/controller')
const novelRouter = require('./novelRoutes')
const userController = require('../controllers/userController')

router.use('/novels', novelRouter)
router.get('/profile', Controller.profile)
router.get('/register', userController.registerForm)
router.post('/register', userController.postRegister)
router.get('/login', userController.loginForm)
router.post('/login', userController.cekLogin)
router.use(function (req, res, next) {
    if (!req.session.userId) {
        const error = 'Please login first'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

router.get('./logout', userController.logOut)

module.exports = router