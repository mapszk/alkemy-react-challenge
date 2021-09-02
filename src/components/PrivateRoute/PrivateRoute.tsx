import React, { FC } from "react"
import { Redirect, Route } from "react-router-dom"

interface Props {
  component: any
  path: string
  exact?: boolean
}

const PrivateRoute: FC<Props> = ({ component, path, exact }) => {
  if (localStorage.getItem("token") === null) return <Redirect to="/login" />
  else return <Route path={path} component={component} exact={exact} />
}

export default PrivateRoute
