import * as React from 'react'
import Header from '../../components/Header/Header'
import InputForm from '../../components/InputForm/InputForm'
import Footer from '../../components/Footer/Footer'
import { Context } from '../../context/Context'
import './MainScreen.css'

export default function MainScreen() {
  const { fullName, drawNewRandomJoke, onToggleClose } =
    React.useContext(Context)

  return (
    <div className='content' onClick={onToggleClose}>
      <Header />
      <section className='content__form'>
        <InputForm />
        <button
          className='content__form__button'
          aria-label='Draw a new random jokes'
          onClick={drawNewRandomJoke}>
          Draw a random {fullName === '' ? 'Chuck Norris' : fullName} joke
        </button>
      </section>
      <Footer />
    </div>
  )
}
