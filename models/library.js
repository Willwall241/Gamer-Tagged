module.exports = function(sequelize, DataTypes) {
  var Library = sequelize.define("Library", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gameID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Library;
};
