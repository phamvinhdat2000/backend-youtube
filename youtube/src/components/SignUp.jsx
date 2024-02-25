import React from "react";
import { useNavigate} from "react-router-dom";
import { signUp } from "../services/auth.service";

const SignUp = () => {
 const navigate=useNavigate();
  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Full name
            </label>
            <input type="email" className="form-control" id="fullName" />
          </div>
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
                let full_name = document.getElementById("fullName").value;
                let email = document.getElementById("email").value;
                let pass_word = document.getElementById("pass").value;

                let model = { full_name, email, pass_word };

                (async () => {
                  const resp = await signUp(model);
                  if (!resp) {
                    alert("Bạn đã đăng ký thất bại");
                  } else {
                    alert("Bạn đã đăng ký thành công");
                    navigate("/login");

                  }
                })();
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
