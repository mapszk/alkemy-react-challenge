import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Formik } from "formik"
import { Button, Form } from "react-bootstrap"
import * as Yup from "yup"

interface Values {
  email: string
  password: string
}

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Debes ingresar un email válido")
    .required("Ingresa el email"),
  password: Yup.string()
    .min(3, "La contraseña es muy corta")
    .required("Ingresa la contraseña"),
})

const LoginForm = () => {
  const [submitError, setSubmitError] = useState<string>("")
  const history = useHistory()

  const logIn = async (values: Values, resetForm: any) => {
    await axios
      .post("http://challenge-react.alkemy.org", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        resetForm()
        localStorage.setItem("token", res.data.token)
        history.push("/")
      })
      .catch((err) => {
        setSubmitError(err.response.data.error)
      })
  }

  return (
    <Formik
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        setSubmitError("")
        await logIn(values, resetForm)
        setSubmitting(false)
      }}
      validationSchema={validation}
      initialValues={{ email: "", password: "" }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form
          onSubmit={handleSubmit}
          className="bg-light p-2 p-sm-3 rounded d-grid gap-2"
        >
          <h1 className="text-center">Iniciar sesión</h1>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
            />
          </Form.Group>
          {touched.email && errors.email ? (
            <div className="bg-danger text-white p-1 px-2 rounded">
              {errors.email}
            </div>
          ) : null}
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
            />
          </Form.Group>
          {touched.password && errors.password ? (
            <div className="bg-danger text-white p-1 px-2 rounded">
              {errors.password}
            </div>
          ) : null}
          <Button disabled={isSubmitting} className="mt-2" type="submit">
            {isSubmitting ? "Cargando" : "Ingresar"}
          </Button>
          {submitError.length ? (
            <div className="bg-danger text-center text-white p-1 px-2 rounded">
              {submitError}
            </div>
          ) : null}
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
