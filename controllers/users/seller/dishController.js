const Dish = require("../../../models/users/seller/Dish");
const Restaurant = require("../../../models/users/seller/Restaurant");
const User = require("../../../models/users/User");
const Seller = require("../../../models/users/seller/Seller");

exports.available = async(req,res)=>{
    try {
        const idDish = req.params.idDish;

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
            res.status(403).json({code:20031,message:"Vous n'etes pas un vendeur"})
        }else if(seller != null){

            const dish = await Dish.findOne(
                {  
                    where: {id: idDish},
                    include: [
                        {
                            model: Restaurant,
                            where: {idSeller:seller.id}
                        }
                    ]
                }
            );

            if(dish == null){
                res.status(404).json({code:20031.5,message:"Plat introuvable"});
            }else{
               
                await Dish.update(
                    {isAvailable: !dish.isAvailable},
                    {where: {id: idDish}}
                );
                res.status(404).json({code:20031.5,callBack:"disponibilité changé avec success"});
            }
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20030,message:"serveur erreur"});
    }
}

exports.create = async(req,res)=>{
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
                    idResto: restaurant.id,
                  });
                res.status(200).json({code:20046,message:dish});

            }

        }

        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20040,message:"serveur erreur"});
    }
}

exports.update = async(req,res)=>{
    try {
        const idDish = req.params.idDish;

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

exports.delete = async(req,res)=>{
    try {
        const idDish = req.params.idDish;

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

                    // Suppression du plat
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

exports.get = async(req,res)=>{
    try {
        const idDish = req.params.idDish;

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
                    where:{id:idDish},
                });
                if(dish == null){
                    res.status(404).json({code:20061.6,message:"Plat introuvable"});
                }else{
                    res.status(200).json({code:20062,message:dish});
                }
            
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20060,message:"serveur erreur"});
    }
}

exports.getAll = async(req,res)=>{
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
                if(dishes == null || dishes.length == 0){
                    res.status(404).json({code:20081.6,message:"Aucun plat disponible"});
                }else{
                    res.status(200).json({code:20082,message:dishes});
                }
            
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20080,message:"serveur erreur"});
    }
}