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
    test("Component renders", () => {
      const name = screen.getByText(testCharacter.name)
      const alignment = screen.getByText("Héroe")
      expect(name).toBeInTheDocument()
      expect(alignment).toBeInTheDocument()
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
    test("Dispatch an action on clicking remove button", () => {
      const removeButton = screen.getByText("Remover")
      fireEvent.click(removeButton)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(
        deleteCharacter(testCharacter.id)
      )
    })
    test("Redirects to character page on clicking details button", () => {
      const detailsButton = screen.getByText("Ver detalle")
      fireEvent.click(detailsButton)
      expect(history.location.pathname).toBe(`/character/${testCharacter.id}`)
    })
    test("Redirects to character page on clicking image", () => {
      const characterImage = screen.getByAltText(testCharacter.name)
      fireEvent.click(characterImage)
      expect(history.location.pathname).toBe(`/character/${testCharacter.id}`)
    })
  })
  describe("Rendering null stats", () => {
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
    test("Rendering NaN stats show an '?'", () => {
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
    test("Rendering numbers stats", () => {
      const stats = screen.getAllByTestId("stat-card-test")
      for (const stat of stats) {
        const statNumber = stat.textContent?.slice(-1)
        expect(Number(statNumber)).toBe(1)
      }
    })
  })
})
