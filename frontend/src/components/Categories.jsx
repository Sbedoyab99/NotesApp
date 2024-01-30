function Categories ({ category }) {
  const { id, Name } = category
  return (
    <>
      <option value={id}>{Name}</option>
    </>
  )
}

export default Categories
