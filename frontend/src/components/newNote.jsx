import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Categories from './Categories'
import Swal from 'sweetalert2'

function NewNote () {
  const history = useNavigate()

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

  useEffect(() => {
    consultarCategorias()
  }, [])

  const actualizarState = (e) => {
    if (note.title.length > 100) {
      Swal.fire({
        icon: 'error',
        title: 'Too Long',
        text: 'The title cant be that long! (max 100)'
      })
    }
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
    console.log(note)
  }

  const submit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/notes/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    }).then(res => {
      res.json().then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Done!',
          text: response.message
        }).then(history('/'))
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

  const cancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      text: 'You will lose what you wrote!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        history('/')
      }
    })
  }

  return (
    <>
      <form onSubmit={submit}>
        <div className='container-2'>
          <input type="text" className="field" placeholder="Title" name="title" onChange={actualizarState}/>
          <select name="categoryId" id="category" className='button' onChange={actualizarState}>
            <option value="">No Category</option>
            {categories.map(category => (
              <Categories key={category.id} category={category} />
            ))}
          </select>
        </div>
        <textarea name="content" className="field" id="" cols="30" rows="10" onChange={actualizarState}></textarea>
        <div className="container">
          <button type="button" className="btn-cancel" onClick={cancel}>Cancel</button>
          <input type="submit" className="button" value="Submit"/>
        </div>
      </form>
    </>
  )
}

export default NewNote
