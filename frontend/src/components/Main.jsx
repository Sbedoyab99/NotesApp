import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import Categories from './Categories'

function Main () {
  const [notes, setNotes] = useState([])
  const [categories, setCategories] = useState([])
  const ref = useRef([])

  const consultarAPI = async () => {
    try {
      const res = await fetch('http://localhost:3000/notes')
      let data = await res.json()
      data = data.filter(data => data.Archive === false)
      ref.current = data

      setNotes(prevNotes => {
        if (JSON.stringify(prevNotes) !== JSON.stringify(data)) {
          return data
        }
        return prevNotes
      })
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const consultarCategorias = () => {
    fetch('http://localhost:3000/category')
      .then(res => res.json())
      .then(response => setCategories(response))
      .catch(error => console.log(error))
  }

  const handleChangeNote = () => {
    consultarAPI()
  }

  useEffect(() => {
    consultarAPI()
  }, [])

  useEffect(() => {
    consultarCategorias()
  }, [])

  const filterNotes = e => {
    const selectedCategoryId = parseInt(e.target.value)

    if (selectedCategoryId === 0) {
      const filteredNotes = ref.current.filter(note => note.categoryId === null)
      setNotes(filteredNotes)
      return
    }

    if (!selectedCategoryId) {
      setNotes(ref.current)
      return
    }

    const filteredNotes = ref.current.filter(note => note.categoryId === selectedCategoryId)
    setNotes(filteredNotes)
  }

  return (
    <>
      <div className='new_note'>
        <div>
          <Link to={'/note/new'} className='cont'>
            <button>
                New Note <span><i className="fa-solid fa-circle-plus"></i></span>
            </button>
          </Link>
        </div>
        <div>
          <Link to={'/notes/archived'} className='cont'>
            <button>
                Archived <span><i className="fa-solid fa-box-archive"></i></span>
            </button>
          </Link>
        </div>
        <div>
          <form className='select'>
            <select name="category" id="category" className='button' onChange={filterNotes}>
              <option value="">Category</option>
              <option value="0">No Category</option>
              {categories.map(category => (
                <Categories key={category.id} category={category} />
              ))}
            </select>
            <Link to={'/settings'}>
              <i className="fa-solid fa-sliders"></i>
            </Link>
          </form>
        </div>
      </div>
      <table>
        <tbody>
          {notes.map(note => (
            <Note key={note.id} note={note} onChangeNote={handleChangeNote} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Main
