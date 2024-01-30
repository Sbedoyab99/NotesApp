import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import Category from './Category.js'

const Note = db.define('notes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  },
  Archive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

Note.belongsTo(Category, {
  foreignKey: {
    name:'categoryId',
    defaultValue: '0'
  },
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
})

export default Note