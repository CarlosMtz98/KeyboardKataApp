import React, { Component } from "react";
import { userService } from "../../services/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: userService.getCurrentUser(),
    };
  }

  render() {
    const { currentUser } = this.state;

    if (!currentUser) {
      this.props.history.push("/login");
      window.location.reload();
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>
              {currentUser.name} {currentUser.lastName}
            </strong>
          </h3>
          <p>
            <strong>Email: </strong>
            {currentUser.email}
          </p>
        </header>
        <div className="container text-center">
          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <p className="card-header">Número de katas</p>
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <p className="card-header">Velocidad Máx</p>
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <p className="card-header">Velocidad Promedio</p>
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <p className="card-header">Categoría preferida</p>
                <div className="card-body"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
