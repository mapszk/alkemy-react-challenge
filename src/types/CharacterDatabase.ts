export interface CharacterDatabase {
  name: string
  id: string
  biography: {
    alignment: "good" | "bad"
    aliases: string[]
    "full-name": string
  }
  image: { url: string }
  powerstats: {
    intelligence: string
    speed: string
    power: string
    combat: string
    durability: string
    strength: string
  }
  appearance: {
    weight: number[]
    height: number[]
    "eye-color": string
    "hair-color": string
  }
  work: {
    occupation: string
  }
}
