const { db } = require('./index');
const { DataTypes } = require('sequelize');

/**
 * id: uuid, defaultValue: uuidv4
 * label: string
 * isAqivahField: boolean, defaultValue: false
 */

const Fields = db.define('Fields', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  label: {
    type: DataTypes.STRING,
    unique: true,
  },
  isAqivahField: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
});

export default Fields;