// const { Sequelize, DataTypes, Model, Op } = require('sequelize');
// const sequelize = require("../../../database/db");

// const Customer = require('./Customer');
// const Seller = require('../seller/Seller');
// const Deliver = require('../deliver/Deliver');
// const Cart = require('./Cart');

// const Order = sequelize.define('orders', {
//     nOrder:{
//         type: DataTypes.STRING,
//         require: true,
//         defaultValue: null,
//         validate: {
//           is: /^[a-zA-Z0-9éè]+( [a-zA-Z0-9éè]+)*$/
//         }    
//     },
//     status: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: "ordered",
//         validate: {
//             isIn: [['ordered', 'waiting', 'accepted', 'waiting for delivery', 'waiting for you', 'on delivery', 'finished', 'canceled']],
//         },
//     },
//     orderType: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             isIn: [['delivery', 'takeout']], // La valeur doit être soit "delivery" soit "takeout"
//         },
//     },
//     paymentType: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             isIn: [['mobile money', 'cash']], // La valeur doit être soit "mobile money" soit "cash"
//         },
//     },
//     totalPrice: {
//         type: DataTypes.INTEGER,
//         require: true,
//         allowNull: false,
//         validate: {
//             isPositiveNumber(value) {
//                 if (value < 0) {
//                     throw new Error('Le prix doit être un nombre positif.');
//                 }
//             },
//         },
//         defaultValue: 0
//     }  
// },
// {
//   tableName:"orders"
// }
// );

// Order.belongsTo(Customer, { foreignKey: 'idCustomer' });
// Order.belongsTo(Seller, { foreignKey: 'idSeller' });
// Order.belongsTo(Deliver, { foreignKey: 'idDeliver' });
// Order.belongsTo(Cart, { foreignKey: 'idCart' });

// (async () => {

//   await sequelize.sync();

// })();

// module.exports = Order;