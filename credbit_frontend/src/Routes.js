import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/core/Home/Home';
import Signin from './components/user/Signin/Signin';
import Signup from './components/user/Signup/Signup';
import ForgotPassword from './components/user/ForgotPassword/ForgotPassword';
import ResetPassword from './components/user/ResetPassword/ResetPassword';
import AboutUs from './components/core/AboutUs/AboutUs';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={AboutUs} />
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/forgot" exact component={ForgotPassword}></Route>
        <Route path="/reset" exact component={ResetPassword}></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
