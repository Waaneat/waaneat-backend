const User = require("../../../models/users/User");
const Seller = require("../../../models/users/seller/Seller");
const Restaurant = require("../../../models/users/seller/Restaurant");
const Order = require("../../../models/users/customer/Order");

exports.available = async(req,res)=>{
    try {
        // const userId = localStorage.getItem('userId');
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
            res.status(403).json({code:20021,message:"Vous n'etes pas un vendeur"});
        }else if(seller != null){
            const resto = await Restaurant.findOne(
                {where: {idSeller: seller.id}}
            );

            if(resto == null ){
                res.status(404).json({code:20021.5,message:"Boutique introuvable"});
            }else{
                await Restaurant.update(
                    {isAvailable: !resto.isAvailable},
                    {where: {idSeller: resto.idSeller}}
                );
    
                res.status(200).json({code:20022,message:"disponibilité changée"});
    
            }
        
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({code:20020,message:"serveur erreur"});
    }
}

// exports.acceptOrder = async(req,res)=>{
//     try {
//         const idOrder = req.params.id;

//         const seller = await Seller.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
                        
//                     }
//                 ] 
//             }
//         );

//         if(seller == null || seller.user.userType != "seller"){
//             res.status(403).json({code:20141,message:"Vous n'etes pas un vendeur"});
//         }else if(seller != null){
//             const order = await Order.findOne(
//                 {where: {id: idOrder}}
//             );

//             if(order == null){
//                 res.status(404).json({code:20141.5,message:"Commande introuvable"})
//             }else{
                
//                 await Order.update(
//                     {status: "accepted"},
//                    { where: {id: order.id}}
//                 );
    
//                 res.status(200).json({code:20142,message:"commande acceptée"});

//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20140,message:"serveur erreur"});
//     }
// }

// exports.cancelOrder = async(req,res)=>{
//     try {
//         const idOrder = req.params.id;

//         const seller = await Seller.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
                        
//                     }
//                 ] 
//             }
//         );

//         if(seller == null || seller.user.userType != "seller"){
//             res.status(403).json({code:20141,message:"Vous n'etes pas un vendeur"});
//         }else if(seller != null){
//             const order = await Order.findOne(
//                 {where: {id: idOrder}}
//             );

//             if(order == null){
//                 res.status(404).json({code:20141.5,message:"Commande introuvable"})
//             }else{
                
//                 await Order.update(
//                     {status: "canceled"},
//                    { where: {id: order.id}}
//                 );
    
//                 res.status(200).json({code:20142,message:"commande refusée"});

//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20140,message:"serveur erreur"});
//     }
// }

// exports.finishOrder = async(req,res)=>{
//     try {
//         const idOrder = req.params.id;

//         const seller = await Seller.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
                        
//                     }
//                 ] 
//             }
//         );

//         if(seller == null || seller.user.userType != "seller"){
//             res.status(403).json({code:20141,message:"Vous n'etes pas un vendeur"});
//         }else if(seller != null){
//             const order = await Order.findOne(
//                 {where: {id: idOrder}}
//             );

//             if(order == null){
//                 res.status(404).json({code:20141.5,message:"Commande introuvable"})
//             }else{
                
//                 await Order.update(
//                     {status: "finished"},
//                    { where: {id: order.id}}
//                 );
    
//                 res.status(200).json({code:20142,message:"commande acceptée"});

//             }
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20140,message:"serveur erreur"});
//     }
// }

// exports.getAllOrders = async(req,res)=>{
//     try {
//         const seller = await Seller.findOne(
//             {
//                 include:[
//                     {
//                         model: User,
//                         where: {id: req.cookies.userId},
//                     }
//                 ] 
//             }
//         );

//         if(seller == null || seller.user.userType != "seller"){
//             res.status(403).json({code:20131,message:"Vous n'etes pas un vendeur"});
//         }else if(seller != null){

//             const orders = await Order.findAll({
//                 where:{idSeller:seller.id}
//             });
//             if(orders == null){
//                 res.status(404).json({code:20131.5,message:"Aucune commande disponible"});
//             }else{
//                 res.status(200).json({code:20132,orders:orders});
//             }
            
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20130,message:"serveur erreur"});
//     }
// }