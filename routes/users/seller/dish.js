const dishRouter = require("express").Router();
//const validInfo = require("../middlewares/validInfo");
const dishController = require("../../../controllers/users/seller/dishController");
//const authorisation = require("../middlewares/authorisation");

//CRUD
dishRouter.route("/available/:idDish").put(dishController.available);
dishRouter.route("/create").post(dishController.create);
dishRouter.route("/edit/:idDish").put(dishController.update);
dishRouter.route("/delete/:idDish").delete(dishController.delete);
dishRouter.route("/:idDish").get(dishController.get);
dishRouter.route("/").get(dishController.getAll);


module.exports = dishRouter;