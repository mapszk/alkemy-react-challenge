import { CharacterDatabase } from "src/types/CharacterDatabase"

export const mapCharactersFromSearch = (character: CharacterDatabase) => {
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
    weight: Number(character.appearance.weight[1].replace(/\D/g, "")),
    height: Number(character.appearance.height[1].replace(/\D/g, "")),
  }
}
