import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Employee from "./components/pages/employee"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Employee} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
