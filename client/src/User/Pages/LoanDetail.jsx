import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
const LoanDetail = () => {
  const { loanid } = useParams();
  const [loan, setLoan] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [amount, setAmount] = useState("");
  const token = Cookies.get("user_token");
  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const getloan = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/loans/getLoanDetails/${loanid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setLoan(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const payLoan = async () => {
    toggleClass();
    try {
      const res = await axios
        .post(
          `http://localhost:5000/api/loans/processRepayment/${loan._id}`,
          {
            amountPaid: amount,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          toast.success(data.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });

      console.log(res);
    } catch (error) {
      toast.success("Loan Repayment Successfull", {
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

  useEffect(() => {
    getloan();
  }, []);
  return (
    <>
      <div className="loan-detail-container-main">
        <div className="loan-detail-container">
          <div className="loan-detail-item">
            <p>Loan ID</p>
            <p>{loan._id}</p>
          </div>
          <div className="loan-detail-item">
            <p>Loan Amount</p>
            <p>{loan.amount}</p>
          </div>
          <div className="loan-detail-item">
            <p>Loan Term</p>
            <p>{loan.term}</p>
          </div>
          <div className="loan-detail-item">
            <p>Status</p>
            <p>{loan.status}</p>
          </div>
          <div className="loan-detail-item">
            <button className="pay-loan-button" onClick={toggleClass}>
              Pay Loan
            </button>
          </div>
        </div>

        <div className={isActive ? "pay-loan-popup" : "pay-loan-popup-hide"}>
          <h1>Pay Your Loan</h1>
          <label htmlFor="">Enter Your Amount</label>
          <input
            type="number"
            id="payloanamount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <div>
            <button
              className="pay-loan-buttons"
              style={{ backgroundColor: "green" }}
              onClick={payLoan}
            >
              Pay Loan
            </button>

            <button
              className="pay-loan-buttons"
              style={{ backgroundColor: "red" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoanDetail;
