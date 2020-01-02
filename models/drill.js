/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('drill', {
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    delete_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  }, {
    tableName: 'drill'
  });
};
