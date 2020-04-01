module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    firstname: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    lastname: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    username: {
      type: Sequelize.TEXT,
    },

    about: {
      type: Sequelize.TEXT,
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    last_login: {
      type: Sequelize.DATE,
    },

    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active',
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

  return User;
};
