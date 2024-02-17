// // const { Sequelize, DataTypes, Model, Op } = require('sequelize');
// const sequelize = require("../../../database/db");

// const Dish = require('./Dish');
// const PackagingModel = require('../../admin/PackagingModel');

// const Packaging = sequelize.define('packagings', {
    
// },
// {
//   tableName:"packagings"
// }
// );

// Packaging.belongsTo(Dish, { foreignKey: 'idDish' });
// Packaging.belongsTo(PackagingModel, { foreignKey: 'idPM' });

// (async () => {
//   await sequelize.sync();
// })();

// module.exports = Packaging;