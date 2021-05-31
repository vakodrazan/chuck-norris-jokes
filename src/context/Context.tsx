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
  // State
  const [joke, setJoke] = React.useState<JokeUrl[]>([])
  const [loading, setLoading] = React.useState(true)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [savedJokes, setSavedJokes] = React.useState({})
  const [isNameChanged, setIsNameChanged] = React.useState(false)
  const [jokeCounter, setJokeCounter] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)

  // API url
  const FULL_NAME_URL: string = `firstName=${firstName}&lastName=${lastName}`
  const CATEGORY_URL: string = `limitTo=[${category.toLocaleLowerCase()}]`
  const RANDOM_URL: string = 'https://api.icndb.com/jokes/random'
  const URL_BY_FULL_NAME: string = `${RANDOM_URL}?${FULL_NAME_URL}`
  const URL_BY_CATEGORY: string = `${RANDOM_URL}?${CATEGORY_URL}`
  const URL_BY_CATEGORY_AND_FULL_NAME: string = `${RANDOM_URL}?${FULL_NAME_URL}&${CATEGORY_URL}`

  const getJokes = async (jokeUrl: string) => {
    const res = await fetch(jokeUrl)
    const data = await res.json()
    setJoke(data)
    setLoading(false)
  }

  React.useEffect(() => {
    getJokes(RANDOM_URL)
    // This line is required when deploying the site
    // Add this is with all the useeffect function
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (firstName !== '' && lastName !== '') {
      setIsNameChanged(true)
    } else {
      setIsNameChanged(false)
    }
  }

  const getJokeData = async () => {
    let jokeUrl: string
    const API_URL: string = `${RANDOM_URL}/${jokeCounter}?${FULL_NAME_URL}&${CATEGORY_URL}`
    if ((firstName && lastName) || category) {
      jokeUrl = `${API_URL}`
    } else {
      jokeUrl = `${RANDOM_URL}/${jokeCounter}`
    }

    const res = await fetch(jokeUrl)
    const data = await res.json()
    setSavedJokes(data)
  }

  React.useEffect(() => {
    getJokeData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jokeCounter])

  // Save jokes as a text file
  function onSaveJokes(filename: string) {
    let downloadJokesElement: HTMLAnchorElement = document.createElement('a')

    // Convert the object into string
    const convertedJokes: string = JSON.stringify(savedJokes)

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

  const onOptionClicked = (value: string) => {
    setCategory(value)
    setIsOpen(false)
  }

  const onToggleOpen = () => {
    if (isOpen) {
      setIsOpen(!isOpen)
    } else {
      setIsOpen(!isOpen)
    }
  }

  const onToggleClose = () => {
    if (isOpen) {
      setIsOpen(!isOpen)
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
        firstName,
        lastName,
        isNameChanged,
        jokeCounter,
        setJokeCounter,
        onSaveJokes,
        isOpen,
        setIsOpen,
        onOptionClicked,
        onToggleOpen,
        onToggleClose,
      }}>
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
