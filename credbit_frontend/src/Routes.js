import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TheHomePage from "./components/TheHomePage";
import TheHeader from "./components/TheHeader";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TheHeader} />
      </Switch>
    </Router>
  );
};

export default Routes;
