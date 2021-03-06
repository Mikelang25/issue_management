import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, HashRouter} from "react-router-dom";
import Employee from "./components/pages/employee"
import Issues from "./components/pages/issues"
import Login from "./components/pages/login"
import Accounting from "./components/pages/accounting"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('authToken') ? (
          <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);


function App() {
  return (
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/Employees" component={Employee} />
          <PrivateRoute exact path="/Issues" component={Issues} />
          <PrivateRoute exact path="/Accounting" component={Accounting} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
