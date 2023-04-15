var jwt=require('jsonwebtoken');
const JWT_SECRET='ANKITKUMARANKUSHARYAN';
const fetchuser=(req,res,next)=>{
    //Get the user from the jwt tocken and add id to req object
    //send tocken by header by name auth-tocken
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try{
        //take from tocken JWT_SECRET
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
              next();
    }
    catch(error)
    {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    
}

module.exports=fetchuser;