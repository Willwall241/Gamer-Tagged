module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("GTdb_user", {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: [2]
      }
    },

    email: {
      type: DataTypes.STRING,
      isUnique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return User;
};
