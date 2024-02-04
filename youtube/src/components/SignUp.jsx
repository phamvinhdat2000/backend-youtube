import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { fetchFromAPI, signUpApi } from "../utils/fetchFromAPI";
import { signUp } from "../services/auth.service";

const SignUp = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
 const navigate=useNavigate();
  const { id } = useParams();

  useEffect(() => {}, []);

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
