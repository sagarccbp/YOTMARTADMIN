import React, {useState} from "react";

import {API_SERVER} from "../rest/ApiService";
import {USER_LOGIN} from "../js/ApiEnds";
import {useHistory} from "react-router-dom";
import Loader from "../components/modals/Loader/Loader";
// import {shipRocketLogin} from "../rest/ShiprocketApiService";

export const LoginComponent = props => {
  const [isLoading, setLoading] = useState(false);
  const [state, setState] = React.useState({
    mobileNumber: props.mobileNumber,
    password: props.password,
    remember: false,
    flashMessage: props.flashMessage,
  });

  const history = useHistory();

  function changeHandler(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const signIn = event => {
    // console.log("Inside Sign In ");

    console.log("state", state);
    setLoading(true);
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(state),
    };
    fetch(API_SERVER + USER_LOGIN, requestOptions)
      .then(response => {
        console.log(response);
        if (response.ok) {
          console.log("Inside Ok ");
          return response.json();
        } else {
          throw new Error("Credentials Mismatch");
        }
      })
      .then(data => {
        console.log("Inside dataaa ", data);

        localStorage.setItem("mobile", state.mobileNumber);
        localStorage.setItem("Authorization", data.token);
        localStorage.setItem("name", data.user.fullName);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", data.user.role.name);
        localStorage.setItem("userId", data.user._id);
        console.log(history);
        return (window.location.href = "/");
      })
      .catch(err => {
        if (err) {
          console.log(err);
          window.scrollTo({top: 0, behavior: "smooth"});
          setState({
            flashMessage: "Credentials Missmatching",
          });
        }
      });
    setLoading(false);
  };

  return (
    <div id="app">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="section">
            <div className="container mt-5">
              <div className="row">
                <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                  <div className="login-brand">
                    <b className="realfoodcolor">YOTINDIA</b>
                    {/* <p style={{fontSize: "10px", color: "#fda900"}}>
                      <b>Food is Medicine</b>
                    </p> */}
                    {/* <img
                  src="../assets/img/logo/tron-logo.png"
                  alt="logo"
                  width="100"
                  className="shadow-light rounded-circle"
                /> */}
                  </div>
                  {state.flashMessage && (
                    <div className="alert alert-info alert-dismissible show fade">
                      <div className="alert-body">
                        <button className="close" data-dismiss="alert">
                          <span>&times;</span>
                        </button>
                        {state.flashMessage}
                      </div>
                    </div>
                  )}
                  <div className="card card-primary">
                    <div className="card-header">
                      <h4>Login</h4>
                    </div>

                    <div className="card-body">
                      <form className="needs-validation" onSubmit={signIn}>
                        <div className="form-group">
                          <label htmlFor="mobile">Mobile Number</label>
                          <input
                            id="mobileNumber"
                            type="tel"
                            pattern="^[0-9]*$"
                            className="form-control"
                            name="mobileNumber"
                            tabIndex="2"
                            required
                            onChange={changeHandler}
                          />
                          <div className="invalid-feedback realfoodcolor">
                            Please fill in your mobile number
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="d-block">
                            <label htmlFor="password" className="control-label">
                              Password
                            </label>
                            <div className="float-right">
                              <a
                                href="/auth/forgotPassword"
                                className="text-small">
                                Forgot Password?
                              </a>
                            </div>
                          </div>
                          <input
                            id="password"
                            type="password"
                            className="form-control"
                            name="password"
                            tabIndex="2"
                            required
                            onChange={changeHandler}
                          />
                          <div className="invalid-feedback realfoodcolor">
                            Please fill in your password
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="text"
                              name="remember"
                              className="custom-control-input"
                              tabIndex="3"
                              id="remember"
                              hidden
                              onChange={changeHandler}
                            />
                            <label
                              hidden
                              className="custom-control-label realfoodcolor"
                              htmlFor="remember">
                              Remember Me
                            </label>
                          </div>
                        </div>

                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-default btn-lg btn-block realfoodbgcolor realfoodcolorw"
                            tabIndex="4">
                            Login
                          </button>
                        </div>
                        {/* <div className="float-right">
                          <a href="/auth/signup" className="text-small">
                            New Super Admin? Create Account
                          </a>
                        </div> */}
                      </form>
                    </div>
                  </div>

                  <div className="simple-footer realfoodcolor">
                    Copyright &copy; Prasad 2024
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
