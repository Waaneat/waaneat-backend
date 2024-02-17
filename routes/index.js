const express = require("express");
const customerRouter = require("./users/customer/customer");
const authRouter = require("./users/auth");
const clientRouter = require("./users/customer/client");
const sellerRouter = require("./users/seller/seller");
const dishRouter = require("./users/seller/dish");
const restaurantRouter = require("./users/seller/restaurant");
const adminRouter = require("./admin/admin");
const adminAuthRouter = require("./admin/adminAuth");

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("welcome to our backend");
});

router.use("/auth",authRouter);
router.use("/auth",adminAuthRouter);
router.use("/customers",customerRouter);
router.use("/sellers",sellerRouter);
router.use("/dishes",dishRouter);
router.use("/clients",clientRouter);
router.use("/restaurants",restaurantRouter);
router.use("/admins",adminRouter);
// router.use("/livrairie",livraisonRouter);
// router.use("/plat",platRouter);
// router.use("/ingredient",ingredientRouter);
// router.use("/client",clientRouter);
// router.use("/client",panierRouter);
// router.use("/client",commandeRouter);
module.exports = router;