import { CharacterShortData } from "src/types/CharacterShortData"

export const ADD_CHARACTER = "ADD_CHARACTER"
export const DELETE_CHARACTER = "DELETE_CHARACTER"

export interface CharacterAction {
  type: string
  payload: CharacterShortData | number
}
