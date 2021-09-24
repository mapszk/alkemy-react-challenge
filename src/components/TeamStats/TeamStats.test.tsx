import React from "react"
import TeamStats from "./TeamStats"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"
import { CharacterStats } from "src/types/CharacterStats"
import { CharacterShortData } from "src/types/CharacterShortData"
import { translateStat } from "src/util/translateStat"

const mockStore = configureStore()
const testStats1: CharacterStats = {
  intelligence: 1,
  strength: 1,
  speed: 1,
  durability: 1,
  power: 1,
  combat: 1,
}
const testStats2: CharacterStats = {
  intelligence: 10,
  strength: 4,
  speed: 4,
  durability: 4,
  power: 4,
  combat: 4,
}
const testCharacter1: CharacterShortData = {
  id: 100,
  name: "Batman",
  alignment: "good",
  image: "test",
  weight: 80.5,
  height: 178.6,
  stats: testStats1,
}
const testCharacter2: CharacterShortData = {
  ...testCharacter1,
  weight: 90.5,
  height: 188.6,
  stats: testStats2,
}

describe("<TeamStats/>", () => {
  let store: any
  describe("Rendering", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      render(
        <Provider store={store}>
          <TeamStats />
        </Provider>
      )
    })
    it("Should render title and stats", () => {
      expect(screen.getByText("Estadísticas:")).toBeInTheDocument()
      for (const stat of Object.keys(testStats1)) {
        expect(
          screen.getByText((translateStat(stat) as string) + ": 0")
        ).toBeInTheDocument()
      }
    })
  })
  describe("Emtpy team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      render(
        <Provider store={store}>
          <TeamStats />
        </Provider>
      )
    })
    it("Stats should be 0", () => {
      const stats = screen.getAllByTestId("stat-test")
      for (const stat of stats) {
        const statNumber = stat.textContent?.slice(-1)
        expect(Number(statNumber)).toBe(0)
      }
    })
    it("Average height and weight should show '?'", () => {
      const averageHeight = screen.getByText("Altura promedio:")
      const averageWeight = screen.getByText("Peso promedio:")
      expect(averageHeight.textContent?.slice(-1)).toBe("?")
      expect(averageWeight.textContent?.slice(-1)).toBe("?")
    })
  })
  describe("Characters on team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [testCharacter1, testCharacter2],
      })
      render(
        <Provider store={store}>
          <TeamStats />
        </Provider>
      )
    })
    it("Stats should be the sum of all character's stats", () => {
      const stats = screen.getAllByTestId("stat-test")
      for (const stat of stats) {
        // Extracting the stat name
        const statText = stat.textContent?.split(" ")[0].slice(0, -1)
        // Extracting the stat value
        const statNumber = stat.textContent?.replace(/^\D+/g, "")
        switch (statText) {
          // Translating stat name
          case "Inteligencia":
            return expect(Number(statNumber)).toBe(
              testStats1.intelligence + testStats2.intelligence
            )
          case "Fuerza":
            return expect(Number(statNumber)).toBe(
              testStats1.strength + testStats2.strength
            )
          case "Potencia":
            return expect(Number(statNumber)).toBe(
              testStats1.power + testStats2.power
            )
          case "Velocidad":
            return expect(Number(statNumber)).toBe(
              testStats1.speed + testStats2.speed
            )
          case "Resistencia":
            return expect(Number(statNumber)).toBe(
              testStats1.durability + testStats2.durability
            )
          case "Combate":
            return expect(Number(statNumber)).toBe(
              testStats1.combat + testStats2.combat
            )
        }
      }
    })
    it("Weight and height should display the average between characters", () => {
      const averageWeight = screen
        .getByText("Peso promedio:")
        .textContent?.replace(/^\D+/g, "")
      const averageHeight = screen
        .getByText("Altura promedio:")
        .textContent?.replace(/^\D+/g, "")
      const allCharacterWeights = store
        .getState()
        .characters.map((ch: CharacterShortData) => ch.weight)
        .reduce((a: number, b: number) => a + b)
      const allCharacterHeights = store
        .getState()
        .characters.map((ch: CharacterShortData) => ch.height)
        .reduce((a: number, b: number) => a + b)
      const expectedWeight =
        allCharacterWeights / store.getState().characters.length
      const expectedHeight =
        allCharacterHeights / store.getState().characters.length
      expect(parseFloat(averageWeight as string).toFixed(2)).toBe(
        expectedWeight.toFixed(2)
      )
      expect(parseFloat(averageHeight as string).toFixed(2)).toBe(
        expectedHeight.toFixed(2)
      )
    })
    it("Highest stat should have 'active' class", () => {
      const stats = screen.getAllByTestId("stat-test")
      const highestStat = Array.from(stats).reduce((a, b) => {
        const numberA = parseInt(a.textContent?.replace(/^\D+/g, "") as string)
        const numberB = parseInt(b.textContent?.replace(/^\D+/g, "") as string)
        return numberA > numberB ? a : b
      })
      expect(highestStat).toHaveClass("active")
    })
  })
})
