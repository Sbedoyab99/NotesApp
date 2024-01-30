import express from 'express'
import { deleteNote, editNote, newNote, Notes, singleNote, switchState } from '../controllers/NotesController.js'
import { Categories, CategoryById, deleteCategory, newCategory } from '../controllers/CategoryController.js'

const router = express.Router()

// Get all notes in the DB
router.get('/notes', Notes)
// Get a note by Id
router.get('/notes/:id', singleNote)
// Post a new note
router.post('/notes/new', newNote)
// Modify a note by Id
router.put('/notes/edit/:id', editNote)
// Switch the state of a note
router.put('/notes/state/:id', switchState)
// Delete a note by Id
router.delete('/notes/delete/:id', deleteNote)
// Add a new Category
router.post('/category/new', newCategory)
// Get all categories fron the DB
router.get('/category', Categories)
// Delete Category by ID
router.delete('/category/delete/:id', deleteCategory)
// Get Category by Id
router.get('/category/:id', CategoryById)

export default router