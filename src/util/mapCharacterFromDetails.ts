import { CharacterDatabase } from "src/types/CharacterDatabase"

export const mapCharacterFromDetails = (character: CharacterDatabase) => {
  return {
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
  }
}
