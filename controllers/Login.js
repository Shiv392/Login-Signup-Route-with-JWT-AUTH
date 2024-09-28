const bcrypt=require('bcrypt');
const mysql=require('../model/db.js');

const Login=(req,res)=>{
const {email,password}=req.body;
if(!email || !password){
    return res.status(400).json({
        success:false,
        message:'Enter login credentials'
    })
}
mysql.query(`select * from user where email=?`,[email],(err,user)=>{
    if(err){
        return res.status(502).json({
            success:false,
            message:err
        })
    }
    else{
        if(user.length<=0){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        else{
            const userpassword=user[0].password;
            bcrypt.compare(password,userpassword,(hasherr,compare)=>{
                if(hasherr){
                    return res.status(502).json({
                        success:false,
                        message:hasherr
                    })
                }
                else{
                    if(compare){
                        return res.status(200).json({
                            success:true,
                            message:'Login Successfull'
                        })
                    }
                    else{
                        return res.status(404).json({
                            success:false,
                            message:'Invalid password'
                        })
                    }
                }
            })
        }
    }
})
}

module.exports=Login