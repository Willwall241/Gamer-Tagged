var bcrypt = require("bcrypt-nodejs");

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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
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
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
