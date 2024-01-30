import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Category from './Category'

function Settings () {
  const [category, setCategory] = useState({
    Name: ''
  })

  const [categories, setCategories] = useState([])

  const actualizarState = e => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })
  }

  const submit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/category/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    })
      .then(res => res.json())
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Done!',
          text: response.message
        })
        handleChangeCategory()
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong'
        })
      })
  }

  const consultarAPI = () => {
    fetch('http://localhost:3000/category')
      .then(res => res.json())
      .then(response => {
        setCategories(prevCategories => {
          if (JSON.stringify(prevCategories) !== JSON.stringify(response)) {
            return response
          }
          return prevCategories
        })
      })
      .catch(error => console.log(error))
  }

  const handleChangeCategory = () => {
    consultarAPI()
  }

  useEffect(() => {
    consultarAPI()
  }, [categories])

  return (
    <>
      <div className='settings-container'>
        <form className="category-form" onSubmit={submit}>
          <div>
            <label htmlFor="Name">Add new Category</label>
            <input type="text" name="Name" className="field" id="Name" onChange={actualizarState}/>
          </div>
          <button type='submit' className='button'>Add <span><i className="fa-solid fa-circle-plus"></i></span></button>
        </form>
        <Link to={'/'}>
        <button>
          <span><i className="fa-solid fa-backward"></i></span> Back
        </button>
      </Link>
      </div>
      <table className='category-table'>
        <thead>
          <tr>
            <td><h2 className='table-head'>Category</h2></td>
            <td className='container'><h2 className='table-head'>Actions</h2></td>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <Category key={category.id} category={category} onChangeCategory={handleChangeCategory} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Settings
