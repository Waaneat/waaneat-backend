const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

module.exports = async (req,res,next)=>{
    const jwtToken = req.cookies.jwt;

    if(jwtToken){
        try {
            const decoded = await jwt.verify(jwtToken,process.env.jwtSecret);
            let idUser = decoded.userId;
            req.user = await User.findOne({
                where: {
                    id: idUser
                }
            })
            
            console.log("voici mon token : "+jwtToken+" "+decoded.userId+" "+req.user.name);
            next();
        } catch (error) {
            res.status(401).json("erreur not autorise");
        }
    }else{
        res.status(401).json({code:50000,message:"Not authorized, no token"});
    }
}