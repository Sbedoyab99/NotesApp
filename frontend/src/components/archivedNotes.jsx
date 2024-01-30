import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'

function ArchivedNotes () {
  const [notes, setNotes] = useState([])

  const consultarAPI = async () => {
    try {
      const res = await fetch('http://localhost:3000/notes')
      let data = await res.json()
      data = data.filter(data => data.Archive === true)

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

  const handleChangeNote = () => {
    consultarAPI()
  }

  useEffect(() => {
    consultarAPI()
  }, [notes])

  return (
    <>
      <div className='archived-notes'>
        <Link to={'/'}>
          <button>
             <span><i className="fa-solid fa-backward"></i></span> Back
          </button>
        </Link>
        <div>
            <h2>
              Archived Notes
            </h2>
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

export default ArchivedNotes
