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
  const [isNameChanged, setIsNameChanged] = React.useState(false)

  const URL_BY_FULL_NAME: string = `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`
  const RANDOM_URL: string = 'http://api.icndb.com/jokes/random?'
  const URL_BY_CATEGORY: string = `http://api.icndb.com/jokes/random?limitTo=${category}`
  const URL_BY_CATEGORY_AND_FULL_NAME: string = `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}&limitTo=${category}`

  const JOKE_API_URL =
    firstName && lastName
      ? URL_BY_FULL_NAME
      : category
      ? URL_BY_CATEGORY
      : firstName && lastName && category
      ? URL_BY_CATEGORY_AND_FULL_NAME
      : RANDOM_URL

  const getJokes = async (jokeUrl: string) => {
    const res = await fetch(jokeUrl)
    const data = await res.json()
    setJoke(data)
    setLoading(false)
  }

  React.useEffect(() => {
    getJokes(JOKE_API_URL)
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
    getJokes(JOKE_API_URL)
    if (firstName !== '' && lastName !== '') {
      setIsNameChanged(true)
    } else {
      setIsNameChanged(false)
    }
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
      }}>
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
