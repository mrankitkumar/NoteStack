const express = require('express');

const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypts=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET='ANKITKUMARANKUSHARYAN';


//rout 1->create a user using Post "/api/auth/".doesnot require Auth
router.post('/createuser',
      [
            body('name', 'Enter a valid name').isLength({ min: 3 }),
            body('email', 'Enter a valid email').isEmail(),
            body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),

      ], async (req,res)=>
{
      let success="fasle";
      const errors = validationResult(req);
      if (!errors.isEmpty()) 
      {
            success="fasle";
            return res.status(400).json({ success,errors: errors.array() });
      }
      //check whether already exits or not
      try{
      let user =await  User.findOne({ success,email: req.body.email });
      //console.log(user);
      if (user) {
            //if user exit
            success="fasle";
            return res.status(400).json({success, error: "sorry user already exits" });
      }
      //create a new user
      //await means wait take value of this and then go further
      const salt=await bcrypts.genSalt(10);
      // await because it return promice
      secPass=await bcrypts.hash(req.body.password,salt);
      user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
      })
      const data={
            user:{
                  id:user.id
            }
      }
      success="true";
      const authtoken=jwt.sign(data,JWT_SECRET);
      console.log(authtoken);
    res.json({success,authtoken});
}
//catch error
catch(error)
{
      console.error(error.message);
      res.status(500).json({ error:  " internal server  occur" });
}

});
//rout 2->
//Auth a user using post login
router.post('/login',
      [
            
            body('email', 'Enter a valid email').isEmail(),
            body('password', 'Cant not be blanck ').exists(),

      ], async (req,res)=>

      
{
      let success="fasle";
      const errors = validationResult(req);
      if (!errors.isEmpty()) 
      {
            return res.status(400).json({ errors: errors.array() });
      }
      const {email,password}=req.body;
      try{
            let user=await User.findOne({email});
            if(!user)
            {
                  success="false";
                  return res.status(400).json({success, error: "please try to login with correct credentials" });
            }
            const passwordcompare=await bcrypts.compare(password,user.password);
            if(!passwordcompare)
            {
                  success="false";
                  return res.status(400).json({success, error:"please try to login with correct credentials" });
            }
            const data={
                  user:{
                        id:user.id
                  }
            }
            const authtoken=jwt.sign(data,JWT_SECRET);
            console.log(authtoken);
            success="true";
          res.json({success,authtoken});
      }
      catch(error)
      {
            console.error(error.message);
            res.status(500).json({ error: " internal server  occur" });
      }

});
//Route 3:Get loggedin User Details Using:POST "/api/auth/getuser".Login required
//login required
router.post('/getuser',fetchuser,async(req,res)=>{

     try
     {
      userId=req.user.id;
      const user=await User.findById(userId).select("-password");
      res.send(user);
     }
     catch(error){
       console.error(error.message);
       res.status(500).send("Internal server Error");
     }

})

module.exports = router;