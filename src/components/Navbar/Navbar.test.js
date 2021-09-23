import React from "react"
import { render } from "@testing-library/react"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import "@testing-library/jest-dom/extend-expect"
import { fireEvent } from "@testing-library/dom"
import Navbar from "./Navbar"

describe("<Navbar/>", () => {
  let component
  const titleText = "Testing"
  const history = createMemoryHistory()
  beforeEach(() => {
    component = render(
      <Router history={history}>
        <Navbar title={titleText} />
      </Router>
    )
  })
  test("Navbar render", () => {
    expect(component.container).toBeDefined()
  })
  test("Navbar render title", () => {
    const title = component.getByText(titleText)
    expect(component.container).toContainElement(title)
    expect(title).toHaveTextContent(titleText)
  })

  describe("Navbar location different than '/'", () => {
    beforeAll(() => {
      history.push("/testing")
    })
    afterAll(() => {
      history.push("/")
    })
    test("Navbar has 'back' button when location is not home('/')", () => {
      const backButton = component.getByText("Volver")
      expect(component.container).toContainElement(backButton)
      expect(backButton).toHaveTextContent("Volver")
    })
    test("When clicking on back button location goes to home('/')", () => {
      const backButton = component.getByText("Volver")
      fireEvent.click(backButton)
      expect(history.location.pathname).toBe("/")
    })
    test("When typing on input and pressing enter location goes to search results", () => {
      const searchInput = component.getByPlaceholderText("Buscar personaje...")
      const keyword = "batman"
      fireEvent.change(searchInput, { target: { value: keyword } })
      expect(searchInput).toHaveValue(keyword)
      fireEvent.keyPress(searchInput, { key: "Enter", code: 13, charCode: 13 })
      expect(history.location.pathname).toBe(`/search/${keyword}`)
    })
  })
})
