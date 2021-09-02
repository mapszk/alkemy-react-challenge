import axios from "axios"
import { useEffect, useState } from "react"

export interface CharacterDatabase {
  name: string
  id: string
  biography: { alignment: "good" | "bad" }
  image: { url: string }
  powerstats: {
    intelligence: string
    speed: string
    power: string
    combat: string
    durability: string
    strength: string
  }
  appearance: { weight: number[]; height: number[] }
}

export const useSearchResults = (name: string) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<CharacterDatabase[]>([])
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    const url = `https://superheroapi.com/api.php/${apiKey}/search/${name}`
    const getData = async () => {
      setLoading(true)
      await axios
        .get(url)
        .then((res) => {
          setLoading(false)
          setData(res.data.results)
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
