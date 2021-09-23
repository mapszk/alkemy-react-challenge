import React from "react"
import TeamStats from "./TeamStats"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"

const mockStore = configureStore({})
const testStats1 = {
  intelligence: 1,
  strength: 1,
  speed: 1,
  durability: 1,
  power: 1,
  combat: 1,
}
const testStats2 = {
  intelligence: 10,
  strength: 4,
  speed: 4,
  durability: 4,
  power: 4,
  combat: 4,
}
const testCharacter1 = {
  weight: 80.5,
  height: 178.6,
  stats: testStats1,
}
const testCharacter2 = {
  weight: 90.5,
  height: 188.6,
  stats: testStats2,
}

describe("<TeamStats/>", () => {
  let component
  let store
  describe("Rendering", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      component = render(
        <Provider store={store}>
          <TeamStats />
        </Provider>
      )
    })
    test("Component renders", () => {
      const title = component.getByText("Estadísticas:")
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
          <TeamStats />
        </Provider>
      )
    })
    test("Stats should be 0 when team is empty", () => {
      const stats = component.container.querySelectorAll(".list-group-item")
      for (const stat of stats) {
        const statNumber = stat.textContent.slice(-1)
        expect(Number(statNumber)).toBe(0)
      }
    })
    test("Average height and weight should show '?'", () => {
      const averageHeight = component.getByText("Altura promedio:")
      const averageWeight = component.getByText("Peso promedio:")
      expect(averageHeight.textContent.slice(-1)).toBe("?")
      expect(averageWeight.textContent.slice(-1)).toBe("?")
    })
  })
  describe("Characters on team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [testCharacter1, testCharacter2],
      })
      component = render(
        <Provider store={store}>
          <TeamStats />
        </Provider>
      )
    })
    test("Stats should be the sum of all character's stats", () => {
      const stats = component.container.querySelectorAll(".list-group-item")
      for (const stat of stats) {
        // Extracting the stat name
        const statText = stat.textContent.split(" ")[0].slice(0, -1)
        // Extracting the stat value
        const statNumber = stat.textContent.replace(/^\D+/g, "")
        switch (statText) {
          // Translating stat name
          case "Inteligencia":
            return expect(Number(statNumber)).toBe(
              testStats1.intelligence + testStats2.intelligence
            )
          case "Fuerza":
            return expect(Number(statNumber)).toBe(testStats1.strength + testStats2.strength)
          case "Potencia":
            return expect(Number(statNumber)).toBe(testStats1.power + testStats2.power)
          case "Velocidad":
            return expect(Number(statNumber)).toBe(testStats1.speed + testStats2.speed)
          case "Resistencia":
            return expect(Number(statNumber)).toBe(testStats1.durability + testStats2.durability)
          case "Combate":
            return expect(Number(statNumber)).toBe(testStats1.combat + testStats2.combat)
        }
      }
    })
    test("Weight and height should display the average between characters", () => {
      const averageWeight = component.getByText("Peso promedio:").textContent.replace(/^\D+/g, "")
      const averageHeight = component.getByText("Altura promedio:").textContent.replace(/^\D+/g, "")
      const allCharacterWeights = store
        .getState()
        .characters.map((ch) => ch.weight)
        .reduce((a, b) => a + b)
      const allCharacterHeights = store
        .getState()
        .characters.map((ch) => ch.height)
        .reduce((a, b) => a + b)
      const expectedWeight = allCharacterWeights / store.getState().characters.length
      const expectedHeight = allCharacterHeights / store.getState().characters.length
      expect(parseFloat(averageWeight).toFixed(2)).toBe(expectedWeight.toFixed(2))
      expect(parseFloat(averageHeight).toFixed(2)).toBe(expectedHeight.toFixed(2))
    })
    test("Highest stat should have 'active' class", () => {
      const stats = component.container.querySelectorAll(".list-group-item")
      const highestStat = Array.from(stats).reduce((a, b) =>
        parseInt(a.textContent.replace(/^\D+/g, "")) > parseInt(b.textContent.replace(/^\D+/g, ""))
          ? a
          : b
      )
      expect(highestStat).toHaveClass("active")
    })
  })
})
