import React from "react"
import LoginForm from "./LoginForm"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { fireEvent, prettyDOM, wait, waitFor } from "@testing-library/dom"
import { act } from "react-dom/test-utils"
import userEvent from "@testing-library/user-event"
import { Router } from "react-router"
import { createMemoryHistory } from "history"

describe("<LoginForm/>", () => {
  let component
  const history = createMemoryHistory()
  beforeEach(() => {
    component = render(
      <Router history={history}>
        <LoginForm />
      </Router>
    )
  })
  test("Component renders", () => {
    const title = component.getByText("Iniciar sesión")
    expect(component.container).toBeDefined()
    expect(component.container).toContainElement(title)
  })
  describe("Validation", () => {
    test("Emtpy fields", async () => {
      const submitButton = component.getByText("Ingresar")
      fireEvent.click(submitButton)
      await screen.findByText("Ingresa el email")
      await screen.findByText("Ingresa la contraseña")
    })
    test("Validating wrong email format", async () => {
      const submitButton = component.getByText("Ingresar")
      const emailInput = component.getByPlaceholderText("Email")
      fireEvent.change(emailInput, { target: { value: "test" } })
      fireEvent.click(submitButton)
      await screen.findByText("Debes ingresar un email válido")
    })
    test("Validating short password", async () => {
      const submitButton = component.getByText("Ingresar")
      const passwordInput = component.getByPlaceholderText("Password")
      fireEvent.change(passwordInput, { target: { value: "a" } })
      fireEvent.click(submitButton)
      await screen.findByText("La contraseña es muy corta")
    })
  })
  describe("Submitting", () => {
    test("With wrong credentials displays a warning", async () => {
      const submitButton = component.getByText("Ingresar")
      const emailInput = component.getByPlaceholderText("Email")
      const passwordInput = component.getByPlaceholderText("Password")
      fireEvent.change(emailInput, { target: { value: "test@email.com" } })
      fireEvent.change(passwordInput, { target: { value: "password" } })
      fireEvent.click(submitButton)
      await waitFor(() => {
        screen.getByText("Please provide valid email and password")
      })
    })
    test("With valid credentials redirects to home ('/')", async () => {
      const submitButton = component.getByText("Ingresar")
      const emailInput = component.getByPlaceholderText("Email")
      const passwordInput = component.getByPlaceholderText("Password")
      fireEvent.change(emailInput, {
        target: { value: "challenge@alkemy.org" },
      })
      fireEvent.change(passwordInput, { target: { value: "react" } })
      fireEvent.click(submitButton)
      await waitFor(() => {
        expect(history.location.pathname).toBe("/")
      })
    })
  })
})
