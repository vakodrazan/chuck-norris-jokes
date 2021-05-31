import * as React from 'react'
import { Context } from '../../context/Context'
import './InputForm.css'

export default function InputForm() {
  const {
    fullName,
    handleValueChange,
    category,
    isOpen,
    onOptionClicked,
    onToggle,
  } = React.useContext(Context)

  const categories = ['Nerdy', 'Explicit']

  const placeholder = isOpen ? 'Select category' : 'category'
  const selectedValue = category || placeholder

  return (
    <div className='wrapper'>
      <div className='select'>
        <div className='select__content'>
          <p
            className={
              category
                ? 'select__content__heading-default'
                : 'select__content__heading'
            }
            onClick={onToggle}>
            {selectedValue}
          </p>
          {isOpen && (
            <ul className='select__content__options'>
              {categories.map((cat) => (
                <li
                  className='select__content__options__item'
                  onClick={() => onOptionClicked(cat)}
                  key={cat}>
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <fieldset className='full_name'>
        <label className=''>Impersonate Chuck Norris</label>
        <input
          value={fullName}
          onChange={handleValueChange}
          className='full_name__input'
        />
      </fieldset>
    </div>
  )
}
