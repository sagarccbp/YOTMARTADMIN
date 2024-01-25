import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {createAccount} from "../rest/ApiService";

const SignUpComponent = () => {
  const history = useHistory();
  const state = {
    role: "SUPERADMIN",
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
  };
  const [userData, setUserData] = useState(state);
  const [showMessage, setShowMessage] = useState("");

  function changeHandler(evt) {
    const value = evt.target.value;
    console.log(userData, "ADDRESS");
    if (evt.target.name === "mobileNumber") {
      setUserData({
        ...userData,
        [evt.target.name]: value,
      });
    } else {
      setUserData({
        ...userData,
        [evt.target.name]: value,
      });
    }
  }
  useEffect(() => {
    console.log(userData, "userData");
  }, [userData]);

  const signUp = event => {
    event.preventDefault();
    if (userData) {
      createAccount(userData, result => {
        console.log(result);
        if (result.error) {
          setShowMessage("User credentials not matching");
        } else if (result.message) {
          setShowMessage(result.message);
          setUserData({
            role: "SUPERADMIN",
            fullName: "",
            email: "",
            mobileNumber: "",
            password: "",
          });
          // toast("Successfully Created the Account");
          return (window.location.href = "/");
        }
      });
    }
  };

  return (
    <div id="app">
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
              {showMessage && (
                <div className="alert alert-info alert-dismissible show fade">
                  <div className="alert-body">
                    <button className="close" data-dismiss="alert">
                      <span>&times;</span>
                    </button>
                    {showMessage}
                  </div>
                </div>
              )}
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Create Account</h4>
                </div>

                <div className="card-body">
                  {/* <p className="text-muted">
                    We will send a password through a registered mobile number
                  </p> */}
                  <form onSubmit={signUp}>
                    <div className="form-group">
                      <label htmlFor="cars">Select Role</label>

                      <select
                        name="role"
                        id="roles"
                        className="form-control"
                        value={userData.role}
                        onChange={changeHandler}>
                        <option value="SUPERADMIN">Super Admin</option>
                        <option value="VENDOR">Vendor</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                      <div className="invalid-feedback realfoodcolor">
                        Please fill in your mobile number
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Mobile Number</label>
                      <input
                        id="mobileNumber"
                        type="tel"
                        pattern="^[0-9]*$"
                        className="form-control"
                        name="mobileNumber"
                        value={userData.mobileNumber}
                        tabIndex="2"
                        required
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback realfoodcolor">
                        Please fill in your mobile number
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        tabIndex="2"
                        value={userData.email}
                        required
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback realfoodcolor">
                        Please fill in your Email
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Name</label>
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="fullName"
                        tabIndex="2"
                        value={userData.fullName}
                        required
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback realfoodcolor">
                        Please fill in your Name
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Password</label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        value={userData.password}
                        tabIndex="2"
                        required
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback realfoodcolor">
                        Please fill in your Password
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-default btn-lg btn-block realfoodbgcolor realfoodcolorw"
                        tabindex="4">
                        Create Account
                      </button>
                    </div>
                    <div className="float-right">
                      <a href="/auth/login" className="text-small">
                        Returning customer? Sign in
                      </a>
                    </div>
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
    </div>
  );
};

export default SignUpComponent;
