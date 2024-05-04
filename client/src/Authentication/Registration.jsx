import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const GetLoan = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        user
      );

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
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
            The
            <br />
            Ultimate Banking Wallet..
          </h1>
          <img
             src="https://raw.githubusercontent.com/mattnicee7/Login-Dark/0600ddf21ff721f98269bab34498679340887a72/witch-animate.svg"
            class="left-login-image"
            alt="images"
            height="auto"
          />
        </div>

        <div className="right-login">
          <div className="card-login">
            <h1>REGISTER</h1>
            <div className="textfield">
              <label for="fullName">Name</label>
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                placeholder="Enter Name"
                onChange={handleChange}
              />
            </div>
            <div className="textfield">
              <label for="mobile">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={user.mobile}
                placeholder="Enter Mobile Number"
                onChange={handleChange}
              />
            </div>
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
              Register
            </button>
            <div className="btn-plus">
              <p className="btn-cadastre-se">
                Already a member ?
                <span
                  className="span-cadastre-se"
                  onClick={() => {
                    navigate("/login");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetLoan;
