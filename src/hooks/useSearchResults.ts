import axios from "axios"
import { useEffect, useState } from "react"
import { CharacterDatabase } from "src/types/CharacterDatabase"
import { CharacterShortData } from "src/types/CharacterShortData"

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
          setData(
            res.data.results.map((character: CharacterDatabase) => {
              return {
                id: Number(character.id),
                name: character.name,
                image: character.image.url,
                stats: {
                  intelligence: Number(character.powerstats.intelligence),
                  speed: Number(character.powerstats.speed),
                  durability: Number(character.powerstats.durability),
                  power: Number(character.powerstats.power),
                  combat: Number(character.powerstats.combat),
                  strength: Number(character.powerstats.strength),
                },
                alignment: character.biography.alignment,
                weight: Number(
                  character.appearance.weight[1].replace(/\D/g, "")
                ),
                height: Number(
                  character.appearance.height[1].replace(/\D/g, "")
                ),
              }
            })
          )
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
