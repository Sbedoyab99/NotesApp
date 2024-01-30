import Swal from 'sweetalert2'

function Category ({ category, onChangeCategory }) {
  const { id, Name } = category

  const deleteCategory = idCategory => {
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
        fetch(`http://localhost:3000/category/delete/${idCategory}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(response => {
            Swal.fire(
              'Deleted!',
              response.message,
              'success'
            )
            onChangeCategory()
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
          <h2 className='hoverable-title'>{Name}</h2>
        </td>
        <td className="container">
          <button className="button" onClick={() => deleteCategory(id)}>Delete <span><i className="fa-solid fa-trash"></i></span></button>
        </td>
      </tr>
    </>
  )
}

export default Category
