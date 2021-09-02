import axios from "axios"
import { useEffect, useState } from "react"
import { CharacterShortData } from "src/types/CharacterShortData"

interface CharacterDatabase {
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
  const [data, setData] = useState<CharacterShortData[]>([])
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
                  strenght: Number(character.powerstats.strength),
                },
                alignment: character.biography.alignment,
                weight: Number(character.appearance.weight[1]),
                height: Number(character.appearance.height[1]),
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
