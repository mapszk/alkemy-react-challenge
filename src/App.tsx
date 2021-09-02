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

const App = () => {
  return (
    <TeamContextProvider>
      <Container className="px-2 px-sm-0">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/search/:name" component={SearchResults} />
            <Route path="/character/:id" component={Character} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </Container>
    </TeamContextProvider>
  )
}

export default App
