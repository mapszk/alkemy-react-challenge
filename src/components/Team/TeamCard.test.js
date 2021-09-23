import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import TeamCard from "./TeamCard"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { fireEvent, prettyDOM } from "@testing-library/dom"
import { deleteCharacter } from "src/store/actionCreators"

const mockStore = configureStore({})
const testStatsNan = {
  intelligence: NaN,
  strength: NaN,
  speed: NaN,
  durability: NaN,
  power: NaN,
  combat: NaN,
}
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
}

describe("<TeamCard/>", () => {
  let component
  let store
  const history = createMemoryHistory()
  describe("Rendering", () => {
    beforeEach(() => {
      store = mockStore({})
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <TeamCard
              name={testCharacter.name}
              id={testCharacter.id}
              image={testCharacter.image}
              alignment={testCharacter.alignment}
              stats={testStatsNumbers}
            />
          </Router>
        </Provider>
      )
    })
    test("Component renders", () => {
      const name = component.getByText(testCharacter.name)
      const alignment = component.getByText("Héroe")
      expect(component.container).toContainElement(name)
      expect(component.container).toContainElement(alignment)
    })
  })
  describe("Buttons actions", () => {
    beforeEach(() => {
      store = mockStore({})
      store.dispatch = jest.fn()
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <TeamCard
              name={testCharacter.name}
              id={testCharacter.id}
              image={testCharacter.image}
              alignment={testCharacter.alignment}
              stats={testStatsNumbers}
            />
          </Router>
        </Provider>
      )
    })
    test("Dispatch an action on clicking remove button", () => {
      const removeButton = component.getByText("Remover")
      fireEvent.click(removeButton)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(
        deleteCharacter(testCharacter.id)
      )
    })
    test("Redirects to character page on clicking details button", () => {
      const detailsButton = component.getByText("Ver detalle")
      fireEvent.click(detailsButton)
      expect(history.location.pathname).toBe(`/character/${testCharacter.id}`)
    })
    test("Redirects to character page on clicking image", () => {
      const characterImage = component.getByAltText(testCharacter.name)
      fireEvent.click(characterImage)
      expect(history.location.pathname).toBe(`/character/${testCharacter.id}`)
    })
  })
  describe("Rendering null stats", () => {
    beforeEach(() => {
      store = mockStore({})
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <TeamCard
              name={testCharacter.name}
              id={testCharacter.id}
              image={testCharacter.image}
              alignment={testCharacter.alignment}
              stats={testStatsNan}
            />
          </Router>
        </Provider>
      )
    })
    test("Rendering NaN stats show an '?'", () => {
      const stats = component.container.querySelectorAll(".list-group-item")
      for (const stat of stats) {
        const statNumber = stat.textContent.slice(-1)
        expect(statNumber).toBe("?")
      }
    })
  })
  describe("Rendering number stats", () => {
    beforeEach(() => {
      store = mockStore({})
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <TeamCard
              name={testCharacter.name}
              id={testCharacter.id}
              image={testCharacter.image}
              alignment={testCharacter.alignment}
              stats={testStatsNumbers}
            />
          </Router>
        </Provider>
      )
    })
    test("Rendering numbers stats", () => {
      const stats = component.container.querySelectorAll(".list-group-item")
      for (const stat of stats) {
        const statNumber = stat.textContent.slice(-1)
        expect(Number(statNumber)).toBe(1)
      }
    })
  })
})
