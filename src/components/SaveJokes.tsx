import * as React from 'react'
import { Context } from '../context/Context'

export default function Footer() {
  const { jokeCounter, setJokeCounter, saveJokes } = React.useContext(Context)
  const isDisabled = jokeCounter < 1 || jokeCounter > 100
  const isErrorPopUp = jokeCounter < 0 || jokeCounter > 100

  return (
    <footer>
      <div>
        <button onClick={() => setJokeCounter(jokeCounter - 1)}>-</button>
        <input
          type='number'
          value={jokeCounter}
          onChange={(e) => setJokeCounter(e.target.value)}
        />
        <button onClick={() => setJokeCounter(jokeCounter + 1)}>+</button>
      </div>
      <button disabled={isDisabled} onClick={saveJokes}>
        Save jokes
      </button>
      {isErrorPopUp && <p>You can pick a number from 1 to 100.</p>}
    </footer>
  )
}
