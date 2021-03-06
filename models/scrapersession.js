'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScraperSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Property, Source, }) {
      // define association here
      this.hasMany(Property);
      this.belongsTo(Source);
    }
  };
  ScraperSession.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    scraper: DataTypes.ENUM('NEW', 'UPDATE'),
    endedAt: DataTypes.DATE,
    resultMessage: DataTypes.STRING,
    result: DataTypes.ENUM('SUCCESS', 'FAILURE')
  }, {
    sequelize,
    modelName: 'ScraperSession',
  });
  return ScraperSession;
};