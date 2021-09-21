import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { CharacterShortData } from "src/types/CharacterShortData"
import * as actionTypes from "./actionTypes"

export interface State {
  characters: CharacterShortData[]
}

const initialState: State = {
  characters: [],
}

const reducer = (
  state: State = initialState,
  action: actionTypes.CharacterAction
): State => {
  switch (action.type) {
    case actionTypes.ADD_CHARACTER:
      const newCharacter = action.payload as CharacterShortData
      return {
        ...state,
        characters: [...state.characters, newCharacter],
      }
    case actionTypes.DELETE_CHARACTER:
      const newCharacters = state.characters.filter(
        (ch) => ch.id !== action.payload
      )
      return {
        ...state,
        characters: newCharacters,
      }
  }
  return state
}

const store = createStore(reducer, composeWithDevTools())
export default store
