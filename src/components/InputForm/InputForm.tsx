import * as React from 'react'
import { Context } from '../../context/Context'
import './InputForm.css'

export default function InputForm() {
  const { fullName, handleValueChange, category, setCategory } =
    React.useContext(Context)

  const categories = ['nerdy', 'explicit']
  return (
    <>
      <select
        value={category}
        className='select'
        onChange={({ target }) => setCategory(target.value)}>
        <option value=''>Category</option>
        {categories.map((cat, index) => (
          <option key={cat + index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <fieldset>
        <label>Impersonate Chuck Norris</label>
        <input value={fullName} onChange={handleValueChange} />
      </fieldset>
    </>
  )
}
