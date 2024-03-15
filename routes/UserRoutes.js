const router = require('express').Router()
const User = require("../modules/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Permissions = require("../middleware/Permissions.js")


router.post("/signup", async (req,res)=> {

    const userExist = await User.findOne({username: req.body.user.username}).exec()
    

    if(userExist === null ){
        
        const user = new User(req.body.user);
        
        user.password = await bcrypt.hash(user.password,10);
        User.create(user).then(()=> {
            res.status(200).json({message : "User Created Successfully"})
        })

    }else{ 
        res.status(400).json({message : "Username Already Taken"})
    }    
})

router.post("/login", async (req,res)=> {

    

    const user = new User(req.body.user);
    const data = await User.findOne({username : user.username}).exec()
    
    if(data !== null && bcrypt.compare(user.password,data.password)){

        const tokenData = {username : data.username,id : data._id}
        const token = jwt.sign(tokenData, process.env.JWT_SECRET || "secret",{expiresIn : "15M"})

        res.status(200).json({message : "Logged in Successfully",jwt : token});
    }else{ 
        res.status(400).json({message: "Wrong username or password"});
    }

})


router.post("/test",Permissions("Guest"),(req,res,next)=> {
    res.status(200).json({message : "test"});
})

module.exports = router;