module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define("Status", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Status;
};
