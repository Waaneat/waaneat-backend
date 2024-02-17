const restaurantRouter = require("express").Router();
//const validInfo = require("../middlewares/validInfo");
const restaurantController = require("../../../controllers/users/seller/restaurantController");
//const authorisation = require("../middlewares/authorisation");
// const authorisation = require("../middlewares/authorisation");

//registering
restaurantRouter.route("/available").put(restaurantController.available);


module.exports = restaurantRouter;