const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const Auth=(req,res,next)=>{
    console.log('req--------->',req.headers.authorization);
    const authheader=req.headers.authorization;
    if (!authheader) {
        return res.status(401).json({
            success:false,
            message:'You are not authenticate'
        })
    }
    else{
        const token=req.headers.authorization;
        console.log('token-------->',token)
        jwt.verify(token,process.env.JWTTOKEN,(err,match)=>{
            if(err){
                return res.status(404).json({
                    success:false,
                    message:'Invalid token',
                    data:err
                })
            }
            req.user=match;
            next();
        })
    }
}

module.exports=Auth