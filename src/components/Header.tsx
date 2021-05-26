import * as React from 'react'
import { Context } from '../Pages/Context'

export default function Header() {
  const { joke, chuckNorris, loading } = React.useContext(Context)

  const value = joke.value
  return (
    <header>
      <h1>
        <img src={chuckNorris} alt='' />
      </h1>
      {loading && <div>Loading...</div>}
      <p>{value?.joke}</p>
    </header>
  )
}
