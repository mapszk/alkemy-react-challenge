import React from "react"
import { Col, Container } from "react-bootstrap"
import LoginForm from "src/components/LoginForm/LoginForm"

const Login = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <Col sm={8} lg={4} className="mx-auto">
        <LoginForm />
      </Col>
    </div>
  )
}

export default Login
