const express = require('express')
const goalControllers = require('../controllers/goalControllers.js');
const userVarification = require('../middleware/jwtmiddleware.js')
const router = express.Router()


router.get('/get',userVarification.verifyToken, goalControllers.getGoals)
router.post('/add', userVarification.verifyToken, goalControllers.addGoals)
router.put('/update/:id', goalControllers.updateGoals)
router.get('/getbyid/:id', goalControllers.getGoalsById)
router.delete('/delete/:id', goalControllers.deleteGoals)


module.exports = router;