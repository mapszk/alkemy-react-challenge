import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "src/pages/Login"
import { Container } from "react-bootstrap"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Home from "./pages/Home"
import Character from "./pages/Character"
import NotFound from "./pages/NotFound"
import SearchResults from "./pages/SearchResults"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import { Provider } from "react-redux"
import store from "./store/store"

const App = () => {
  return (
    <Provider store={store}>
      <Container>
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
    </Provider>
  )
}

export default App
