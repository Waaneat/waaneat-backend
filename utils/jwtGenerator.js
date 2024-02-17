const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (res,userId)=>{
    const token = jwt.sign({userId},process.env.jwtSecret,{
        expiresIn: '1hr'
    });

    res.cookie('jwt',token,{
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // Durée de vie d'1 heure en millisecondes
        secure: true
    });
    res.cookie('userId', userId, {
        httpOnly: false, // Vous pouvez le définir en true si nécessaire
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // Durée de vie d'1 heure en millisecondes
        secure: true // Marquer comme sécurisé, doit être utilisé sur HTTPS
    });
    return token;
}

module.exports = jwtGenerator;