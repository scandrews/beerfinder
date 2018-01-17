module.exports = function(sequelize, Sequelize){
  var beertbl = sequelize.define("beertbl", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    color: {
      type: Sequelize.INTEGER,
      default: false 
    },
    hoppieness: {
      type: Sequelize.INTEGER,
      default: false
    },
    style: {
      type: Sequelize.STRING,
      default: false
    },
    smell: {
      type: Sequelize.STRING,
      default: false
    },
    feel: {
      type: Sequelize.STRING,
      default: false
    },
    triedThis: {
      type: Sequelize.BOOLEAN,
      default: "false"
    },
    createdAt:{
      type: Sequelize.TIME,
      allowNull: false, 
    },
    updatedAt:{
      type: Sequelize.TIME,
      allowNull: false, 
    }
  });
  return beertbl;
};




// -- CREATE TABLE beerTbl(
// --     id int auto_increment not null,
// --     name varchar(30),
// --     color int,
// --     hoppieness int, 
// --     style varchar(30),
// --     smell varchar(30),
// --     feel  varchar(30),
// --     triedThis Boolean,
// --     primary key(id)
// -- );

