import "./Admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  setAdminStatus,
  setLoginStatus,
  setUserDetails,
} from "../actions/actions";
const User = () => {
  const [isActive, setIsActive] = useState(false);
  const [taskId, setTaskid] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get("user_token");
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLogin = useSelector((state) => state.isLogin);
  const toggleClass = () => {
    setIsActive(!isActive);
  };
  const Logout = async () => {
    try {
      Cookies.remove("user_token");
      const res = await axios.post("http://localhost:5000/api/users/logout");
      dispatch(setAdminStatus(false));
      dispatch(setLoginStatus(false));
      dispatch(setUserDetails(""));
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
      navigate("/");
      
    } catch (error) {
      
    }
  };

  const updateTaskStatus = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/loans/updateLoanStatus/${taskId}`,
        {
          newStatus: updatedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(` ${res.status}  ${res.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      toggleClass();
      getLoans();
    } catch (err) {
      toast.error(` ${err}  ${err.response.data.error}`, {
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

  const getLoans = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/loans/getAllLoans`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoans(res.data);
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getLoans();
  }, []);

  if (isAdmin === true && isLogin === true) {
    return (
      <>
        <div className="alltaskdiv">
          <div className="user-container-main">
            <div className="user">
              <div className="user-nav">
                <h1>QuickCredit</h1>
                <p>
                  <IoIosLogOut className="logout-button" onClick={Logout} />
                </p>
              </div>
              <div className="user-task">
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Term</th>
                      <th>Status</th>
                      <th>Change Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((key, index) => {
                      return (
                        <tr>
                          <td data-column="S.No">{index + 1}</td>
                          <td data-column="Name">{key.fullName}</td>
                          <td data-column="Amount">{key.amount}</td>
                          <td data-column="Term">{key.term}</td>

                          <td data-column="Status">{key.status}</td>
                          <td
                            data-column="Change Status"
                            onClick={() => {
                              setTaskid(key._id);
                              toggleClass();
                            }}
                          >
                            <MdEditSquare
                              className="update-task"
                              style={{ color: "black" }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className={
                isActive ? "confirmation-box" : "confirmation-box-hide"
              }
              style={{ height: "180px" }}
            >
              <h2>Confirm Please</h2>
              <hr size="1" color="brown" />
              <p>Do you Really want to update the status of this Loan ? </p>
              <div className="input_container">
                <label>Status : </label>
                <br />
                <select
                  name="status"
                  id="isAdmin"
                  value={updatedStatus}
                  onChange={(e) => {
                    setUpdatedStatus(e.target.value);
                  }}
                  style={{ height: "30px" }}
                >
                  <option value="PENDING" style={{ color: "orange" }}>
                    Pending
                  </option>
                  <option value="APPROVED" style={{ color: "green" }}>
                    APPROVED
                  </option>
                  <option value="REJECTED" style={{ color: "red" }}>
                    REJECTED
                  </option>
                </select>
              </div>
              <div className="confirmation-box-buttons">
                <button
                  style={{ backgroundColor: "green" }}
                  onClick={updateTaskStatus}
                >
                  Yes
                </button>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={toggleClass}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/");
  }
};
export default User;
