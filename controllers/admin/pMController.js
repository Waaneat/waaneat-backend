// const Admin = require("../../models/admin/Admin");
// const isValidString = require("../../utils/isValidString");
// const isValidNumeric = require("../../utils/isValidNumeric");
// const isValidImageFormat = require("../../utils/isValidImageFormat");
// const CondimentModel = require("../../models/admin/CondimentModel");
// const PackagingModel = require("../../models/admin/PackagingModel");

// exports.create = async(req,res)=>{
//     try {
//         const {pMName,pMPrice,pMDesc,pMImg} = req.body;
        
//         if (pMName == null || pMName === "" || !isValidString(pMName)) {
//             res.status(400).json({code:20001,message:"packaging name vide ou invalide"});
//         } else if (pMPrice == null || pMPrice === "" || !isValidNumeric(pMPrice)) {
//             res.status(400).json({code:20002,message:"le prix du packaging vide ou invalide"});
//         } else if (pMDesc == null || pMDesc === "" || !isValidString(pMDesc) ) {
//             res.status(400).json({code:20003,message:"description vide ou invalide"});
//         } else if (pMImg == null || pMImg === "" || !isValidImageFormat(pMImg)) {
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
                
//                 await PackagingModel.create(
//                     {
//                         pMName : pMName,
//                         pMPrice : pMPrice,
//                         pMDesc : pMDesc,
//                         pMImg : pMImg
//                     }
//                 )
//                 res.status(200).json({code:20041,message:"Model de packaging cree avec succes"});
                
//             }else{
//                 res.status(403).json({code:20041,message:"Action strictement interdite"});
//             }

//         }

        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({code:20040,message:"serveur erreur"});
//     }
// }

// exports.update = async(req,res)=>{
//     try {
//         const idPM = req.params.idPM;
//         const {pMName,pMPrice,pMDesc,pMImg} = req.body;
        
//         if (pMName == null || pMName === "" || !isValidString(pMName)) {
//             res.status(400).json({code:20001,message:"packaging name vide ou invalide"});
//         } else if (pMPrice == null || pMPrice === "" || !isValidNumeric(pMPrice)) {
//             res.status(400).json({code:20002,message:"le prix du packaging vide ou invalide"});
//         } else if (pMDesc == null || pMDesc === "" || !isValidString(pMDesc) ) {
//             res.status(400).json({code:20003,message:"description vide ou invalide"});
//         } else if (pMImg == null || pMImg === "" || !isValidImageFormat(pMImg)) {
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
                
//                 const packagingModel = await PackagingModel.findOne({},
//                     {
//                         where: {id: idPM},
//                     }
//                 );

//                 if(packagingModel == null){
//                     res.status(403).json({code:20041,message:"Le packaging n'existe pas"});
//                 }else if(packagingModel != null){
//                     await PackagingModel.update(
//                         {
//                             pMName : pMName,
//                             pMPrice : pMPrice,
//                             pMDesc : pMDesc,
//                             pMImg : pMImg
//                         },
//                         {
//                             where: {id: packagingModel.id},
//                         }
//                     )
//                     res.status(200).json({code:20041,message:"Model de packaging modifié avec success"});
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
//         const idPM = req.params.idPM;
        

//         const admin = await Admin.findOne({},
//             {
//                 where: {id: req.cookies.userId}
//             }
//         );
    
//         if(admin == null || admin.role != "admin" || admin.role !="root"){
//             res.status(403).json({code:20041,message:"vous n’etes pas un admin"});
//         }else if(admin != null){
                
//             const packagingModel = await PackagingModel.findOne({},
//                 {
//                     where: {id: idPM},
//                 }
//             );

//             if(packagingModel == null){
//                 res.status(403).json({code:20041,message:"Le packaging n'existe pas"});
//             }else if(packagingModel != null){
//                 await PackagingModel.delete(
//                     {
//                         where: {id: packagingModel.id},
//                     }
//                 )
//                 res.status(200).json({code:20041,message:"Model de packaging supprimé avec success"});
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
//         const idPM = req.params.idPM;

//         const admin = await Admin.findOne({},
//             {
//                 where: {id: req.cookies.userId}
//             }
//         );

//         if(admin == null || admin.role != "admin" || admin.role !="root"){
//             res.status(403).json({code:20041,message:"vous n’etes pas un admin"});
//         }else if(admin != null){
                
//             const packagingModel = await PackagingModel.findOne({},
//                 {
//                     where: {id: idPM},
//                 }
//             );

//             if(packagingModel == null){
//                 res.status(403).json({code:20041,message:"Le packaging n'existe pas"});
//             }else if(packagingModel != null){
//                 res.status(200).json({code:20041,message:packagingModel});
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

// exports.getAllPM = async(req,res)=>{
//     try {
//         const admin = await Admin.findOne({},
//             {
//                 where: {id: req.cookies.userId}
//             }
//         );

//         if(admin == null || admin.role != "admin" || admin.role !="root"){
//             res.status(403).json({code:20041,message:"vous n’etes pas un admin"});
//         }else if(admin != null){
                
//             const packagingModels = await PackagingModel.findAll({});

//             if(packagingModels == null){
//                 res.status(200).json({code:20041,message:"Aucun element"});
//             }else if(packagingModels != null){
//                 res.status(200).json({code:20041,message:packagingModels});
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