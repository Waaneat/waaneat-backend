const User = require("../../../models/users/User");
const Customer = require("../../../models/users/customer/Customer");
const Favorite = require("../../../models/users/customer/Favorite");
const Order = require("../../../models/users/customer/Order");
const Dish = require("../../../models/users/seller/Dish");
const Restaurant = require("../../../models/users/seller/Restaurant");
const Seller = require("../../../models/users/seller/Seller");

exports.getRestaurant = async (req, res) => {
    try {
        
      const idRestaurant = req.params.idResto;

      const customer = await Customer.findOne(
            {
                include:[
                    {
                        model: User,
                        where: {id: req.cookies.userId},
                    }
                ]
            }
        );

        if(customer == null || customer.user.userType != "customer"){
            res.status(403).json({code:10060.5,message:"Vous n'etes pas un client"});
        }else if(customer != null){

            const restaurant = await Restaurant.findOne({
                 where:{id:idRestaurant}
            });
            if(restaurant == null || restaurant.length == 0){
                res.status(404).json({code:10060.6,message:"Restaurant introuvable"});
            }else{
                res.status(200).json({code:10061,restaurant:restaurant});
            }
            
        }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({code:10060,message:"Erreur serveur"});
    }
};
exports.getAllDishesByIdResto = async (req, res) => {
    try {
      const idResto = req.params.idResto;

      const customer = await Customer.findOne(
        {
            include:[
                {
                    model: User,
                    where: {id: req.cookies.userId},
                }
            ] 
        }
    );

    if(customer == null || customer.user.userType != "customer"){
        res.status(403).json({code:10070.5,message:"Vous n'etes pas un client"});
    }else if(customer != null){
        const restaurant = await Restaurant.findOne(
            {where: {id: idResto}}
        );

        if(restaurant == null){
            res.status(404).json({code:10070.6,message:"Restaurant introuvable"})
        }else{
          const dishes = await Dish.findAll(
            {where: {idResto: idResto}}
          );

          if(dishes == null || dishes.length == 0){
            res.status(404).json({code:10070.7,message:"Aucun plat disponible"});
          }else{
            res.status(200).json({code:10071,dishes:dishes});
          }
          
        }
    }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({code:10070,message:"Erreur serveur"});
    }
};

exports.getRestoDish = async (req, res) => {
    try {
      const idResto = req.params.idResto;
      const idDish = req.params.idDish;

      const customer = await Customer.findOne(
        {
            include:[
                {
                    model: User,
                    where: {id: req.cookies.userId},
                }
            ] 
        }
    );

    if(customer == null || customer.user.userType != "customer"){
        res.status(403).json({code:10080.5,message:"Vous n'etes pas un client"});
    }else if(customer != null){
        const restaurant = await Restaurant.findOne(
            {where: {id: idResto}}
        );

        if(restaurant == null){
            res.status(404).json({code:10080.6,message:"Restaurant introuvable"})
        }else{
          const dish = await Dish.findOne(
            {
              where: {
                idResto: idResto,
                id: idDish
              }
            }
        );

          if(dish == null){
            res.status(404).json({code:10080.7,message:"plat introuvable"});
          }else{
            res.status(200).json({code:10081,dish:dish});
          }
          
        }
    }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({code:10080,message:"Erreur serveur"});
    }
};


exports.getAllRestoByAdress = async (req, res) => {
    try {

    const {adress} = req.body;
    const customer = await Customer.findOne(
        {
            include:[
                {
                    model: User,
                    where: {id: req.cookies.userId},
                }
            ] 
        }
    );

    if(customer == null || customer.user.userType != "customer"){
        res.status(403).json({code:10090.5,message:"Vous n'etes pas un client"});
    }else if(customer != null){
        const restaurants = await Restaurant.findAll({
            include: [
                {
                    model: Seller,
                    include: [
                        {
                            model: User,
                            where: {
                                adress: adress
                            }
                        }
                    ]
                }
            ]
        });

        if(restaurants == null || restaurants.length==0){
            res.status(404).json({code:10090.6,message:"Aucun restaurant disponible a cet adresse"})
        }else{
            res.status(200).json({code:10091,restaurants:restaurants});
        }
    }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({code:10090,message:"Erreur serveur"});
    }
};


