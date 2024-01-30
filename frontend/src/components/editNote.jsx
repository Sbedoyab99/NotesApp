import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Categories from './Categories'

function EditNote () {
  const history = useNavigate()
  const { idNote } = useParams()

  const [note, setNote] = useState({
    title: '',
    content: '',
    categoryId: ''
  })

  const [categories, setCategories] = useState([])

  const consultarCategorias = () => {
    fetch('http://localhost:3000/category')
      .then(res => res.json())
      .then(response => setCategories(response))
      .catch(error => console.log(error))
  }

  const consultarAPI = async () => {
    await fetch(`http://localhost:3000/notes/${idNote}`)
      .then(res => res.json())
      .then(note => setNote(prevNotes => {
        if (JSON.stringify(prevNotes) !== JSON.stringify(note)) {
          return note
        }
        return prevNotes
      }))
  }

  const actualizarState = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
  }

  const saveChanges = async (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/notes/edit/${idNote}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    }).then(res => {
      res.json().then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Done!',
          text: response.message
        }).then(history(`/note/${idNote}`))
      })
    }).catch(err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: err.response
      })
    })
  }

  useEffect(() => {
    consultarAPI()
  }, [])

  useEffect(() => {
    consultarCategorias()
  }, [])

  return (
    <>
      <form>
        <div className='container-2'>
          <input type="text" className="field" placeholder="Title" name="title" value={note.title} onChange={actualizarState}/>
          <select name="categoryId" id="category" className='button' onChange={actualizarState} value={note.categoryId ?? ''}>
            <option value="">No Category</option>
            {categories.map(category => (
              <Categories key={category.id} category={category}/>
            ))}
          </select>
        </div>
        <textarea name="content" className="field" id="" cols="30" rows="10" onChange={actualizarState} value={note.content}></textarea>
        <div className="container">
          <button type="button" className="btn-cancel" onClick={() => history('/')}>Back</button>
          <input type="submit" className="button" value="Save changes" onClick={saveChanges}/>
        </div>
      </form>
    </>
  )
}

export default EditNote
