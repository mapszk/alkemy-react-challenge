import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import TeamCard from "./TeamCard"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { fireEvent } from "@testing-library/dom"
import { deleteCharacter } from "src/store/actionCreators"
import { CharacterStats } from "src/types/CharacterStats"
import { translateStat } from "src/util/translateStat"

const mockStore = configureStore()
const testStatsNan: CharacterStats = {
  intelligence: NaN,
  strength: NaN,
  speed: NaN,
  durability: NaN,
  power: NaN,
  combat: NaN,
}
const testStatsNumbers: CharacterStats = {
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
  weight: 90.0,
  height: 180.5,
}

describe("<TeamCard/>", () => {
  let store: any
  const history = createMemoryHistory()
  describe("Rendering", () => {
    beforeEach(() => {
      store = mockStore({})
      render(
        <Provider store={store}>
          <Router history={history}>
            <TeamCard
              name={testCharacter.name}
              id={testCharacter.id}
              image={testCharacter.image}
              alignment={testCharacter.alignment as "good"}
              stats={testStatsNumbers}
            />
          </Router>
        </Provider>
      )
    })
    it("Should render name, alignment, stats, details button and remove button", () => {
      const aligment = screen.getByText(
        testCharacter.alignment === "good" ? "Héroe" : "Villano"
      )
      expect(screen.getByText(testCharacter.name)).toBeInTheDocument()
      expect(aligment).toBeInTheDocument()
      expect(screen.getByText("Ver detalle")).toBeInTheDocument()
      expect(screen.getByText("Remover")).toBeInTheDocument()
      for (const stat of Object.keys(testStatsNumbers)) {
        expect(
          screen.getByText(
            (translateStat(stat) as string) + ": " + testStatsNumbers[stat]
          )
        ).toBeInTheDocument()
      }
    })
  })
  describe("Buttons actions", () => {
    beforeEach(() => {
      store = mockStore({})
      store.dispatch = jest.fn()
      render(
        <Provider store={store}>
          <Router history={history}>
            <TeamCard
              name={testCharacter.name}
              id={testCharacter.id}
              image={testCharacter.image}
              alignment={testCharacter.alignment as "good"}
              stats={testStatsNumbers}
            />
          </Router>
        </Provider>
      )
    })
    it("Should dispatch an action on clicking remove button", () => {
      const removeButton = screen.getByText("Remover")
      fireEvent.click(removeButton)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(
        deleteCharacter(testCharacter.id)
      )
    })
    it("Should redirect to character page on clicking details button", () => {
      const detailsButton = screen.getByText("Ver detalle")
      fireEvent.click(detailsButton)
      expect(history.location.pathname).toBe(`/character/${testCharacter.id}`)
    })
    it("Should redirects to character page on clicking image", () => {
      const characterImage = screen.getByAltText(testCharacter.name)
      fireEvent.click(characterImage)
      expect(history.location.pathname).toBe(`/character/${testCharacter.id}`)
    })
  })
  describe("Rendering NaN stats", () => {
    beforeEach(() => {
      store = mockStore({})
      render(
        <Provider store={store}>
          <Router history={history}>
            <TeamCard
              name={testCharacter.name}
              id={testCharacter.id}
              image={testCharacter.image}
              alignment={testCharacter.alignment as "good"}
              stats={testStatsNan}
            />
          </Router>
        </Provider>
      )
    })
    it("Should render a '?' when stats are NaN", () => {
      const stats = screen.getAllByTestId("stat-card-test")
      for (const stat of stats) {
        const statNumber = stat.textContent?.slice(-1)
        expect(statNumber).toBe("?")
      }
    })
  })
  describe("Rendering number stats", () => {
    beforeEach(() => {
      store = mockStore({})
      render(
        <Provider store={store}>
          <Router history={history}>
            <TeamCard
              name={testCharacter.name}
              id={testCharacter.id}
              image={testCharacter.image}
              alignment={testCharacter.alignment as "good"}
              stats={testStatsNumbers}
            />
          </Router>
        </Provider>
      )
    })
    it("Should render number stats", () => {
      const stats = screen.getAllByTestId("stat-card-test")
      for (const stat of stats) {
        const statNumber = stat.textContent?.slice(-1)
        expect(Number(statNumber)).toBe(1)
      }
    })
  })
})
