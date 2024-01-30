import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Category = db.define('category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
})

export default Category