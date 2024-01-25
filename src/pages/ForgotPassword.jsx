import React from "react";

const ForgotPassword = () => {
  return (
    <div id="app">
      <section className="section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="login-brand">
                <b className="realfoodcolor">RealFoods</b>
                <p style={{fontSize: "10px", color: "#fda900"}}>
                  <b>Food is Medicine</b>
                </p>
                {/* <img
                  src="../assets/img/logo/tron-logo.png"
                  alt="logo"
                  width="100"
                  className="shadow-light rounded-circle"
                /> */}
              </div>

              <div className="card card-primary">
                <div className="card-header">
                  <h4>Forgot Password</h4>
                </div>

                <div className="card-body">
                  <p className="text-muted">
                    We will send a password through a registered mobile number
                  </p>
                  <form>
                    <div className="form-group">
                      <label for="email">Mobile Number</label>
                      <input
                        id="mobile"
                        type="mobile"
                        className="form-control"
                        name="mobile"
                        tabindex="1"
                        required
                        autofocus
                      />
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-default btn-lg btn-block realfoodbgcolor realfoodcolorw"
                        tabindex="4">
                        Forgot Password
                      </button>
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

export default ForgotPassword;
