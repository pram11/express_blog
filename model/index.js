const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    "dialect": "sqlite",
    "storage":  "../db/db.sqlite"
  }) // Example for sqlite
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize,Sequelize);
db.User.hasMany(db.Post, { foreignKey: 'written', sourceKey: 'id' });
db.Post.belongsTo(db.User,{ foreignKey: 'written', targetKey: 'id' });
module.exports = db;
