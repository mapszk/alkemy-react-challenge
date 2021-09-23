import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"
import SearchResultCard from "./SearchResultCard"
import { fireEvent, prettyDOM } from "@testing-library/dom"
import { addCharacter } from "src/store/actionCreators"

const mockStore = configureStore({})
const testCharacter = {
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
const teamWithTestCharacter = [testCharacter]
const teamFull = [{}, {}, {}, {}, {}, {}]
const teamWithoutTestCharacter = []

const addButtonText = "Agregar"
const addButtonTextDisabled = "Agregado"
let component
let store

describe("<SearchResultCard/>", () => {
  describe("Rendering", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      component = render(
        <Provider store={store}>
          <SearchResultCard character={testCharacter} />
        </Provider>
      )
    })
    test("Component renders", () => {
      expect(component.container).toBeDefined()
    })
  })

  describe("Team without character", () => {
    beforeEach(() => {
      store = mockStore({
        characters: teamWithoutTestCharacter,
      })
      store.dispatch = jest.fn()
      component = render(
        <Provider store={store}>
          <SearchResultCard character={testCharacter} />
        </Provider>
      )
    })
    test("Without character on team, add button should be clickeable", () => {
      const addButton = component.getByText(addButtonText)
      expect(addButton).toBeEnabled()
    })
    test("Should dispatch an action on add button click", () => {
      const addButton = component.getByText(addButtonText)
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
      component = render(
        <Provider store={store}>
          <SearchResultCard character={testCharacter} />
        </Provider>
      )
    })
    test("With character in team add button should be disabled", () => {
      const addButton = component.getByText(addButtonTextDisabled)
      expect(component.container).toContainElement(addButton)
    })
  })
})
