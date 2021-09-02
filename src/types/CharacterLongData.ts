import { CharacterShortData } from "./CharacterShortData"

export interface CharacterLongData extends CharacterShortData {
  fullName: string
  aliases: string[]
  eyeColor: string
  hairColor: string
  work: string
}
