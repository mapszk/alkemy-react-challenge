import React from "react"
import "@testing-library/jest-dom/extend-expect"
import Team from "./Team"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

const mockStore = configureStore({})
const testStatsNumbers = {
  intelligence: 1,
  strength: 1,
  speed: 1,
  durability: 1,
  power: 1,
  combat: 1,
}
const testCharacter = {
  name: "Batman",
  id: 100,
  image: "https://placeimg.com/500/500",
  alignment: "good",
  stats: testStatsNumbers,
}
const testCharacter2 = {
  ...testCharacter,
  id: 200,
}

describe("<Team/>", () => {
  let component
  let store
  describe("Rendering", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      component = render(
        <Provider store={store}>
          <Team />
        </Provider>
      )
    })
    test("Component renders", () => {
      const title = component.getByText("Miembros:")
      expect(component.container).toContainElement(title)
    })
  })
  describe("Emtpy team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      component = render(
        <Provider store={store}>
          <Team />
        </Provider>
      )
    })
    test("When team is empty displays a text", () => {
      const teamEmtpyText = component.getByText(
        "No tienes ningún personaje en tu equipo"
      )
      expect(component.container).toContainElement(teamEmtpyText)
    })
  })
  describe("Team has characters", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [testCharacter, testCharacter2],
      })
      component = render(
        <Provider store={store}>
          <Team />
        </Provider>
      )
    })
    test("Render as many TeamCards as there are characters on the team", () => {
      const charactersNames = component.getAllByText(testCharacter.name)
      expect(charactersNames).toHaveLength(store.getState().characters.length)
    })
  })
})
