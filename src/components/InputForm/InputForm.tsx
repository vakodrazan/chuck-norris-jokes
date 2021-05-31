import * as React from 'react'
import { Context } from '../../context/Context'
import TextField from '@material-ui/core/TextField'
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

  const dropDownArrow = isOpen ? (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 0 25 24'
      width='25'>
      <path
        fill='#34394F'
        fillRule='evenodd'
        d='M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z'
        clipRule='evenodd'
      />
    </svg>
  ) : (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25'
      height='24'
      fill='none'
      viewBox='0 0 25 24'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M16.637 8.97c.292.293.292.767 0 1.06l-3.982 4c-.291.293-.764.293-1.055 0l-3.982-4c-.292-.293-.292-.767 0-1.06.291-.293.764-.293 1.055 0l3.454 3.47 3.454-3.47c.292-.293.765-.293 1.056 0z'
        clipRule='evenodd'
      />
    </svg>
  )

  return (
    <div className='wrapper'>
      <div className='select' onClick={onToggle}>
        <div className='select__content'>
          <p
            className={
              category
                ? 'select__content__heading-default'
                : 'select__content__heading'
            }>
            {isOpen ? (
              <span className='placeholder'>{placeholder}</span>
            ) : (
              <span>{selectedValue}</span>
            )}

            {dropDownArrow}
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
      <fieldset className={fullName ? 'full_name--focus' : 'full_name'}>
        <TextField
          className='full_name__input'
          id='filled-basic'
          value={fullName}
          onChange={handleValueChange}
          label='Impersonate Chuck Norris'
          aria-label='Impersonate Chuck Norris'
          variant='filled'
          InputProps={{
            style: {
              backgroundColor: '#fff',
            },
            disableUnderline: true,
          }}
          InputLabelProps={{
            style: {
              color: '#c4c4c4',
              fontSize: 16,
            },
          }}
        />
      </fieldset>
    </div>
  )
}
