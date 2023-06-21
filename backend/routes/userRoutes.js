const express = require('express')
const userControllers = require('../controllers/userControllers.js')
const router = express.Router()


router.get('/login', userControllers.getUsers)
router.post('/register', userControllers.addUsers)
router.put('/update/:id', userControllers.updateUser)
router.delete('/delete/:id', userControllers.deleteUser)


module.exports = router;