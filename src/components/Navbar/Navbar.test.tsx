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
  let component: any
  beforeEach(() => {
    component = render(
      <Router history={history}>
        <Navbar title={titleText} />
      </Router>
    )
  })
  it("Should render the title, search input and log out button", () => {
    const searchInput = screen.getByPlaceholderText("Buscar personaje...")
    expect(screen.getByText(titleText)).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(screen.getByTestId("test-logoutButton")).toBeInTheDocument()
  })
  it("Should remove token from localStorage and redirect to login when clicking on log out button", () => {
    const logOutButton = screen.getByTestId("test-logoutButton")
    fireEvent.click(logOutButton)
    expect(localStorage.removeItem).toBeCalledTimes(1)
    expect(history.location.pathname).toBe("/login")
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
