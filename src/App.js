import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Fund from "./pages/Fund";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/fund">
          <Fund />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/donate">
          <Home />
        </Route>
        <Route path="/donation/:id">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
