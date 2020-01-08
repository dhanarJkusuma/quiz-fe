import React from "react";

import { Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import SignIn from "./containers/Signin";
import Register from "./containers/Register";

const routing = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Dashboard} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={Register}/>
      </div>
    </Router>
  );
};

export default routing;
