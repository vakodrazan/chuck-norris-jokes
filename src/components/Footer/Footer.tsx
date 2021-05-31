import * as React from 'react'
import { Context } from '../../context/Context'
import './Footer.css'

export default function Footer() {
  const { jokeCounter, setJokeCounter, onSaveJokes } = React.useContext(Context)
  const [isActive, setIsActive] = React.useState(false)
  const isDisabled = jokeCounter < 1 || jokeCounter > 100
  const isErrorPopUp = jokeCounter < 0 || jokeCounter > 100

  const addJokes = () => {
    setIsActive(true)
    setJokeCounter(jokeCounter - 1)
  }

  const minuJokes = () => {
    setIsActive(true)
    setJokeCounter(jokeCounter + 1)
  }

  const onValueChange = (e: { target: { value: string } }) => {
    const value: string = e.target.value
    setJokeCounter(Number(value))
    setIsActive(false)
  }

  const addIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'>
      <path
        fill='#34394F'
        d='M18.194 11.71v.58c0 .32-.262.581-.581.581H12.87v4.742c0 .32-.261.58-.58.58h-.581c-.32 0-.581-.26-.581-.58V12.87H6.387c-.32 0-.58-.261-.58-.58v-.581c0-.32.26-.581.58-.581h4.742V6.387c0-.32.261-.58.58-.58h.581c.32 0 .581.26.581.58v4.742h4.742c.32 0 .58.261.58.58zM24 12c0 6.629-5.371 12-12 12S0 18.629 0 12 5.371 0 12 0s12 5.371 12 12zm-1.548 0c0-5.802-4.709-10.452-10.452-10.452C6.198 1.548 1.548 6.256 1.548 12c0 5.802 4.708 10.452 10.452 10.452 5.802 0 10.452-4.709 10.452-10.452z'
      />
    </svg>
  )

  const removeIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'>
      <path
        fill='#34394F'
        d='M6.387 12.871c-.32 0-.58-.261-.58-.58v-.581c0-.32.26-.581.58-.581h11.226c.32 0 .58.261.58.58v.581c0 .32-.26.581-.58.581H6.387zM24 12c0 6.629-5.371 12-12 12S0 18.629 0 12 5.371 0 12 0s12 5.371 12 12zm-1.548 0c0-5.802-4.709-10.452-10.452-10.452C6.198 1.548 1.548 6.256 1.548 12c0 5.802 4.708 10.452 10.452 10.452 5.802 0 10.452-4.709 10.452-10.452z'
      />
    </svg>
  )

  const addActiveIcon = (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 32 32'>
      <title>plus</title>
      <path
        fill='#34394f'
        d='M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z'></path>
    </svg>
  )
  const removeActiveIcon = (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 32 32'>
      <title>minus</title>
      <path
        fill='#34394f'
        d='M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z'></path>
    </svg>
  )

  return (
    <footer className='footer'>
      <div className='footer__content'>
        <div
          className={
            isErrorPopUp
              ? 'footer__content__votes-not-valid'
              : 'footer__content__votes'
          }>
          <button className='footer__content__votes__button' onClick={addJokes}>
            {isActive && !isDisabled ? (
              <span className='footer__content__votes__button__wrapper'>
                {removeActiveIcon}
              </span>
            ) : (
              removeIcon
            )}
          </button>
          <input
            className='footer__content__votes__value'
            type='number'
            value={jokeCounter}
            onChange={onValueChange}
          />
          <button
            className='footer__content__votes__button'
            onClick={minuJokes}>
            {isActive && !isDisabled ? (
              <span className='footer__content__votes__button__wrapper'>
                {addActiveIcon}
              </span>
            ) : (
              addIcon
            )}
          </button>
        </div>
        <button
          className='footer__content__save-button'
          disabled={isDisabled}
          onClick={() => onSaveJokes('jokes.txt')}>
          Save jokes
        </button>
      </div>
      {isErrorPopUp && (
        <p className='footer__alert'>You can pick a number from 1 to 100.</p>
      )}
    </footer>
  )
}
