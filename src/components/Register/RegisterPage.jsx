import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { userService } from "../../services/user.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        El campo es requerido para continuar
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        El email es invalido
      </div>
    );
  }
};

const firstNameValidation = value => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        El nombre debe de ser mayor a 3 carácteres y menor de 50
      </div>
    );
  }
};

const lastNameValidation = value => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        El apellido debe de ser mayor a 3 carácteres y menor de 50
      </div>
    );
  }
};

const passwordValidation = value => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        La contraseña debe de ser mayor a 8 carácteres y menor de 40
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService.register(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password
      ).then(
        response => {
          const message = response.data?.message ? response.data.message : "Usuario creado correctamente"
            this.setState({
              message: message,
              successful: true
            });
          setInterval(() => {
            this.props.history.push("/profile");
            window.location.reload();
          }, 2000)
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card-login card-container-login">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">Nombre</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required, firstNameValidation]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Apellido</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required, lastNameValidation]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, passwordValidation]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Crear Cuenta</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => { this.checkBtn = c; }}
            />
          </Form>
        </div>
      </div>
    );
  }
}