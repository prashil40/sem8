import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/core/Home/Home';
import Signin from './components/user/Signin/Signin';
import Signup from './components/user/Signup/Signup';
import ForgotPassword from './components/user/ForgotPassword/ForgotPassword';
import ResetPassword from './components/user/ResetPassword/ResetPassword';
import AboutUs from './components/core/AboutUs/AboutUs';
import Letters from './components/core/Letters/Letters';
import Pricing from './components/core/Pricing/Pricing';
import Profile from './components/core/Profile/Profile';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/about" exact component={AboutUs}></Route>
        <Route path="/letters" exact component={Letters}></Route>
        <Route path="/pricing" exact component={Pricing}></Route>
        <Route path="/profile" exact component={Profile}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/forgot" exact component={ForgotPassword}></Route>
        <Route path="/reset/:token" exact component={ResetPassword}></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
