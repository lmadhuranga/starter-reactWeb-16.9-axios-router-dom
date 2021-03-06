import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import Home from './Pages/home'
import Contacts from './Pages/contacts'
import View from './Pages/view'
import Update from './Pages/update'
import Notfound from './Pages/notfound'
const routing = (
  <Router>
    <div>
      <ul className="nav">
        <li className="nav-item" >
          <NavLink className="nav-link" exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item" >
          <NavLink className="nav-link" activeClassName="active" to="/contacts">
          Contacts
          </NavLink>
        </li>
        <li className="nav-item" >
          <NavLink className="nav-link" activeClassName="active" to="/update">
            New User
          </NavLink>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/view/:id" component={View} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/update/:id?" component={Update} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))