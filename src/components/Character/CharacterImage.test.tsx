import React from "react"
import "@testing-library/jest-dom/extend-expect"
import CharacterImage from "./CharacterImage"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { fireEvent } from "@testing-library/dom"
import { addCharacter } from "src/store/actionCreators"
import { CharacterLongData } from "src/types/CharacterLongData"

const mockStore = configureStore()
const testHeroe: CharacterLongData = {
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
const testVillain: CharacterLongData = {
  ...testHeroe,
  alignment: "bad",
}

describe("<CharacterImage/>", () => {
  let store: any
  describe("Rendering", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      render(
        <Provider store={store}>
          <CharacterImage info={testHeroe} />
        </Provider>
      )
    })
    it("Should render the name and button", () => {
      expect(screen.getByAltText(testHeroe.name)).toBeInTheDocument()
      expect(screen.getByText("Agregar")).toBeInTheDocument()
    })
  })
  describe("With emtpy team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [],
      })
      store.dispatch = jest.fn()
      render(
        <Provider store={store}>
          <CharacterImage info={testHeroe} />
        </Provider>
      )
    })
    it("Should dispatch an action when clicking on add button", () => {
      const addButton = screen.getByText("Agregar")
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
      render(
        <Provider store={store}>
          <CharacterImage info={testHeroe} />
        </Provider>
      )
    })
    test("Add button should be disabled", () => {
      const addButton = screen.getByText("Agregado")
      expect(addButton).toBeDisabled()
    })
  })
  describe("With full team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [{}, {}, {}, {}, {}, {}],
      })
      store.dispatch = jest.fn()
      render(
        <Provider store={store}>
          <CharacterImage info={testHeroe} />
        </Provider>
      )
    })
    it("Should display a modal warning when clicking on add button", async () => {
      const addButton = screen.getByText("Agregar")
      fireEvent.click(addButton)
      await screen.findByText("Solo puedes agregar 6 personajes")
    })
  })
  describe("With 3 characters with good alignment in team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [
          { ...testHeroe, id: 2 },
          { ...testHeroe, id: 3 },
          { ...testHeroe, id: 4 },
        ],
      })
      store.dispatch = jest.fn()
      render(
        <Provider store={store}>
          <CharacterImage info={testHeroe} />
        </Provider>
      )
    })
    it("Should display a modal warning and don't add the character", async () => {
      const addButton = screen.getByText("Agregar")
      fireEvent.click(addButton)
      await screen.findByText("Solo puedes agregar 3 heroes")
    })
  })
  describe("With 3 characters with bad alignment in team", () => {
    beforeEach(() => {
      store = mockStore({
        characters: [
          { ...testVillain, id: 2 },
          { ...testVillain, id: 3 },
          { ...testVillain, id: 4 },
        ],
      })
      store.dispatch = jest.fn()
      render(
        <Provider store={store}>
          <CharacterImage info={testVillain} />
        </Provider>
      )
    })
    it("Should display a modal warning and don't add the character", async () => {
      const addButton = screen.getByText("Agregar")
      fireEvent.click(addButton)
      await screen.findByText("Solo puedes agregar 3 villanos")
    })
  })
})
