import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import Login from "src/pages/Login"
import { Container } from "react-bootstrap"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Home from "./pages/Home"
import Character from "./pages/Character"
import NotFound from "./pages/NotFound"
import SearchResults from "./pages/SearchResults"
import TeamContextProvider from "./contexts/TeamContext"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"

const App = () => {
  return (
    <TeamContextProvider>
      <Container className="px-2 px-sm-0">
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/search/:name" component={SearchResults} />
            <PrivateRoute path="/character/:id" component={Character} />
            <Route path="/login" component={Login} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </Container>
    </TeamContextProvider>
  )
}

export default App
