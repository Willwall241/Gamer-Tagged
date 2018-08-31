module.exports = function(sequelize, DataTypes) {
  var Library = sequelize.define("Library", {
    gameID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Library.associate = function(models) {
    Library.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Library;
};
