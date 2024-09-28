const bcrypt=require('bcrypt');
const mysql=require('../model/db.js');
const jwt=require('jsonwebtoken');

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
                        const token=jwt.sign(
                            {
                                userid:user[0].userid,
                                email:user[0].email
                            },
                            process.env.JWTTOKEN,
                            {expiresIn:'24hr'}
                        );
                        console.log('jwt token---------->')
                        return res.status(200).json({
                            success:true,
                            message:'Login Successfull',
                            data:{
                                email:user[0].email,
                                name:user[0].name,
                                token:token
                            }
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