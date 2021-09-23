import React from "react"
import "@testing-library/jest-dom/extend-expect"
import CharacterImage from "./CharacterImage"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { fireEvent } from "@testing-library/dom"
import { addCharacter } from "src/store/actionCreators"

const mockStore = configureStore({})
const testHeroe = {
  id: 1,
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
  weight: 90.5,
  height: 190.5,
  fullName: "Full Name Test",
  aliases: ["Alias1", "Alias2"],
  eyeColor: "Brown",
  hairColor: "Black",
  work: "Business",
}
const testVillain = {
  ...testHeroe,
  alignment: "bad",
}

describe("<CharacterImage/>", () => {
  let component
  let store
  describe("Rendering", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      component = render(
        <Provider store={store}>
          <CharacterImage info={testHeroe} />
        </Provider>
      )
    })
    test("Component renders", () => {
      expect(component.container).toBeDefined()
    })
  })
  describe("With emtpy team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      store.dispatch = jest.fn()
      component = render(
        <Provider store={store}>
          <CharacterImage info={testHeroe} />
        </Provider>
      )
    })
    test("Dispatch an action when clicking on add button", () => {
      const addButton = component.getByText("Agregar")
      fireEvent.click(addButton)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(addCharacter(testHeroe))
    })
  })
  describe("With character in team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [testHeroe],
      })
      store.dispatch = jest.fn()
      component = render(
        <Provider store={store}>
          <CharacterImage info={testHeroe} />
        </Provider>
      )
    })
    test("With character in team add button should be disabled", () => {
      const addButton = component.getByText("Agregado")
      expect(addButton).toBeDisabled()
    })
  })
  describe("With full team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [{}, {}, {}, {}, {}, {}],
      })
      store.dispatch = jest.fn()
      component = render(
        <Provider store={store}>
          <CharacterImage info={testHeroe} />
        </Provider>
      )
    })
    test("When clicking on add button modal warning should be displayed", async () => {
      const addButton = component.getByText("Agregar")
      fireEvent.click(addButton)
      await component.findByText("Solo puedes agregar 6 personajes")
    })
  })
  describe("With 3 characters with good alignment", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [
          { ...testHeroe, id: 2 },
          { ...testHeroe, id: 3 },
          { ...testHeroe, id: 4 },
        ],
      })
      store.dispatch = jest.fn()
      component = render(
        <Provider store={store}>
          <CharacterImage info={testHeroe} />
        </Provider>
      )
    })
    test("When clicking on add button modal warning should be displayed", async () => {
      const addButton = component.getByText("Agregar")
      fireEvent.click(addButton)
      await component.findByText("Solo puedes agregar 3 heroes")
    })
  })
  describe("With 3 characters with bad alignment", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [
          { ...testVillain, id: 2 },
          { ...testVillain, id: 3 },
          { ...testVillain, id: 4 },
        ],
      })
      store.dispatch = jest.fn()
      component = render(
        <Provider store={store}>
          <CharacterImage info={testVillain} />
        </Provider>
      )
    })
    test("When clicking on add button modal warning should be displayed", async () => {
      const addButton = component.getByText("Agregar")
      fireEvent.click(addButton)
      await component.findByText("Solo puedes agregar 3 villanos")
    })
  })
})
