module.exports = function(sequelize, DataTypes) {
  var Friend = sequelize.define("Friend", {
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  // joins user table and adds userId
  Friend.associate = function(models) {
    Friend.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Friend;
};
