const clientRouter = require("express").Router();
// const validInfo = require("../middlewares/validInfo");
const clientController = require("../../../controllers/users/customer/clientController");
// const authorisation = require("../middlewares/authorisation");

clientRouter.route("/restaurants").post(clientController.getAllRestoByAdress);
clientRouter.route("/restaurants/:idResto").get(clientController.getRestaurant);
clientRouter.route("/dishes/:idResto").get(clientController.getAllDishesByIdResto);
// clientRouter.route("/getAllOrders").get(authorisation,clientController.getAllOrders);

module.exports = clientRouter;