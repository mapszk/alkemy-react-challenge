import axios from "axios"
import { useEffect, useState } from "react"
import { CharacterLongData } from "src/types/CharacterLongData"
import { mapCharacterFromDetails } from "src/util/mapCharacterFromDetails"

export const useCharacterDetails = (id: string) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<CharacterLongData | null>(null)
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const apiKey = process.env.REACT_APP_API_KEY
      const url = `https://superheroapi.com/api.php/${apiKey}/${id}`
      await axios
        .get(url)
        .then(({ data: character }) => {
          const mapedCharacter = mapCharacterFromDetails(character)
          setData(mapedCharacter)
          setLoading(false)
        })
        .catch((err) => {
          setError(true)
          setLoading(false)
        })
    }
    getData()
  }, [id])

  return { data, loading, error }
}
