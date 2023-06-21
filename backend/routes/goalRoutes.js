const express = require('express')
const goalControllers = require('../controllers/goalControllers.js')
const router = express.Router()


router.get('/get', goalControllers.getGoals)
router.post('/add', goalControllers.addGoals)
router.put('/update/:id', goalControllers.updateGoals)
router.get('/getbyid/:id', goalControllers.getGoalsById)
router.delete('/delete/:id', goalControllers.deleteGoals)


module.exports = router;