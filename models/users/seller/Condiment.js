// const { Sequelize, DataTypes, Model, Op } = require('sequelize');
// const sequelize = require("../../../database/db");

// const Dish = require('./Dish');
// const CondimentModel = require('../../admin/CondimentModel');

// const Condiment = sequelize.define('condiments', {
    
// },
// {
//   tableName:"condiments"
// }
// );

// Condiment.belongsTo(Dish, { foreignKey: 'idDish' });
// Condiment.belongsTo(CondimentModel, { foreignKey: 'idCM' });

// (async () => {
//   await sequelize.sync();
// })();

// module.exports = Condiment;