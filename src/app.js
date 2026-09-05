const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cookieParser());

// require the necessary files
const authRouter = require('./routers/auth.router')


// APIs
app.use('/api/auth/',authRouter);



module.exports = app;