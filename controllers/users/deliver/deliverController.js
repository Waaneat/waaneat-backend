const jwtGenerator = require("../../../utils/jwtGenerator");
const bcrypt = require("bcrypt");
const User = require("../../../models/User");
const { Op } = require("sequelize");
const isValidEmail = require("../../../utils/isValidEmail");
const isValidImageFormat = require("../../../utils/isValidImageFormat");
const isValidString = require("../../../utils/isValidString");
const Deliver = require("../../../models/users/deliver/Deliver");
const DeliverSpace = require("../../../models/users/deliver/DeliverSpace");

exports.create = async(req,res)=>{
    try {
        
        const { username,email,tel,password,adress,companyName,identityCard } = req.body;
       

        if (username == null || username === "" || !isValidString(username)) {
            res.status(400).json({code:20001,message:"username vide ou invalide"});
        } else if (email == null || email === "" || !isValidEmail(email)) {
            res.status(400).json({code:20002,message:"email vide ou invalide"});
        } else if (tel == null || tel === "" || !isValidString(tel)) {
            res.status(400).json({code:20002.5,message:"telephone vide ou invalide"});
        } else if (password == null || password === "" || !isValidString(password) ) {
            res.status(400).json({code:20003,message:"password vide ou invalide"});
        } else if ( password.length < 6 ) {
            res.status(400).json({code:20004,message:"password trop court"});
        } else if (adress == null || adress === "" || !isValidString(adress)) {
            res.status(400).json({code:20005,message:"adresse vide ou invalide"});
        } else if (companyName == null || companyName === "" || !isValidString(companyName)) {
            res.status(400).json({code:20006,message:"nomEntreprise vide ou invalide"});
        } else if (identityCard == null || identityCard === "" || !isValidImageFormat(identityCard)) {
            res.status(400).json({code:20007,message:"carte d’identité vide ou au mauvais format"});
        } else {
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: username },
                        { email: email }
                    ]
                }
            });
            if(user){
                res.status(403).json({code:20008,message:"Vendeur existe deja"});
            }           
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password,salt);
    
            const newUser = await User.create({ 
                username: username,
                email:email,
                tel: tel,
                password: bcryptPassword,
                adress: adress,
                userType: "deliver"
            });
    
            const newDeliver = await Deliver.create({
                companyName:companyName,
                identityCard:identityCard,
                idUser:newUser.id
            })
            
            jwtGenerator(res,newUser.id);
    
            await DeliverSpace.create({
                dSName:newDeliver.companyName,
                idDeliver:newDeliver.id
            })
            
            const deliver = await Deliver.findOne({
                where: { idUser: newUser.id }, // Assure-toi de fournir une condition appropriée ici
                include: User
            });
            
            
            if(deliver != null){
               
                res.status(200).json({code:20009,deliver:deliver});
            }else{
                res.status(200).json({code:20008.5,message:"livreur introuvable"});
            }
        }
        
    } catch (error) {
        console.error(error);
        res.status(200).json({code:20000,message:"serveur erreur"});
    }
}

exports.update = async(req,res)=>{
    try {
        const { username,email,tel,password,adress,companyName } = req.body;

        const deliver = await Deliver.findOne(
            {
                include:[
                    {
                        model: User,
                        where: {id: req.cookies.userId},
                        
                    }
                ] 
            }
        );

        if(deliver == null || deliver.user.userType != "deliver"){
            res.status(403).json({code:20051,message:"Vous n'etes pas un livreur"});
        }else if(deliver != null){
            
            if (username == null || username === "" || !isValidString(username)) {
                res.status(400).json({code:20001,message:"username vide ou invalide"});
            } else if (email == null || email === "" || !isValidEmail(email)) {
                res.status(400).json({code:20002,message:"email vide ou invalide"});
            } else if (tel == null || tel === "" || !isValidString(tel)) {
                res.status(400).json({code:20002.5,message:"telephone vide ou invalide"});
            } else if (password == null || password === "" || !isValidString(password) ) {
                res.status(400).json({code:20003,message:"password vide ou invalide"});
            } else if ( password.length < 6 ) {
                res.status(400).json({code:20004,message:"password trop court"});
            } else if (adress == null || adress === "" || !isValidString(adress)) {
                res.status(400).json({code:20005,message:"adresse vide ou invalide"});
            } else if (companyName == null || companyName === "" || !isValidString(companyName)) {
                res.status(400).json({code:20006,message:"nomEntreprise vide ou invalide"});
            } else {
                const saltRound = 10;
                const salt = await bcrypt.genSalt(saltRound);
                const bcryptPassword = await bcrypt.hash(password,salt);
    
                await User.update({ 
                        username: username,
                        email:email,
                        tel: tel,
                        password: bcryptPassword,
                        adress: adress
                    },
                    {
                        where:{id: deliver.user.id}
                    }
                );
                await Deliver.update({
                        companyName:companyName,
                    },
                    {
                        where:{id:deliver.id}
                    }
                )

                res.status(200).json({code:20056,message:"livreur modifié avec success"});
            }

        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20050,message:"serveur erreur"});
    }
}

exports.delete = async(req,res)=>{
    try {

        const deliver = await Deliver.findOne(
            {
                include:[
                    {
                        model: User,
                        where: {id: req.cookies.userId},
                        
                    }
                ] 
            }
        );

        if(deliver == null || deliver.user.userType != "deliver"){
            res.status(403).json({code:20051,message:"Vous n'etes pas un livreur"});
        }else if(deliver != null){

            await User.delete({},
                {
                    where: {id:deliver.user.id}
                }
            );
            await Deliver.delete({},
                {
                    where: {id:deliver.id}
                }
            )
            await DeliverSpace.delete({},
                {
                    where: {idDeliver:deliver.id}
                }
            )

            res.status(200).json({code:20056,message:"livreur supprimé avec success"});

        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20050,message:"serveur erreur"});
    }
}
exports.get = async(req,res)=>{
    try {

        const deliver = await Deliver.findOne(
            {
                include:[
                    {
                        model: User,
                        where: {id: req.cookies.userId},
                    }
                ] 
            }
        );

        if(deliver == null || deliver.user.userType != "deliver"){
            res.status(403).json({code:20061,message:"Vous n'etes pas un livreur"});
        }else if(deliver != null){
            
            const oneDeliver = await Deliver.findOne({},
                {
                    where: {id: deliver.id}
                }
            )
            res.status(200).json({code:20060,oneDeliver:oneDeliver});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20060,message:"serveur erreur"});
    }
}
