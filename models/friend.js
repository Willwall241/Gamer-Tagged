module.exports = function(sequelize, DataTypes) {
  var Friend = sequelize.define("Friend", {
    friendId: {
      type: DataTypes.STRING,
      allowNull: false
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
