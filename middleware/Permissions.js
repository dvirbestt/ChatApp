const User = require("../modules/User.js")
const jwt = require("jsonwebtoken")

const Permissions = (min) => {
    const roles =  ["Guest","User","Admin"];

    return async (req,res,next) => {

        const data = jwt.decode(req.headers.authorization.substring(7) || req.headers.Authorization.substring(7))
        const existedUser = await User.findOne({username : data.username}).exec()
        

        if(existedUser !== null && roles.indexOf(existedUser.role) >= roles.indexOf(min)){
            next();
            return
        }

        res.status(401).json({message : "Unauthorized To Commit Action"});
        


    }   
}


module.exports = Permissions;