const express = require('express');
const app=express();
const port = 8000;
const mysqlconnetion=require('./model/db.js');
const SignUp=require('./routes/SignUp.js');
const Login=require('./routes/Login.js')
const bodyparser=require('body-parser');
const cors=require('cors');

app.use(bodyparser.json());
app.use(cors())

mysqlconnetion.connect((err)=>{
    if(err){
        console.log('error while mysql connection------->',err);
    }
    else{
        console.log('database connection stablished')
    }
})

app.use(SignUp);
app.use(Login);

app.get('/',(req,res)=>{
    return res.send(`<h1>this is home page</h1>`)
})

app.listen(port,()=>{
    console.log(`server started http://localhost:${port}`)
})