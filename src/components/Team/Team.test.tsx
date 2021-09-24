import React from "react"
import "@testing-library/jest-dom/extend-expect"
import Team from "./Team"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { CharacterStats } from "src/types/CharacterStats"
import { CharacterShortData } from "src/types/CharacterShortData"

const mockStore = configureStore()
const testStatsNumbers: CharacterStats = {
  intelligence: 1,
  strength: 1,
  speed: 1,
  durability: 1,
  power: 1,
  combat: 1,
}
const testCharacter: CharacterShortData = {
  name: "Batman",
  id: 100,
  image: "https://placeimg.com/500/500",
  alignment: "good",
  stats: testStatsNumbers,
  weight: 90.0,
  height: 180.5,
}
const testCharacter2: CharacterShortData = {
  ...testCharacter,
  id: 200,
}

describe("<Team/>", () => {
  let store: any
  describe("Rendering", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      render(
        <Provider store={store}>
          <Team />
        </Provider>
      )
    })
    it("Should render title", () => {
      const title = screen.getByText("Miembros:")
      expect(title).toBeInTheDocument()
    })
  })
  describe("Emtpy team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      render(
        <Provider store={store}>
          <Team />
        </Provider>
      )
    })
    it("Should render empty team warning", () => {
      const teamEmtpyText = screen.getByText(
        "No tienes ningún personaje en tu equipo"
      )
      expect(teamEmtpyText).toBeInTheDocument()
    })
  })
  describe("Team has characters", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [testCharacter, testCharacter2],
      })
      render(
        <Provider store={store}>
          <Team />
        </Provider>
      )
    })
    it("Should render as many TeamCards as there are characters on the team", () => {
      const charactersNames = screen.getAllByText(testCharacter.name)
      expect(charactersNames).toHaveLength(store.getState().characters.length)
    })
  })
})
