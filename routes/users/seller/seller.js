const sellerRouter = require("express").Router();
//const validInfo = require("../middlewares/validInfo");
const sellerController = require("../../../controllers/users/seller/sellerController");

//CRUD
sellerRouter.route("/register").post(sellerController.create);
sellerRouter.route("/edit").put(sellerController.update);
sellerRouter.route("/").get(sellerController.get);
sellerRouter.route("/delete").delete(sellerController.delete);

module.exports = sellerRouter;