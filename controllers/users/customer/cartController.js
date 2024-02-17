// const User = require("../../../models/users/User");
// const Cart = require("../../../models/users/customer/Cart");
// const Customer = require("../../../models/users/customer/Customer");
// const Dish = require("../../../models/users/seller/Dish");
// const Packaging = require("../../../models/users/seller/Packaging");
// const Restaurant = require("../../../models/users/seller/Restaurant");


// exports.create = async(req,res)=>{
//     try {
//         const idDish = req.params.idDish;
//         const {quantity,packagingId} = req.body;
        
//         if (quantity == null || quantity === "" || !isValidNumeric(quantity)) {
//             res.status(400).json({code:20002,message:"le prix du packaging vide ou invalide"});
//         } else if(packagingId == null || packagingId === "" || !isValidNumeric(packagingId)){
//             res.status(400).json({code:20002,message:"Choix du packaging vide ou invalide"});
//         }else{
//             const customer = await Customer.findOne(
//                 {
//                     include:[
//                         {
//                             model: User,
//                             where: {id: req.cookies.userId},
                            
//                         }
//                     ] 
//                 }
//             );
    
//             if(customer == null || customer.user.userType != "customer"){
//                 res.status(403).json({code:10021,message:"Vous n'etes pas un client"});
//             }else if(customer != null){
//                 const dish = await Dish.findOne({
//                     where:{id:idDish}
//                 });
    
//                 if(dish == null){
//                     res.status(404).json({code:10021.5,message:"Plat introuvable"})
//                 }else{
//                     const restaurant = await Restaurant.findOne({
//                         where:{id:dish.idResto}
//                     });
                    
//                     if(restaurant == null){
//                         res.status(404).json({code:10021.6,message:"Restaurant introuvable"})
//                     }else{
//                         await Cart.create(
//                             {
//                                 quantity: quantity,
//                                 status: "not ordered",
//                                 idCustomer: customer.id,
//                                 idResto: restaurant.id,
//                                 idPackaging: packagingId,
//                                 idDish: dish.id
//                             }
//                         );
//                         res.status(200).json({code:10021.6,message:"panier cree avec success"})
//                     }
//                 }
//             }
//         }
        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:10020,message:"serveur erreur"});
//     }
// }

// exports.update = async(req,res)=>{
//     try {
//         const idCart = req.params.idCart;
//         const {quantity, packagingId} = req.body;

//         if (quantity == null || quantity === "" || !isValidNumeric(quantity)) {
//             res.status(400).json({code:10022,message:"La quantité vide ou invalide"});
//         } else if (packagingId == null || packagingId === "" || !isValidNumeric(packagingId)) {
//             res.status(400).json({code:10022.5,message:"Choix du packaging vide ou invalide"});
//         } else {
//             const customer = await Customer.findOne({
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
//                     }
//                 ] 
//             });

//             if(customer == null || customer.user.userType != "customer"){
//                 res.status(403).json({code:10023,message:"Vous n'etes pas un client"});
//             } else if(customer != null){
//                 const cart = await Cart.findOne({
//                     where: {
//                         id: idCart,
//                         idCustomer: customer.id,
//                         status: "not ordered"
//                     },
//                     include: [
//                         {
//                             model: Dish,
//                             include: [
//                                 {
//                                     model: Restaurant
//                                 },
//                             ],
//                         },
//                     ],
//                 });

//                 if(cart == null){
//                     res.status(404).json({code:10023.5,message:"Panier introuvable"})
//                 } else {
//                     const restaurant = await Restaurant.findOne({
//                         where: {id: cart.dish.restaurant.id},
//                     });

//                     if(restaurant == null){
//                         res.status(404).json({code:10023.6,message:"Restaurant introuvable"})
//                     } else {
//                         // Vérification du packaging
//                         const validPackaging = await Packaging.findOne({
//                             where: {
//                                 id: packagingId,
//                                 idDish: cart.dish.id,
//                             },
//                         });

//                         if(validPackaging == null){
//                             res.status(404).json({code:10023.7,message:"Packaging introuvable pour ce plat"})
//                         } else {
//                             await Cart.update(
//                                 {
//                                     quantity: quantity,
//                                     idPackaging: packagingId,
//                                 },
//                                 {
//                                     where: {
//                                         id: idCart,
//                                         idCustomer: customer.id,
//                                         status: "not ordered",
//                                     },
//                                 }
//                             );

//                             res.status(200).json({code:10028,message:"Panier modifié avec succès"});
//                         }
//                     }
//                 }
//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:10027,message:"Serveur erreur"});
//     }
// }

// exports.delete = async(req,res)=>{
//     try {
//         const idCart = req.params.idCart;

//         const customer = await Customer.findOne({
//             include:[
//                 {
//                     model: User,
//                     where: {id: req.cookies.userId},
//                 }
//             ] 
//         });

//         if(customer == null || customer.user.userType != "customer"){
//             res.status(403).json({code:10033,message:"Vous n'etes pas un client"});
//         } else if(customer != null){
//             const cart = await Cart.findOne({
//                 where: {
//                     id: idCart,
//                     idCustomer: customer.id,
//                     status: "not ordered"
//                 },
//             });

//             if(cart == null){
//                 res.status(404).json({code:10033.5,message:"Panier introuvable"});
//             } else {
//                 await Cart.destroy({
//                     where: {
//                         id: idCart,
//                         idCustomer: customer.id,
//                         status: "not ordered"
//                     },
//                 });

//                 res.status(200).json({code:10038,message:"Panier supprimé avec succès"});
//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:10037,message:"Serveur erreur"});
//     }
// }

// exports.getAll = async (req, res) => {
//     try {
//         const customer = await Customer.findOne({
//             include: [
//                 {
//                     model: User,
//                     where: { id: req.cookies.userId },
//                 },
//             ],
//         });

//         if (customer == null || customer.user.userType != "customer") {
//             res.status(403).json({ code: 10043, message: "Vous n'êtes pas un client" });
//         } else if (customer != null) {
//             const carts = await Cart.findAll({
//                 where: {
//                     idCustomer: customer.id,
//                 },
//                 include: [
//                     {
//                         model: Dish
//                     },
//                     {
//                         model: Packaging
//                     },
//                 ],
//             });

//             res.status(200).json({ code: 10044, carts: carts });
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ code: 10042, message: "Serveur erreur" });
//     }
// };

// exports.getOne = async (req, res) => {
//     try {
//         const idCart = req.params.idCart;
//         const customer = await Customer.findOne({
//             include: [
//                 {
//                     model: User,
//                     where: { id: req.cookies.userId },
//                 },
//             ],
//         });

//         if (customer == null || customer.user.userType != "customer") {
//             res.status(403).json({ code: 10051, message: "Vous n'êtes pas un client" });
//         } else if (customer != null) {
//             const cart = await Cart.findOne({
//                 where: {
//                     id: idCart,
//                     idCustomer: customer.id,
//                 },
//                 include: [
//                     {
//                         model: Dish
//                     },
//                     {
//                         model: Packaging
//                     },
//                 ],
//             });

//             if (cart == null) {
//                 res.status(404).json({ code: 10051.5, message: "Panier introuvable" });
//             } else {
//                 res.status(200).json({ code: 10052, cart: cart });
//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ code: 10050, message: "Serveur erreur" });
//     }
// };