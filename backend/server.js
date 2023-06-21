
const express = require('express');
const dotenv = require('dotenv').config();
const goalRoutes = require('./routes/goalRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const {connectDB} = require('./config/connectDB.js')
const {errorHandler} = require('../backend/middleware/errorMiddleware.js')
const port = process.env.PORT  || 4000;

connectDB();

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use('/api/goals/', goalRoutes)
app.use('/api/users/', userRoutes)

app.use(errorHandler)


app.listen(port, ()=> console.log(`Server is running on port ${port}`))

