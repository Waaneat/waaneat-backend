// const { Sequelize, DataTypes, Model, Op } = require('sequelize');
// const sequelize = require("../../../database/db");

// const Customer = require('./Customer');
// const Cart = require('./Cart');
// const Condiment = require('../seller/Condiment');
// // const Pack = require('./Pack');

// const CondimentsChoice = sequelize.define('condiments_choices', {
    
// },
// {
//   tableName:"condiments_choices"
// }
// );

// CondimentsChoice.belongsTo(Customer, { foreignKey: 'idCustomer' });
// CondimentsChoice.belongsTo(Cart, { foreignKey: 'idCart' });
// CondimentsChoice.belongsTo(Condiment, { foreignKey: 'idCondiment' });

// (async () => {

//   await sequelize.sync();

// })();

// module.exports = CondimentsChoice;