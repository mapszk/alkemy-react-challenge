import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"
import SearchResultCard from "./SearchResultCard"
import { fireEvent } from "@testing-library/dom"
import { addCharacter } from "src/store/actionCreators"
import { CharacterShortData } from "src/types/CharacterShortData"

const mockStore = configureStore()
const testCharacter: CharacterShortData = {
  id: 100,
  name: "Batman",
  image: "https://placeimg.com/500/500",
  stats: {
    intelligence: 1,
    strength: 1,
    speed: 1,
    durability: 1,
    power: 1,
    combat: 1,
  },
  alignment: "good",
  weight: 100,
  height: 100,
}
const teamWithoutTestCharacter: CharacterShortData[] = []
const teamWithTestCharacter: CharacterShortData[] = [testCharacter]
const teamFull: CharacterShortData[] = [
  { ...testCharacter, id: 1 },
  { ...testCharacter, id: 2 },
  { ...testCharacter, id: 3 },
  { ...testCharacter, id: 4 },
  { ...testCharacter, id: 5 },
  { ...testCharacter, id: 6 },
]

const addButtonText = "Agregar"
const addButtonTextDisabled = "Agregado"
let store: any

describe("<SearchResultCard/>", () => {
  describe("Rendering", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      render(
        <Provider store={store}>
          <SearchResultCard character={testCharacter} />
        </Provider>
      )
    })
    test("Component renders", () => {
      expect(screen.getByText(testCharacter.name)).toBeInTheDocument()
    })
  })
  describe("Team without character", () => {
    beforeEach(() => {
      store = mockStore({
        characters: teamWithoutTestCharacter,
      })
      store.dispatch = jest.fn()
      render(
        <Provider store={store}>
          <SearchResultCard character={testCharacter} />
        </Provider>
      )
    })
    test("Without character on team, add button should be clickeable", () => {
      const addButton = screen.getByText(addButtonText)
      expect(addButton).toBeEnabled()
    })
    test("Should dispatch an action on add button click", () => {
      const addButton = screen.getByText(addButtonText)
      fireEvent.click(addButton)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(addCharacter(testCharacter))
    })
  })
  describe("Team with character", () => {
    beforeEach(() => {
      store = mockStore({
        characters: teamWithTestCharacter,
      })
      render(
        <Provider store={store}>
          <SearchResultCard character={testCharacter} />
        </Provider>
      )
    })
    test("With character in team add button should be disabled", () => {
      const addButton = screen.getByText(addButtonTextDisabled)
      expect(addButton).toBeInTheDocument()
    })
  })
  describe("Team full", () => {
    beforeEach(() => {
      store = mockStore({
        characters: teamFull,
      })
      render(
        <Provider store={store}>
          <SearchResultCard character={testCharacter} />
        </Provider>
      )
    })
    test("With full team clicking on add button should display a modal warning", () => {
      const addButton = screen.getByText(addButtonText)
      fireEvent.click(addButton)
      expect(
        screen.getByText("Solo puedes agregar 6 personajes")
      ).toBeInTheDocument()
    })
  })
})
