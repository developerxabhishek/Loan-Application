import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import axios from "axios";
const AllUserLoans = () => {
  const [loans, setLoans] = useState([]);
  const userID = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const token = Cookies.get("user_token");
  console.log(loans);
  const getLoans = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/loans/getUserLoans/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      setLoans(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoans();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Total Loan</th>
            <th>Amount Left</th>
            <th>Status</th>
            <th>Loan Details</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((key, index) => {
            return (
              <tr>
                <td data-column="S.No">{index + 1}</td>
                <td data-column="Total Loan">{key.amount}</td>
                <td data-column="Amount Left">{key.amountLeft}</td>
                <td data-column="Status">{key.status}</td>
                <td data-column="Loan Details">
                  <FaEye
                    className="loan-detail-icon"
                    onClick={() => {
                      navigate(`/user/loan-detail/${key.Id}`);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AllUserLoans;
