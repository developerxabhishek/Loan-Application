import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const LoanDetail = () => {
  const [isActive, setIsActive] = useState(false);
  const [loan, setLoan] = useState({});
  const [scheduledRepayments, setScheduledRepayments] = useState([]);
  const [amount, setAmount] = useState("");
  const { loanid } = useParams();
  const token = Cookies.get("user_token");

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  };

  const getLoan = async () => {
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
      setLoan(res.data);
      setScheduledRepayments(res.data.scheduledRepayments || []);
      
    } catch (err) {
      
    }
  };

  const payLoan = async () => {
    toggleClass();
    try {
       await axios
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
      getLoan();
    } catch (error) {
      toast.error(error.message+"  "+ error.response.data.error, {
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
    getLoan();
  }, []);

  return (
    <>
      <div className="loan-detail-container-main">
        <div className="repayment">
          <h1>Scheduled Repayments</h1>
          <table className="loandetailtable">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scheduledRepayments.map((key, index) => {
                return (
                  <tr key={index}>
                    <td data-column="S.No">{index + 1}</td>
                    <td data-column="Amount">{key.amount}</td>
                    <td data-column="Status">{key.status}</td>
                    <td data-column="Date">{formatDate(key.date)}</td>{" "}
                    {/* Convert date to readable format */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
            name="amountPaid"
            value={amount}
            id="payloanamount"
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
              Pay
            </button>
            <button
              className="pay-loan-buttons"
              style={{ backgroundColor: "red" }}
              onClick={toggleClass}
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
