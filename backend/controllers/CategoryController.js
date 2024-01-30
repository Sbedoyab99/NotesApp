import Category from "../models/Category.js"

const newCategory = async (req, res, next) => {
  const category = new Category(req.body)
  try {
    await category.save()
    res.json({message:'Added succesfully!'})
  } catch (error) {
    console.log(error)
    next()
  }
}

const Categories = async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (error) {
    console.log(error)
    next()
  }
}

const deleteCategory = async (req, res, next) => {
  const {id} = req.params
  const category = await Category.findByPk(id)
  try {
    category.destroy()
    res.json({message: 'Category deleted succesfully!'})
  } catch (error) {
    console.log(error)
    next()
  }
}

const CategoryById = async (req, res, next) => {
  console.log('aqui estoy')
  const {id} = req.params
  try {
    const category = await Category.findByPk(id)
    res.json(category)
  } catch (error) {
    console.log(error)
    next()
  }
}

export {
  newCategory,
  Categories,
  deleteCategory,
  CategoryById
}