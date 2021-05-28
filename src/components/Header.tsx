import * as React from 'react'
import { Context } from '../context/Context'
import profile from '../images/chuck-norris-photo.png'
import unknownProfile from '../images/random-photo.jpg'

type JokeValue = {
  id: number
  joke: string
  categories?: string[]
}
export default function Header() {
  const { joke, loading, isNameChanged } = React.useContext(Context)

  const loadingState: boolean = loading
  const value: JokeValue = joke.value
  return (
    <header>
      <h1>
        {isNameChanged ? (
          <img src={unknownProfile} alt='Chuck Norris' />
        ) : (
          <img src={profile} alt='Chuck Norris' />
        )}
      </h1>
      {loadingState && <div>Loading...</div>}
      <p>{value?.joke}</p>
    </header>
  )
}
