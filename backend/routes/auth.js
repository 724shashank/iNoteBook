const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt= require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET="Hithere";

router.post('/createuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Enter a valid Name').isLength({ min: 5 }),
    body('password', 'Password must be atleast 5 Character').isLength({ min: 5 }),
], async (req, res) => {
    let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        
        if (user) {
            return res.status(400).json({ error: 'Sorry User with the same email exits' })
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            //create user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password:secPass,
        });
        const data ={id: user.id}

        const authtoken=jwt.sign(data, JWT_SECRET);
        success=true;
         res.json({success,authtoken});

    }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Inernal Server Error');
    }

})
//Authenticate a User : POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user)
        {
            success= false;
            return res.status(400).json({error:"Please try login with correct credentials 1 "});
        } 

        
            const passwordCompare= await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                success= false;
                return res.status(400).json({success, error: "Please try login with correct credentials 2 "});
            } 
                const data ={id: user.id}
                    
                const authtoken= jwt.sign(data, JWT_SECRET);
                success=true;
                res.json({success,authtoken})
            
    
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Inernal Server Error');
    }
})

router.post('/getuser', fetchuser ,async (req,res)=>{
    try{
        userId= req.user;
        const user= await User.findById(userId).select("-password")
        res.send(user)

    }
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
module.exports = router;