import * as React from 'react'
import { Context } from '../../context/Context'
import profile from '../../images/chuck-norris-photo-lg.png'
import unknownProfile from '../../images/random-photo-lg.jpg'

import './Header.css'

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
    <header className='header'>
      <h1 className='header__heading'>
        {isNameChanged ? (
          <img src={unknownProfile} alt='Chuck Norris' />
        ) : (
          <img src={profile} alt='Chuck Norris' />
        )}
      </h1>
      {loadingState ? (
        <p>Loading...</p>
      ) : (
        <q className='header__content'>{value?.joke}</q>
      )}
    </header>
  )
}
