import { CharacterStats } from "./CharacterStats"

export interface CharacterShortData {
  id: number
  name: string
  image: string
  stats: CharacterStats
  alignment: "good" | "bad"
  weight: number
  height: number
}
