import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { login } from "../action/auth";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  function change(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function submit(e) {
    e.preventDefault();
    console.log(formData);
    login({ email, password });
  }
  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={change}
              value={email}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={change}
              value={password}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </Fragment>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
