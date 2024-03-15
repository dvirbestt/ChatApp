const router = require("express").Router();
const Permissions = require("../middleware/Permissions.js");
const jwt = require("jsonwebtoken")
const User = require("../modules/User.js");
const Chat = require("../modules/Chat.js");


router.post("/searchUser",Permissions("User"), async (req,res) => {

    const userToSearch = await User.find({username: {$regex: '^' + req.body.username, $options: 'i'}}).select("_id username ").exec();
    
    if (userToSearch.length > 0) {
        
        res.status(200).json({users: userToSearch});
        return
    }


    res.status(400).json({message : "User Do Not Exist"});
})

router.post("/searchChat",Permissions("User"), async (req,res)=> {

    const userData = jwt.decode(req.headers.authorization.substring(7) || req.headers.Authorization.substring(7))

    const existingChat = await Chat.findOne({participentOne: userData.username, participentTwo: req.body.username});

    if(!existingChat){
        Chat.create(new Chat({participentOne: userData.username,participentTwo: req.body.username})).then((chat)=> {
            res.status(200).json({message: "Chat Started",chat : chat});
            
        })
        return
    }

    res.status(200).json({chat: existingChat});
    return
})

module.exports = router;