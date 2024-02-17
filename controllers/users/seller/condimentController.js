// const { ObjectId }= require("bson");
// const jwtGenerator = require("../utils/jwtGenerator");
// const bcrypt = require("bcrypt");
// const User = require("../models/User");
// const Boutique = require("../models/Boutique");
// const Livraison = require("../models/Livrairie");
// const Plat = require("../models/Plat");
// const Ingredient = require("../models/Ingredient");
// const Vendeur = require("../models/Vendeur");


// exports.createIngredient = async(req,res)=>{
//     try {
//         const {nomIngredient,prixIngredient,imgIngredient} = req.body;
        
//         const vendor = await Vendeur.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
                        
//                     }
//                 ] 
//             }
//         );

//         if(vendor == null || vendor.User.userType != "vendeur"){
//             res.status(403).json({code:20091,message:"Vous n'etes pas un vendeur"});
//         }else if(vendor != null){
//             const boutique = await Boutique.findOne({
//                 where:{idVendeur:vendor.id}
//             });
            
//             if(boutique == null){
//                 res.status(404).json({code:20091.5,message:"Boutique introuvable"})
//             }else{
//                 const ingredient = await Ingredient.create({
//                     nomIngredient: nomIngredient,
//                     prixIngredient: prixIngredient,
//                     imgIngredient: imgIngredient,
//                     idBoutique: boutique.id
//                 });
//                 res.status(200).json({code:20095,ingredient:ingredient});
//             }

//         }

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20090,message:"serveur erreur"});
//     }
// }
// exports.updateIngredient = async(req,res)=>{
//     try {
//         const idIngredient = req.params.id;

//         const {nomIngredient,prixIngredient,imgIngredient} = req.body;

//         const vendor = await Vendeur.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
                        
//                     }
//                 ] 
//             }
//         );

//         if(vendor == null || vendor.User.userType != "vendeur"){
//             res.status(403).json({code:20101,message:"Vous n'etes pas un vendeur"});
//         }else if(vendor != null){
//             const boutique = await Boutique.findOne(
//                 {where: {idVendeur: vendor.id}}
//             );

//             if(boutique == null){
//                 res.status(404).json({code:20101.5,message:"Boutique introuvable"})
//             }else{
//                 const ingredient = await Ingredient.findOne({
//                     where:{id:idIngredient}
//                 });
//                 if(ingredient == null){
//                     res.status(404).json({code:20101.6,message:"Ingredient introuvable"});
//                 }else{
//                     await Ingredient.update({
//                         nomIngredient: nomIngredient,
//                         prixIngredient: prixIngredient,
//                         imgIngredient: imgIngredient,
//                     },
//                     {where: {id: idIngredient}}
//                     );
//                     res.status(200).json({code:20105,message:"Ingredient modifié avec success"});
//                 }
//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20100,message:"serveur erreur"});
//     }
// }

// exports.deleteIngredient = async(req,res)=>{
//     try {
//         const idIngredient = req.params.id;

//         const vendor = await Vendeur.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
                        
//                     }
//                 ] 
//             }
//         );

//         if(vendor == null || vendor.User.userType != "vendeur"){
//             res.status(403).json({code:20121,message:"Vous n'etes pas un vendeur"});
//         }else if(vendor != null){
//             const boutique = await Boutique.findOne(
//                 {where: {idVendeur: vendor.id}}
//             );

//             if(boutique == null){
//                 res.status(404).json({code:20121.5})
//             }else{
//                 const ingredient = await Ingredient.findOne({
//                     where:{id:idIngredient}
//                 });
//                 if(ingredient == null){
//                     res.status(404).json({code:20121.6,message:"Ingredient introuvable"});
//                 }else{
//                     await Ingredient.destroy(
//                         {where: {id: idIngredient}}
//                     );
//                     res.status(200).json({code:20122,message:"Ingredient supprimé avec success"});
//                 }
            
//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20120,message:"serveur erreur"});
//     }
// }
// exports.getIngredient = async(req,res)=>{
//     try {
//         const idIngredient = req.params.id;

//         const vendor = await Vendeur.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
//                     }
//                 ] 
//             }
//         );

//         if(vendor == null || vendor.User.userType != "vendeur"){
//             res.status(403).json({code:20111,message:"Vous n'etes pas un vendeur"});
//         }else if(vendor != null){
//             const boutique = await Boutique.findOne(
//                 {where: {idVendeur: vendor.id}}
//             );

//             if(boutique == null){
//                 res.status(404).json({code:20111.5,message:"Boutique introuvable"})
//             }else{
//                 const ingredient = await Ingredient.findOne({
//                     where:{id:idIngredient}
//                 });
//                 if(ingredient == null){
//                     res.status(404).json({code:20111.6,message:"Plat introuvable"});
//                 }else{
//                     res.status(200).json({code:20112,ingredient:ingredient});
//                 }
            
//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20110,message:"serveur erreur"});
//     }
// }

// exports.getAllIngredient = async(req,res)=>{
//     try {
//         const vendor = await Vendeur.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
//                     }
//                 ] 
//             }
//         );

//         if(vendor == null || vendor.User.userType != "vendeur"){
//             res.status(403).json({code:20121,message:"Vous n'etes pas un vendeur"});
//         }else if(vendor != null){
//             const boutique = await Boutique.findOne(
//                 {where: {idVendeur: vendor.id}}
//             );

//             if(boutique == null){
//                 res.status(404).json({code:20121.5,message:"Boutique introuvable"})
//             }else{
//                 const ingredients = await Ingredient.findAll({
//                     where:{idBoutique:boutique.id}
//                 });
//                 if(ingredients == null){
//                     res.status(404).json({code:20121.6,message:"Aucun ingredient disponible"});
//                 }else{
//                     res.status(200).json({code:20122,ingredients:ingredients});
//                 }
            
//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20120,message:"serveur erreur"});
//     }
// }