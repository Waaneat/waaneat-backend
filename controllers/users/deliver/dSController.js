// const { ObjectId }= require("bson");
// const jwtGenerator = require("../utils/jwtGenerator");
// const bcrypt = require("bcrypt");
// const User = require("../models/User");
// const Livrairie = require("../models/Livrairie");
// const Commande = require("../models/Commande");
// const Livreur = require("../models/Livreur");
// const { Op } = require("sequelize");
// // const localStorage = require('localStorage');

// exports.available = async(req,res)=>{
//     try {
//         // const userId = localStorage.getItem('userId');
//         const deliver = await Livreur.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
//                     }
//                 ] 
//             }
//         );
//         if(deliver == null || deliver.User.userType != "livreur"){
//             res.status(403).json({code:30021,message:"Vous n'etes pas un livreur"});
//         }else if(deliver != null){
//             const livrairie = await Livrairie.findOne(
//                 {where: {idLivreur: deliver.id}}
//             );

//             if(livrairie == null){
//                 res.status(404).json({code:30021.5,message:"Livrairie introuvable"});
//             }else{
//                 await Livrairie.update(
//                     {estDispo: !livrairie.estDispo},
//                     {where: {idLivreur: livrairie.idLivreur}}
//                 );
    
//                 res.status(200).json({code:30022,message:"disponibilité changée"});
    
//             }
//         }

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:30020,message:"serveur erreur"});
//     }
// }

// exports.getAllDeliveries = async(req,res)=>{
//     try {
//         const livreur = await Livreur.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
//                     }
//                 ] 
//             }
//         );

//         if(livreur == null || livreur.User.userType != "livreur"){
//             res.status(403).json({code:30031,message:"Vous n'etes pas un livreur"});
//         }else if(livreur != null){
  
//             const commandes = await Commande.findAll({
//                 where:{
//                     idLivreur:livreur.id,
//                     etat: {
//                         [Op.or]: ['en attente', 'en livraison']
//                   }
//                 }
//             });
//             if(commandes.length == 0){
//                 res.status(404).json({code:30031.5,message:"Aucune livraison disponible"});
//             }else{
//                 res.status(200).json({code:30032,commandes:commandes});
//             }
            
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:30030,message:"serveur erreur"});
//     }
// }
// exports.acceptDelivery = async(req,res)=>{
//     try {
//         const idCommande = req.params.idCommande;

//         const livreur = await Livreur.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
                        
//                     }
//                 ] 
//             }
//         );

//         if(livreur == null || livreur.User.userType != "livreur"){
//             res.status(403).json({code:30041,message:"Vous n'etes pas un livreur"});
//         }else if(livreur != null){
//             const commande = await Commande.findOne(
//                 {where: {id: idCommande}}
//             );

//             if(commande == null){
//                 res.status(404).json({code:30041.5,message:"Commande introuvable"})
//             }else{
                
//                 if(commande.etat == "en attente"){
//                     await Commande.update(
//                         {etat: "en livraison"},
//                         {
//                             where: {
//                                 id: idCommande
//                             }
//                         }, 
//                     );
//                     res.status(200).json("Livraison acceptée")
//                 }else{
//                     res.status(403).json({code:30041.6,message:"etat invalide"})
//                 }
//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:30040,message:"serveur erreur"});
//     }
// }

// exports.rejectDelivery = async(req,res)=>{
//     try {
//         const idCommande = req.params.idCommande;
//         const livreur = await Livreur.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
                        
//                     }
//                 ] 
//             }
//         );

//         if(livreur == null || livreur.User.userType != "livreur"){
//             res.status(403).json({code:30051,message:"Vous n'etes pas un livreur"});
//         }else if(livreur != null){
//             const commande = await Commande.findOne(
//                 {where: {id: idCommande}}
//             );

//             if(commande == null){
//                 res.status(404).json({code:30051.5,message:"Commande introuvable"})
//             }else{
//                 if(commande.etat == "en attente"){
//                     await Commande.update(
//                         {etat: "termine",idLivreur: null},
//                         {
//                             where: {
//                                 id: idCommande
//                             }
//                         }, 
//                     );
//                     res.status(200).json({code:30052,message:"Livraison refusée"})
//                 }else{
//                     res.status(403).json({code:30052.6,message:"etat invalide"})
//                 }
//             }
//         }
        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:30050,message:"serveur erreur"});
//     }
// }
// exports.finishDelivery = async(req,res)=>{
//     try {
//         const idCommande = req.params.idCommande;

//         const livreur = await Livreur.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
                        
//                     }
//                 ] 
//             }
//         );

//         if(livreur == null || livreur.User.userType != "livreur"){
//             res.status(403).json({code:30061,message:"Vous n'etes pas un livreur"});
//         }else if(livreur != null){
//             const commande = await Commande.findOne(
//                 {where: {id: idCommande}}
//             );

//             if(commande == null){
//                 res.status(404).json({code:30061.5,message:"Commande introuvable"})
//             }else{
                
//                 await Commande.update(
//                     {etat: "livre"},
//                    { where: {id: commande.id}}
//                 );
    
//                 res.status(200).json({code:30062,message:"livraison accomplie"});

//             }
//         }       
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:30060,message:"serveur erreur"});
//     }
// }