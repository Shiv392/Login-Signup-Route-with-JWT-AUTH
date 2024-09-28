const express=require('express');
const Login=require('../controllers/Login.js');
const routes=express.Router();

routes.post('/login',Login)

module.exports=routes;