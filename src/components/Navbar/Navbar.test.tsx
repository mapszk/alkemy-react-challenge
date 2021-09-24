import React from "react"
import { render, screen } from "@testing-library/react"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import "@testing-library/jest-dom/extend-expect"
import { fireEvent } from "@testing-library/dom"
import Navbar from "./Navbar"

describe("<Navbar/>", () => {
  const titleText = "Testing"
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <Navbar title={titleText} />
      </Router>
    )
  })
  it("Should render the title and search input", () => {
    expect(screen.getByText(titleText)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("Buscar personaje...")
    ).toBeInTheDocument()
  })
  describe("Navbar location different than '/'", () => {
    beforeAll(() => {
      history.push("/testing")
    })
    afterAll(() => {
      history.push("/")
    })
    it("Should have a 'back' button when location is not home('/')", () => {
      const backButton = screen.getByText("Volver")
      expect(backButton).toBeInTheDocument()
      expect(backButton).toHaveTextContent("Volver")
    })
    it("Should go home on clicking back button", () => {
      const backButton = screen.getByText("Volver")
      fireEvent.click(backButton)
      expect(history.location.pathname).toBe("/")
    })
    it("Should go to search results when typing on input and pressing enter", () => {
      const searchInput = screen.getByPlaceholderText("Buscar personaje...")
      const keyword = "batman"
      fireEvent.change(searchInput, { target: { value: keyword } })
      expect(searchInput).toHaveValue(keyword)
      fireEvent.keyPress(searchInput, { key: "Enter", code: 13, charCode: 13 })
      expect(history.location.pathname).toBe(`/search/${keyword}`)
    })
  })
})
