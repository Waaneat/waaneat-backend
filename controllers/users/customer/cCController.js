// const User = require("../../../models/users/User");
// const Cart = require("../../../models/users/customer/Cart");
// const CondimentsChoice = require("../../../models/users/customer/CondimentsChoice");
// const Customer = require("../../../models/users/customer/Customer");
// const Condiment = require("../../../models/users/seller/Condiment");


// exports.create = async(req,res)=>{
//     try {
//         const idCart = req.params.idCart;
//         const {condimentIds} = req.body;
        
//         if(condimentIds == null || condimentIds === "" || !isValidNumeric(condimentIds)){
//             res.status(400).json({code:20002,message:"Choix du condiment vide ou invalide"});
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
//                 const cart = await Cart.findOne({
//                     where:{id:idCart}
//                 });
    
//                 if(cart == null){
//                     res.status(404).json({code:10021.5,message:"Panier introuvable"})
//                 }else{
                       
//                     const validCondimentIds = await Condiment.findAll({
//                         where: { id: condimentIds },
//                     });

//                     if (validCondimentIds.length !== condimentIds.length) {
//                         res.status(400).json({ code: 20051.7, message: "Certains condimentId sont invalides" });
//                         return;
//                     }

//                     await CondimentsChoice.create(
//                         {
//                             idCustomer: customer.id,
//                             idCart: idCart,
//                             idCondiment: condimentId
//                         }
//                     );
//                     if (condimentIds && condimentIds.length > 0) {
//                         await CondimentsChoice.bulkCreate(
//                         condimentIds.map((condimentId) => ({
//                             idCustomer: customer.id,
//                             idCart: cart.id,
//                             idCondiment:condimentId
//                           }))
//                         );
//                     }
//                     res.status(200).json({code:10021.6,message:"condiment cree avec success"})
                    
//                 }
//             }
//         }
        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:10020,message:"serveur erreur"});
//     }
// }

// exports.update = async (req, res) => {
//     try {
//         const idCart = req.params.idCart;
//         const { condimentIds } = req.body;

//         if (condimentIds == null || condimentIds === "" || !isValidNumeric(condimentIds)) {
//             res.status(400).json({ code: 20002, message: "Choix du condiment vide ou invalide" });
//         } else {
//             const customer = await Customer.findOne({
//                 include: [
//                     {
//                         model: User,
//                         where: { id: req.cookies.userId },
//                     },
//                 ],
//             });

//             if (customer == null || customer.user.userType != "customer") {
//                 res.status(403).json({ code: 10021, message: "Vous n'êtes pas un client" });
//             } else if (customer != null) {
//                 const cart = await Cart.findOne({
//                     where: { id: idCart },
//                 });

//                 if (cart == null) {
//                     res.status(404).json({ code: 10021.5, message: "Panier introuvable" });
//                 } else {

//                     const validCondimentIds = await Condiment.findAll({
//                         where: { id: condimentIds },
//                     });

//                     if (validCondimentIds.length !== condimentIds.length) {
//                         res.status(400).json({ code: 20051.7, message: "Certains condimentId sont invalides" });
//                         return;
//                     }

//                     // Suppression des anciens condiments associés au panier
//                     await CondimentsChoice.destroy({
//                         where: {
//                             idCustomer: customer.id,
//                             idCart: idCart,
//                         },
//                     });

//                     // Ajout des nouveaux condiments associés au panier
//                     if (condimentIds && condimentIds.length > 0) {
//                         await CondimentsChoice.bulkCreate(
//                             condimentIds.map((condimentId) => ({
//                                 idCustomer: customer.id,
//                                 idCart: cart.id,
//                                 idCondiment: condimentId,
//                             }))
//                         );
//                     }

//                     res.status(200).json({ code: 10021.6, message: "Condiment mis à jour avec succès" });
//                 }
//             }
//         }

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ code: 10020, message: "Serveur erreur" });
//     }
// };

// exports.delete = async (req, res) => {
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
//             res.status(403).json({ code: 10021, message: "Vous n'êtes pas un client" });
//         } else if (customer != null) {
//             const cart = await Cart.findOne({
//                 where: { id: idCart },
//             });

//             if (cart == null) {
//                 res.status(404).json({ code: 10021.5, message: "Panier introuvable" });
//             } else {
//                 // Suppression des condiments associés au panier
//                 await CondimentsChoice.destroy({
//                     where: {
//                         idCustomer: customer.id,
//                         idCart: idCart,
//                     },
//                 });

//                 res.status(200).json({ code: 10021.8, message: "Condiments supprimés avec succès" });
//             }
//         }

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ code: 10020, message: "Serveur erreur" });
//     }
// };

// exports.getAll = async (req, res) => {
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
//             res.status(403).json({ code: 10021, message: "Vous n'êtes pas un client" });
//         } else if (customer != null) {
//             const cart = await Cart.findOne({
//                 where: { id: idCart },
//             });

//             if (cart == null) {
//                 res.status(404).json({ code: 10021.5, message: "Panier introuvable" });
//             } else {
//                 // Récupération de tous les condiments associés au panier
//                 const condiments = await CondimentsChoice.findAll({
//                     where: {
//                         idCustomer: customer.id,
//                         idCart: idCart,
//                     },
//                     include: [
//                         {
//                             model: Condiment,
//                             attributes: ['id', 'condimentName'], // Ajoutez les attributs que vous souhaitez afficher pour les condiments
//                         },
//                     ],
//                 });

//                 res.status(200).json({ code: 10022, condiments: condiments });
//             }
//         }

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ code: 10020, message: "Serveur erreur" });
//     }
// };

// exports.getOne = async (req, res) => {
//     try {
//         const idCondimentChoice = req.params.idCondimentChoice;

//         const customer = await Customer.findOne({
//             include: [
//                 {
//                     model: User,
//                     where: { id: req.cookies.userId },
//                 },
//             ],
//         });

//         if (customer == null || customer.user.userType != "customer") {
//             res.status(403).json({ code: 10021, message: "Vous n'êtes pas un client" });
//         } else if (customer != null) {
//             const condimentChoice = await CondimentsChoice.findOne({
//                 where: {
//                     id: idCondimentChoice,
//                     idCustomer: customer.id,
//                 },
//                 include: [
//                     {
//                         model: Condiment,
//                         attributes: ['id', 'condimentName'], // Ajoutez les attributs que vous souhaitez afficher pour les condiments
//                     },
//                 ],
//             });

//             if (condimentChoice == null) {
//                 res.status(404).json({ code: 10021.6, message: "Condiment introuvable" });
//             } else {
//                 res.status(200).json({ code: 10023, condimentChoice: condimentChoice });
//             }
//         }

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ code: 10020, message: "Serveur erreur" });
//     }
// };