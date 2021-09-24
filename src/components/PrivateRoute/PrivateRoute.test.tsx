import React from "react"
import "@testing-library/jest-dom/extend-expect"
import PrivateRoute from "./PrivateRoute"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import { render } from "@testing-library/react"

const testMock = () => <div>Private page</div>

describe("<PrivateRoute/>", () => {
  const history = createMemoryHistory()
  const redirectPath = "/login"
  beforeEach(() => {
    render(
      <Router history={history}>
        <PrivateRoute component={testMock} exact path="/" />
      </Router>
    )
  })
  it("Should check localstorage", () => {
    expect(localStorage.getItem).toBeCalledWith("token")
    expect(localStorage.getItem("token")).toBeFalsy()
    expect(history.location.pathname).toBe(redirectPath)
  })
})
