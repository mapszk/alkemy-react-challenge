import React from "react"
import LoginForm from "./LoginForm"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { fireEvent, waitFor } from "@testing-library/dom"
import { Router } from "react-router"
import { createMemoryHistory } from "history"

describe("<LoginForm/>", () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <LoginForm />
      </Router>
    )
  })
  test("Component renders", () => {
    const title = screen.getByText("Iniciar sesión")
    expect(title).toBeInTheDocument()
  })
  describe("Validation", () => {
    test("Emtpy fields", async () => {
      const submitButton = screen.getByText("Ingresar")
      fireEvent.click(submitButton)
      await screen.findByText("Ingresa el email")
      await screen.findByText("Ingresa la contraseña")
    })
    test("Validating wrong email format", async () => {
      const submitButton = screen.getByText("Ingresar")
      const emailInput = screen.getByPlaceholderText("Email")
      fireEvent.change(emailInput, { target: { value: "test" } })
      fireEvent.click(submitButton)
      await screen.findByText("Debes ingresar un email válido")
    })
    test("Validating short password", async () => {
      const submitButton = screen.getByText("Ingresar")
      const passwordInput = screen.getByPlaceholderText("Password")
      fireEvent.change(passwordInput, { target: { value: "a" } })
      fireEvent.click(submitButton)
      await screen.findByText("La contraseña es muy corta")
    })
  })
  describe("Submitting", () => {
    test("With wrong credentials displays a warning", async () => {
      const submitButton = screen.getByText("Ingresar")
      const emailInput = screen.getByPlaceholderText("Email")
      const passwordInput = screen.getByPlaceholderText("Password")
      fireEvent.change(emailInput, { target: { value: "test@email.com" } })
      fireEvent.change(passwordInput, { target: { value: "password" } })
      fireEvent.click(submitButton)
      await waitFor(() => {
        screen.getByText("Please provide valid email and password")
      })
    })
    test("With valid credentials redirects to home ('/')", async () => {
      const submitButton = screen.getByText("Ingresar")
      const emailInput = screen.getByPlaceholderText("Email")
      const passwordInput = screen.getByPlaceholderText("Password")
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
