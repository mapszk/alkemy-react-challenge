import React, { FC } from "react"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute: FC = ({ children, ...rest }) => {
  if (localStorage.getItem("token") === null) return <Redirect to="login" />
  else return <Route {...rest}>{children}</Route>
}

export default PrivateRoute
