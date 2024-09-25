const express = require('express');
const app=express();
const port = 8000;

app.get('/',(req,res)=>{
    return res.send(`<h1>this is home page</h1>`)
})

app.listen(port,()=>{
    console.log(`server started http://localhost:${port}`)
})