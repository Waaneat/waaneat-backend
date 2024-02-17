const User = require("../../../models/User");
const Seller = require("../../../models/Seller");
const Dish = require("../../../models/users/seller/Dish");
const Restaurant = require("../../../models/Restaurant");


exports.createPlat = async(req,res)=>{
    try {
        const {dishName,dishPrice,dishDesc,dishImg} = req.body;
        
        const seller = await Seller.findOne(
            {
                include:[
                    {
                        model: User,
                        where: {id: req.cookies.userId},
                        
                    }
                ] 
            }
        );

        if(seller == null || seller.user.userType != "seller"){
            res.status(403).json({code:20041,message:"vous n’etes pas un vendeur"});
        }else if(seller != null){
            const restaurant = await Restaurant.findOne({
                where:{idSeller:seller.id}
            });
            
            if(restaurant == null){
                res.status(404).json({code:20041.5,message:"Restaurant introuvable"})
            }else{
                const dish = await Dish.create({
                    dishName: dishName,
                    dishPrice: dishPrice,
                    dishDesc: dishDesc,
                    dishImg: dishImg,
                    idResto: restaurant.id
                });
                res.status(200).json({code:20046,dish:dish});
            }

        }

        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20040,message:"serveur erreur"});
    }
}
exports.updatePlat = async(req,res)=>{
    try {
        const idDish = req.params.id;

        const {dishName,dishPrice,dishDesc,dishImg} = req.body;

        const seller = await Seller.findOne(
            {
                include:[
                    {
                        model: User,
                        where: {id: req.cookies.userId},
                        
                    }
                ] 
            }
        );

        if(seller == null || seller.user.userType != "seller"){
            res.status(403).json({code:20051,message:"Vous n'etes pas un vendeur"});
        }else if(seller != null){
            const restaurant = await Restaurant.findOne(
                {where: {idSeller: seller.id}}
            );

            if(restaurant == null){
                res.status(404).json({code:20051.5,message:"Restaurant introuvable"})
            }else{
                const dish = await Dish.findOne({
                    where:{id:idDish}
                });
                if(dish == null){
                    res.status(404).json({code:20051.6,message:"Plat introuvable"});
                }else{
                    await Dish.update({
                        dishName: dishName,
                        dishPrice: dishPrice,
                        dishDesc: dishDesc,
                        dishImg: dishImg,
                    },
                    {where: {id: idDish}}
                    );
                    res.status(200).json({code:20056,message:"plat modifié avec success"});
                }
            
            }
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20050,message:"serveur erreur"});
    }
}

exports.deletePlat = async(req,res)=>{
    try {
        const idDish = req.params.id;

        const seller = await Seller.findOne(
            {
                include:[
                    {
                        model: User,
                        where: {id: req.cookies.userId},
                        
                    }
                ] 
            }
        );

        if(seller == null || seller.user.userType != "seller"){
            res.status(403).json({code:20071,message:"Vous n'etes pas un vendeur"});
        }else if(seller != null){
            const restaurant = await Restaurant.findOne(
                {where: {idSeller: seller.id}}
            );

            if(restaurant == null){
                res.status(404).json({code:20071.5,message:"Restaurant introuvable"})
            }else{
                const dish = await Dish.findOne({
                    where:{id:idDish}
                });
                if(dish == null){
                    res.status(404).json({code:20071.6,message:"Plat introuvable"});
                }else{
                    await Dish.destroy(
                        {where: {id: idDish}}
                    );
                    res.status(200).json({code:20072,message:"plat supprimé avec succes"});
                }
            
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20070,message:"serveur erreur"});
    }
}
exports.getPlat = async(req,res)=>{
    try {
        const idDish = req.params.id;

        const seller = await Seller.findOne(
            {
                include:[
                    {
                        model: User,
                        where: {id: req.cookies.userId},
                    }
                ] 
            }
        );

        if(seller == null || seller.user.userType != "seller"){
            res.status(403).json({code:20061,message:"Vous n'etes pas un vendeur"});
        }else if(seller != null){
            const restaurant = await Restaurant.findOne(
                {where: {idSeller: seller.id}}
            );

            if(restaurant == null){
                res.status(404).json({code:20061.5,message:"Restaurant introuvable"})
            }else{
                const dish = await Dish.findOne({
                    where:{id:idDish}
                });
                if(dish == null){
                    res.status(404).json({code:20061.6,message:"Plat introuvable"});
                }else{
                    res.status(200).json({code:20062,dish:dish});
                }
            
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20060,message:"serveur erreur"});
    }
}

exports.getAllPlat = async(req,res)=>{
    try {
        const seller = await Seller.findOne(
            {
                include:[
                    {
                        model: User,
                        where: {id: req.cookies.userId},
                    }
                ] 
            }
        );

        if(seller == null || seller.user.userType != "seller"){
            res.status(403).json({code:20081,message:"Vous n'etes pas un vendeur"});
        }else if(seller != null){
            const restaurant = await Restaurant.findOne(
                {where: {idSeller: seller.id}}
            );

            if(restaurant == null){
                res.status(404).json({code:20081.5,message:"Restaurant introuvable"})
            }else{
                const dishes = await Dish.findAll({
                    where:{idResto:restaurant.id}
                });
                if(dishes == null){
                    res.status(404).json({code:20081.6,message:"Aucun plat disponible"});
                }else{
                    res.status(200).json({code:20082,dishes:dishes});
                }
            
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20080,message:"serveur erreur"});
    }
}

// getAllPackaging()