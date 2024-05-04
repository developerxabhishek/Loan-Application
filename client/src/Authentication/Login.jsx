import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import {
  setLoginStatus,
  setAdminStatus,
  setUserDetails,
} from "../actions/actions";

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      );
      if (res) {
        toast.success("Login Successfull", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      const decodedToken = jwtDecode(res.data.token);

      // var jsonToken = JSON.stringify(decodedToken);
      Cookies.set("user_token", res.data.token);
      if (decodedToken.role === "admin") {
        dispatch(setAdminStatus(true));
        dispatch(setLoginStatus(true));
        dispatch(setUserDetails(decodedToken));
        navigate("/admin");
      } else {
        dispatch(setAdminStatus(false));
        dispatch(setLoginStatus(true));
        dispatch(setUserDetails(decodedToken));
        navigate("/user");
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div class="main-login">
        <div class="left-login">
          <h1>
            Financial
            <br />
            Innovation in one application
          </h1>
          <img
            src="https://raw.githubusercontent.com/mattnicee7/Login-Dark/0600ddf21ff721f98269bab34498679340887a72/witch-animate.svg"
            class="left-login-image"
            alt="Imagem animada"
            height="auto"
          />
        </div>

        <div className="right-login">
          <div className="card-login">
            <h1>LOGIN</h1>
            <div className="textfield">
              <label for="email">Email</label>
              <input
                type="text"
                name="email"
                value={user.email}
                placeholder="Enter Email"
                onChange={handleChange}
              />
            </div>
            <div className="textfield">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                placeholder="Enter Password"
                onChange={handleChange}
              />
            </div>
            <button className="btn-login" onClick={handleSubmit}>
              Login
            </button>
            <div className="btn-plus">
              <p className="btn-cadastre-se">
                Not a member ?
                <span
                  className="span-cadastre-se"
                  onClick={() => {
                    navigate("/register");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
