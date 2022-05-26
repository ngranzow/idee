const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
class Idee extends Model {}

Idee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idee_text: {
      type: String,
      allowNull: false,
      minlength: 1,
      maxlength: 50
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);
module.exports = Idee;