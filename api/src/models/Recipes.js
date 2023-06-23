const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthscore: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    steps: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {timestamps: false});
};
