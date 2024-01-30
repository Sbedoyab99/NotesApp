import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function ViewNote () {
  const { idNote } = useParams()

  const [note, setNote] = useState({
    title: '',
    content: '',
    categoryId: '',
    Archive: ''
  })

  const [category, setCategory] = useState({
    id: '',
    Name: ''
  })

  const consultarAPI = async () => {
    await fetch(`http://localhost:3000/notes/${idNote}`)
      .then(res => res.json())
      .then(note => setNote(note))
  }

  const consultarCategoria = () => {
    fetch(`http://localhost:3000/category/${note.categoryId}`)
      .then(res => res.json())
      .then(response => setCategory(response))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    consultarAPI()
  }, [])

  useEffect(() => {
    if (note.categoryId !== null) consultarCategoria()
  }, [note])

  return (
    <>
      <h2 className='title'>{note.title} - <span>{category.Name ?? 'No Category'}</span></h2>
      <p className='content'>{note.content}</p>
      <Link to={note.Archive === false ? '/' : '/notes/archived'}>
        <button>
          <span><i className="fa-solid fa-backward"></i></span> Back
        </button>
      </Link>
      <Link to={`/note/edit/${idNote}`}>
        <button className='button'>
          Edit <span><i className="fa-solid fa-pen-to-square"></i></span>
        </button>
      </Link>
    </>
  )
}

export default ViewNote
