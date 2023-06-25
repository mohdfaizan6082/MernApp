const express = require('express')
const userControllers = require('../controllers/userControllers.js')
const userVarification = require('../middleware/jwtmiddleware.js')
const router = express.Router()


router.get('/login', userControllers.loginUser)
router.get('/getme',userVarification.verifyToken, userControllers.getUser)
router.post('/register', userControllers.registerUser)
router.put('/update/:id', userControllers.updateUser)
router.delete('/delete/:id', userControllers.deleteUser)


module.exports = router;