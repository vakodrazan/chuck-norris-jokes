import * as React from 'react'
import { Context } from '../Pages/Context'

export default function InputForm() {
  const { fullName, handleValueChange } = React.useContext(Context)
  return (
    <>
      <select>
        <option value=''>Category</option>
        <option value='explicit'>explicit</option>
        <option value='nerdy'>nerdy</option>
      </select>
      <fieldset>
        <label>Impersonate Chuck Norris</label>
        <input value={fullName} onChange={handleValueChange} />
      </fieldset>
    </>
  )
}
