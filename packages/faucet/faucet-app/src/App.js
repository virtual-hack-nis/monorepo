import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Faucet from './faucet-component';
import Admin from './admin-component';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/faucet">
                <h2>Faucet</h2>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <h2>Admin</h2>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Route definitions */}
        <Switch>
          <Route path="/faucet" component={Faucet} />
          <Route path="/about" component={Admin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
