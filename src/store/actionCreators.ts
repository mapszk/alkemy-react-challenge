import { CharacterShortData } from "src/types/CharacterShortData"
import * as actionTypes from "./actionTypes"

export const addCharacter = (character: CharacterShortData) => {
  const action: actionTypes.CharacterAction = {
    type: actionTypes.ADD_CHARACTER,
    payload: character,
  }
  return action
}

export const deleteCharacter = (id: number) => {
  const action: actionTypes.CharacterAction = {
    type: actionTypes.DELETE_CHARACTER,
    payload: id,
  }
  return action
}
