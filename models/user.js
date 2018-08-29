module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    lastName: {
      type: DataTypes.STRING,
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
    psn: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2]
      }
    },
    gamerTag: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2]
      }
    },
    steam: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return User;
};
