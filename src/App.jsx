import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { userService } from "./services/user.service";

import KeyB from './components/Keyboard';
import Profile from "./components/Profile/ProfilePage";
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = userService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    userService.logout();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/practice"} className="navbar-brand">
            Keyboard Kata
          </Link>
          <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Perfil
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Cerrar Sesión
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Iniciar Sesión
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Registrarse
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route path="/practice" component={KeyB}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route path="/profile" component={Profile}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;