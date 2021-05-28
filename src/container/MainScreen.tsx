import * as React from 'react'
import Header from '../components/Header'
import InputForm from '../components/InputForm'
import { Context } from '../context/Context'

export default function MainScreen() {
  const { fullName, drawNewRandomJoke } = React.useContext(Context)

  return (
    <div>
      <section>
        <Header />
        <InputForm />
        <button onClick={drawNewRandomJoke}>
          Draw a random {fullName === '' ? 'Chuck Norris' : fullName} joke
        </button>
      </section>
    </div>
  )
}
