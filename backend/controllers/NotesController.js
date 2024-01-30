import Note from "../models/Note.js"

const Notes = async (req, res, next) => {
  try {
    const notes = await Note.findAll()
    res.json(notes)
  } catch (error) {
    console.log(error)
    next()
  }
}

const singleNote = async (req, res, next) => {
  const {id} = req.params
  try {
    const note = await Note.findByPk(id)
    res.json(note)
  } catch (error) {
    console.log(error)
    next()
  }
}

const newNote = async (req, res, next) => {
  const note = new Note(req.body)
  if (note.categoryId === '') note.categoryId = null
  try {
    await note.save()
    res.json({message: 'New note added'})
  } catch (error) {
    res.json({message: error}) 
    next()
  }
}

const deleteNote = async (req, res, next) => {
  const {id} = req.params
  const note = await Note.findByPk(id)
  try {
    note.destroy()
    res.json({message: 'The note has been deleted'})
  } catch (error) {
    console.log(error)
    next()
  }
}

const editNote = async (req, res, next) => {
  const {id} = req.params
  
  const {title, content} = req.body
  let {categoryId} = req.body
  if (categoryId === '') categoryId = null
  try {
    const note = await Note.findByPk(id)
    note.set({
      title,
      content,
      categoryId
    })
    await note.save()
    res.json({message: 'Changes saved'})
  } catch (error) {
    console.log(error)
    next()
  }
}

const switchState = async (req, res, next) => {
  const {id} = req.params
  const {Archive} = req.body

  try {
    const note = await Note.findByPk(id)
    note.set({
      Archive
    })
    await note.save()
    res.json({message: 'Changes saved'})
  } catch (error) {
    console.log(error)
    next()
  }
}

export {
  Notes,
  newNote,
  deleteNote,
  editNote,
  singleNote,
  switchState
}