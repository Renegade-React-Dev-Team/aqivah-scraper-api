'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Source extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SourceField }) {
      // define association here
      this.hasMany(SourceField);
    }
  };
  Source.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      lastScrapedTime: DataTypes.DATE,
      paginationType: DataTypes.ENUM("INFINITE", "PAGED"),
      validate: {
        isUrl: true,
      },

    },
    isActive: DataTypes.BOOLEAN,
    lastScrapedTime: DataTypes.DATE,
    paginationType: DataTypes.ENUM('INFINITE', 'PAGED')
  }, {
    sequelize,
    modelName: 'Source',
  });
  return Source;
};