import React from "react"
import "@testing-library/jest-dom/extend-expect"
import PrivateRoute from "./PrivateRoute"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import { render } from "@testing-library/react"

const testMock = () => <div>Private page</div>

describe("<PrivateRoute/>", () => {
  let component
  const history = createMemoryHistory()
  const redirectPath = "/login"
  beforeEach(() => {
    component = render(
      <Router history={history}>
        <PrivateRoute component={testMock} exact path="/" />
      </Router>
    )
  })
  test("Route checks localstorage", () => {
    expect(localStorage.getItem).toBeCalledWith("token")
    expect(localStorage.getItem()).toBeFalsy()
    expect(history.location.pathname).toBe(redirectPath)
  })
})
