import React  from "react";
import ReactFacebookLogin from "react-facebook-login";
import { login, loginByFb } from "../services/auth.service";
import { setLocalStorage } from "../utils";

const Login = () => {

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input type="email" className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                let email = document.querySelector("#email").value;
                let pass_word = document.querySelector("#pass").value;

                let model = { email, pass_word };
                (async () => {
                  let resp = await login(model);
                  if (resp) {
                    setLocalStorage("ACCESS_TOKEN", resp.accessToken);
                    setLocalStorage("REFRESH_TOKEN", resp.refreshToken);
                    window.location.href = "/";
                  } else {
                    alert("đăng nhập thất bại");
                  }
                })();
              }}
            >
              Login
            </button>
            <p></p>
            <ReactFacebookLogin
              appId="1546165879509262"
              autoLoad={false}
              fields="name,email,picture"
              callback={(responseFacebook) => {
                console.log(responseFacebook);
                let { email, id, name } = responseFacebook;
                if (!email) {
                  email = `test${new Date().getTime()}@gmail.com`;
                }
                loginByFb({ email, id, name })
                  .then((result) => {
                    console.log(result);
                    setLocalStorage("ACCESS_TOKEN", result.accessToken);
                    setLocalStorage("REFRESH_TOKEN", result.refreshToken);
                    window.location.href = "/";
                  })
                  .catch((error) => console.log(error));
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
