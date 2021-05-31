import * as React from 'react'
import Header from '../../components/Header/Header'
import InputForm from '../../components/InputForm/InputForm'
import Footer from '../../components/Footer/Footer'
import { Context } from '../../context/Context'
import './MainScreen.css'

export default function MainScreen() {
  const { fullName, drawNewRandomJoke, onToggle } = React.useContext(Context)

  return (
    <div className='content' onClick={onToggle}>
      <Header />
      <section>
        <InputForm />
        <button onClick={drawNewRandomJoke}>
          Draw a random {fullName === '' ? 'Chuck Norris' : fullName} joke
        </button>
      </section>
      <Footer />
    </div>
  )
}
