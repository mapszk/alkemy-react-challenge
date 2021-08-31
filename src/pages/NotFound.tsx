import React from "react"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

const NotFound = () => {
  const history = useHistory()
  return (
    <div className="min-vh-100 text-center d-flex flex-column justify-content-center align-items-center">
      <h1>Error 404</h1>
      <p>La página que estás buscando no existe</p>
      <Button onClick={() => history.goBack()}>Go back</Button>
    </div>
  )
}

export default NotFound
