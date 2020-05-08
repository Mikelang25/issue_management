import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Employee from "./components/pages/employee"
import Issues from "./components/pages/issues"
import Login from "./components/pages/login"

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
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/Employees" component={Employee} />
          <PrivateRoute exact path="/Issues" component={Issues} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
