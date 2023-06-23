const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Diet_Recipes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    dietId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {timestamps: false});
};
