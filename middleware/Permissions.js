const User = require("../modules/User.js")
const jwt = require("jsonwebtoken")

const Permissions = (min) => {
    const roles = ["Guest", "User", "Admin"];

    return async (req, res, next) => {

        try {
            const data = jwt.verify(req.headers.authorization.substring(7) || req.headers.Authorization.substring(7), process.env.JWT_SECRET)
            
            if(data.exp < new Date().getTime()/1000){
                res.status(401).json({message : "JWT is expired"});
                return
            }

            const existedUser = await User.findOne({ username: data.username }).exec()

            if (existedUser !== null && roles.indexOf(existedUser.role) >= roles.indexOf(min)) {
                next();
                return
            }

            res.status(401).json({ message: "Unauthorized To Commit Action" });
        }catch(e){
            res.status(401).json({message: "JWT not valid"})
        }

        
        


    }
}


module.exports = Permissions;