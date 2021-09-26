import axios from "axios"
import { useEffect, useState } from "react"
import { CharacterShortData } from "src/types/CharacterShortData"
import { mapCharactersFromSearch } from "src/util/mapCharacterFromSearch"

export const useSearchResults = (name: string) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<CharacterShortData[]>([])
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    const url = `https://superheroapi.com/api.php/${apiKey}/search/${name}`
    const getData = async () => {
      setError(false)
      setLoading(true)
      await axios
        .get(url)
        .then((res) => {
          setLoading(false)
          setData(res.data.results.map(mapCharactersFromSearch))
        })
        .catch((err) => {
          setLoading(false)
          setError(true)
        })
    }
    getData()
  }, [name])

  return { loading, data, error }
}
