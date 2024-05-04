import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const GetLoan = () => {
  const [loan, setLoan] = useState({});
  const userID = useSelector((state) => state.user.userId);
  const token = Cookies.get("user_token");

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/loans/createLoan/${userID}`,
        loan,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
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
      <div className="get-loan-container">
        <div className="loan-form">
          <h1>Get Loan</h1>
          <div>
            <label htmlFor="" className="loan-form-label">
              Loan Amount
            </label>
            <input
              type="number"
              name="loanAmount"
              value={loan.loanAmount}
              id=""
              className="loan-form-input"
              placeholder="Enter the loan amount"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="" className="loan-form-label">
              Loan Term (in Weeks)
            </label>
            <input
              type="number"
              name="term"
              value={loan.term}
              id=""
              className="loan-form-input"
              placeholder="Enter Loan term"
              onChange={handleChange}
            />
          </div>
          <button className="loan-form-button" onClick={handleSubmit}>
            Submit Loan Request
          </button>
        </div>
      </div>
    </>
  );
};
export default GetLoan;
