import * as React from 'react'

type ChildrenProp = {
  children: React.ReactNode
}

type JokeValue = {
  id: number
  joke: string
  categories: string[]
}

type JokeUrl = {
  type: string
  value: JokeValue
}

const Context: any = React.createContext(null)

function ContextProvider({ children }: ChildrenProp) {
  const [joke, setJoke] = React.useState<JokeUrl[]>([])
  const [loading, setLoading] = React.useState(true)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [savedJokes, setSavedJokes] = React.useState({})
  const [isNameChanged, setIsNameChanged] = React.useState(false)
  const [jokeCounter, setJokeCounter] = React.useState(0)

  const URL_BY_FULL_NAME: string = `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`
  const RANDOM_URL: string = 'http://api.icndb.com/jokes/random?'
  const URL_BY_CATEGORY: string = `http://api.icndb.com/jokes/random?limitTo=[${category}]`
  const URL_BY_CATEGORY_AND_FULL_NAME: string = `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}&limitTo=[${category}]`

  const getJokes = async (jokeUrl: string) => {
    const res = await fetch(jokeUrl)
    const data = await res.json()
    setJoke(data)
    setLoading(false)
  }

  React.useEffect(() => {
    getJokes(RANDOM_URL)
  }, [])

  const handleValueChange = (e: { target: { value: string } }) => {
    const value: string = e.target.value
    setFullName(value)
    const splitingWords: string[] = value.split(' ')
    if (splitingWords.length === 1) {
      setFirstName(value)
      setLastName('Norris')
    } else {
      setFirstName(splitingWords[0])
      setLastName(splitingWords[1])
    }
  }

  const drawNewRandomJoke = () => {
    if (firstName && lastName && category) {
      getJokes(URL_BY_CATEGORY_AND_FULL_NAME)
    } else if (category !== '') {
      getJokes(URL_BY_CATEGORY)
    } else if (firstName && lastName) {
      getJokes(URL_BY_FULL_NAME)
    } else {
      getJokes(RANDOM_URL)
    }

    setCategory(category)
    if (firstName !== '' && lastName !== '') {
      setIsNameChanged(true)
    } else {
      setIsNameChanged(false)
    }
  }

  const getJokeData = async () => {
    const res = await fetch(`http://api.icndb.com/jokes/random/${jokeCounter}`)
    const data = await res.json()
    setSavedJokes(data)
  }

  React.useEffect(() => {
    getJokeData()
  }, [jokeCounter])

  function saveJokes(filename: string) {
    let downloadJokesElement = document.createElement('a')

    const convertedJokes = JSON.stringify(savedJokes)

    downloadJokesElement.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(`${convertedJokes}`)
    )
    downloadJokesElement.setAttribute('download', filename)

    downloadJokesElement.style.display = 'none'
    document.body.appendChild(downloadJokesElement)

    downloadJokesElement.click()
    setJokeCounter(0)
  }

  return (
    <Context.Provider
      value={{
        joke,
        loading,
        fullName,
        handleValueChange,
        drawNewRandomJoke,
        category,
        setCategory,
        firstName,
        lastName,
        isNameChanged,
        jokeCounter,
        setJokeCounter,
        saveJokes,
      }}>
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
