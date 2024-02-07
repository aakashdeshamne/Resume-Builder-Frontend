import { Route, Router,Switch } from 'react-router-dom';
import './App.css';
import AuthState from './context/auth/AuthState';
import { Fragment } from 'react';
import Navbar from './component/layout/Navbar';
import Home from './component/pages/Home';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import PrivateRoute from './component/routing/PrivateRoute';
import Dashboard from './component/pages/Dashboard';

function App() {
  return (
     <AuthState>
      <Router>
        <Fragment>
          <Navbar>
            <div className="container">
              <Switch>
                <Route excat path='/' Component={Home}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                <PrivateRoute exact path="/Dashboard" component={Dashboard}/>
              </Switch>
            </div>
          </Navbar>
        </Fragment>
      </Router>
     </AuthState>
  );
}

export default App;
