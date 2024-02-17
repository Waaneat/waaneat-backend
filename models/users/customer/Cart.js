// const { Sequelize, DataTypes, Model, Op } = require('sequelize');
// const sequelize = require("../../../database/db");

// const Restaurant = require('../seller/Restaurant');
// const Customer = require('./Customer');
// const Order = require('./Order');
// const Dish = require('../seller/Dish');
// const Packaging = require('../seller/Packaging');

// const Cart = sequelize.define('carts', {
//     quantity: {
//         type: DataTypes.INTEGER,
//         require: true,
//         allowNull: false,
//         validate: {
//             isPositiveNumber(value) {
//                 if (value < 0) {
//                     throw new Error('La quantite doit être un nombre positif.');
//                 }
//             },
//         },
//         defaultValue: 1
//     },
//     status:{
//         type: DataTypes.STRING,
//         require: true,
//         defaultValue: "not ordered",
//         validate: {
//           is: /^[a-zA-Z0-9éè]+( [a-zA-Z0-9éè]+)*$/
//         }    
//     }    
// },
// {
//   tableName:"carts"
// }
// );

// Cart.belongsTo(Restaurant, { foreignKey: 'idResto' });
// Cart.belongsTo(Order, { foreignKey: 'idOrder' });
// Cart.belongsTo(Customer, { foreignKey: 'idCustomer' });
// Cart.belongsTo(Dish, { foreignKey: 'idDish' });
// Cart.belongsTo(Packaging, { foreignKey: 'idPackaging' });

// (async () => {
//   await sequelize.sync();
// })();

// module.exports = Cart;