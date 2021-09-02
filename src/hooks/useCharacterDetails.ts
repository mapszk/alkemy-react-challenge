import axios from "axios"
import { useEffect, useState } from "react"
import { CharacterLongData } from "src/types/CharacterLongData"

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
          setData({
            id: Number(character.id),
            name: character.name,
            image: character.image.url,
            alignment: character.biography.alignment,
            fullName: character.biography["full-name"],
            aliases: character.biography.aliases,
            eyeColor: character.appearance["eye-color"],
            hairColor: character.appearance["hair-color"],
            height: Number(character.appearance.height[1].replace(/\D/g, "")),
            weight: Number(character.appearance.weight[1].replace(/\D/g, "")),
            work: character.work.occupation,
            stats: {
              intelligence: Number(character.powerstats.intelligence),
              speed: Number(character.powerstats.speed),
              durability: Number(character.powerstats.durability),
              power: Number(character.powerstats.power),
              combat: Number(character.powerstats.combat),
              strength: Number(character.powerstats.strength),
            },
          })
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
