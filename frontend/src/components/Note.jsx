import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function Note ({ note, onChangeNote }) {
  const { id, title, Archive } = note

  const deleteNote = idNote => {
    Swal.fire({
      title: 'Are you sure?',
      text: "you won't be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "I'm sure",
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/notes/delete/${idNote}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(response => {
            Swal.fire(
              'Deleted!',
              response.message,
              'success'
            )
            onChangeNote()
          }).catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data
            })
          })
      }
    })
  }

  const switchState = idNote => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are changing the state of the note',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "I'm sure",
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if (Archive === true) {
          note.Archive = false
        } else {
          note.Archive = true
        }
        fetch(`http://localhost:3000/notes/state/${idNote}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note)
        })
          .then(res => res.json())
          .then(response => {
            Swal.fire(
              'Done!',
              response.message,
              'success'
            )
            onChangeNote()
          }).catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data
            })
          })
      }
    })
  }

  return (
    <>
      <tr className='row'>
        <td className="note">
          <Link to={`/note/${id}`}>
            <h2 className='hoverable-title'>{title} <span><i className="fa-solid fa-eye hidden"></i></span></h2>
          </Link>
        </td>
        <td className="container">
          <button className="button" onClick={() => switchState(id)}>{Archive ? 'Restore' : 'Archive'} <span><i className="fa-solid fa-box-archive"></i></span></button>
          <button className="button" onClick={() => deleteNote(id)}>Delete <span><i className="fa-solid fa-trash"></i></span></button>
        </td>
      </tr>
    </>
  )
}

export default Note
