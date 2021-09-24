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
  it("Should render a title, email and password input, and submit button", () => {
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument()
    expect(screen.getByText("Ingresar")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
  })
  describe("Validation", () => {
    it("Should display a warning for wrong email and password ", async () => {
      const submitButton = screen.getByText("Ingresar")
      fireEvent.click(submitButton)
      await screen.findByText("Ingresa el email")
      await screen.findByText("Ingresa la contraseña")
    })
    it("Should display a warning for invalid email format", async () => {
      const submitButton = screen.getByText("Ingresar")
      const emailInput = screen.getByPlaceholderText("Email")
      fireEvent.change(emailInput, { target: { value: "test" } })
      fireEvent.click(submitButton)
      await screen.findByText("Debes ingresar un email válido")
    })
    it("Should display a warning for short password", async () => {
      const submitButton = screen.getByText("Ingresar")
      const passwordInput = screen.getByPlaceholderText("Password")
      fireEvent.change(passwordInput, { target: { value: "a" } })
      fireEvent.click(submitButton)
      await screen.findByText("La contraseña es muy corta")
    })
  })
})
