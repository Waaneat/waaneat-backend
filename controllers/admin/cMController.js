// const Admin = require("../../models/admin/Admin");
// const isValidString = require("../../utils/isValidString");
// const isValidNumeric = require("../../utils/isValidNumeric");
// const isValidImageFormat = require("../../utils/isValidImageFormat");
// const CondimentModel = require("../../models/admin/CondimentModel");

// exports.create = async(req,res)=>{
//     try {
//         const {cMName,cMPrice,cMDesc,cMImg} = req.body;
        
//         if (cMName == null || cMName === "" || !isValidString(cMName)) {
//             res.status(400).json({code:20001,message:"condiment name vide ou invalide"});
//         } else if (cMPrice == null || cMPrice === "" || !isValidNumeric(cMPrice)) {
//             res.status(400).json({code:20002,message:"le prix du plat vide ou invalide"});
//         } else if (cMDesc == null || cMDesc === "" || !isValidString(cMDesc) ) {
//             res.status(400).json({code:20003,message:"description vide ou invalide"});
//         } else if (cMImg == null || cMImg === "" || !isValidImageFormat(cMImg)) {
//             res.status(400).json({code:20007,message:"Image vide ou au mauvais format"});
//         } else{

//             const admin = await Admin.findOne({},
//                 {
//                     where: {id: req.cookies.userId},
//                 }
//             );
    
//             if(admin == null || admin.role != "admin" || admin.role !="root"){
//                 res.status(403).json({code:20041,message:"vous n’etes pas un admin"});
//             }else if(admin != null){
                
//                 await CondimentModel.create(
//                     {
//                         cMName : cMName,
//                         cMPrice : cMPrice,
//                         cMDesc : cMDesc,
//                         cMImg : cMImg
//                     }
//                 )
//                 res.status(200).json({code:20041,message:"Model d'accompagnement cree avec succes"});
                
//             }else{
//                 res.status(403).json({code:20041,message:"Operation interdite"});
//             }

//         }

        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20040,message:"serveur erreur"});
//     }
// }

// exports.update = async(req,res)=>{
//     try {
//         const idCM = req.params.idCM;
//         const {cMName,cMPrice,cMDesc,cMImg} = req.body;
        
//         if (cMName == null || cMName === "" || !isValidString(cMName)) {
//             res.status(400).json({code:20001,message:"condiment name vide ou invalide"});
//         } else if (cMPrice == null || cMPrice === "" || !isValidNumeric(cMPrice)) {
//             res.status(400).json({code:20002,message:"le prix du plat vide ou invalide"});
//         } else if (cMDesc == null || cMDesc === "" || !isValidString(cMDesc) ) {
//             res.status(400).json({code:20003,message:"description vide ou invalide"});
//         } else if (cMImg == null || cMImg === "" || !isValidImageFormat(cMImg)) {
//             res.status(400).json({code:20007,message:"Image vide ou au mauvais format"});
//         } else{

//             const admin = await Admin.findOne({},
//                 {
//                     where: {id: req.cookies.userId}
//                 }
//             );
    
//             if(admin == null || admin.role != "admin" || admin.role !="root"){
//                 res.status(403).json({code:20041,message:"vous n’etes pas un admin"});
//             }else if(admin != null){
                
//                 const condimentModel = await CondimentModel.findOne({},
//                     {
//                         where: {id: idCM},
//                     }
//                 );

//                 if(condimentModel == null){
//                     res.status(403).json({code:20041,message:"L'accompagnement n'existe pas"});
//                 }else if(condimentModel != null){
//                     await CondimentModel.update(
//                         {
//                             cMName : cMName,
//                             cMPrice : cMPrice,
//                             cMDesc : cMDesc,
//                             cMImg : cMImg
//                         },
//                         {
//                             where: {id: condimentModel.id},
//                         }
//                     )
//                     res.status(200).json({code:20041,message:"Model d'accompagnement modifié avec success"});
//                 }else{
//                     res.status(400).json({code:20041,message:"Action strictement interdite"});
//                 }
                
//             }else{
//                 res.status(403).json({code:20041,message:"Action strictement interdite"});
//             }

//         }

        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20040,message:"serveur erreur"});
//     }
// }

// exports.delete = async(req,res)=>{
//     try {
//         const idCM = req.params.idCM;
        

//         const admin = await Admin.findOne({},
//             {
//                 where: {id: req.cookies.userId}
//             }
//         );
    
//         if(admin == null || admin.role != "admin" || admin.role !="root"){
//             res.status(403).json({code:20041,message:"vous n’etes pas un admin"});
//         }else if(admin != null){
                
//             const condimentModel = await CondimentModel.findOne({},
//                 {
//                     where: {id: idCM},
//                 }
//             );

//             if(condimentModel == null){
//                 res.status(403).json({code:20041,message:"L'accompagnement n'existe pas"});
//             }else if(condimentModel != null){
//                 await CondimentModel.delete(
//                     {
//                         where: {id: condimentModel.id},
//                     }
//                 )
//                 res.status(200).json({code:20041,message:"Model d'accompagnement supprimé avec success"});
//             }else{
//                 res.status(400).json({code:20041,message:"Action strictement interdite"});
//             }
                
//         }else{
//             res.status(403).json({code:20041,message:"Action strictement interdite"});
//         }


        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20040,message:"serveur erreur"});
//     }
// }

// exports.get = async(req,res)=>{
//     try {
//         const idCM = req.params.idCM;

//         const admin = await Admin.findOne({},
//             {
//                 where: {id: req.cookies.userId}
//             }
//         );

//         if(admin == null || admin.role != "admin" || admin.role !="root"){
//             res.status(403).json({code:20041,message:"vous n’etes pas un admin"});
//         }else if(admin != null){
                
//             const condimentModel = await CondimentModel.findOne({},
//                 {
//                     where: {id: idCM},
//                 }
//             );

//             if(condimentModel == null){
//                 res.status(403).json({code:20041,message:"L'accompagnement n'existe pas"});
//             }else if(condimentModel != null){
//                 res.status(200).json({code:20041,message:condimentModel});
//             }else{
//                 res.status(400).json({code:20041,message:"Action strictement interdite"});
//             }
                
//         }else{
//             res.status(403).json({code:20041,message:"Action strictement interdite"});
//         }

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20060,message:"serveur erreur"});
//     }
// }

// exports.getAllCM = async(req,res)=>{
//     try {
//         const admin = await Admin.findOne({},
//             {
//                 where: {id: req.cookies.userId}
//             }
//         );

//         if(admin == null || admin.role != "admin" || admin.role !="root"){
//             res.status(403).json({code:20041,message:"vous n’etes pas un admin"});
//         }else if(admin != null){
                
//             const condimentModels = await CondimentModel.findAll({});

//             if(condimentModels == null){
//                 res.status(200).json({code:20041,message:"Aucun element"});
//             }else if(condimentModels != null){
//                 res.status(200).json({code:20041,message:condimentModels});
//             }else{
//                 res.status(400).json({code:20041,message:"Action strictement interdite"});
//             }
                
//         }else{
//             res.status(403).json({code:20041,message:"Action strictement interdite"});
//         }

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20080,message:"serveur erreur"});
//     }
// }