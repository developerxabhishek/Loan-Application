import Login from "./Authentication/Login";
import Home from "./Home/Home";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserLayout from "./User/UserLayout";
import AdminLayout from "./Admin/AdminLayout";
import Registration from "./Authentication/Registration";
import HomeLayout from "./Home/HomeLayout";
import GetLoan from "./User/Pages/GetLoan";
import AllUserLoans from "./User/Pages/AllUserLoans";
import LoanDetail from "./User/Pages/LoanDetail";
import ErrorPage from "./components/ErrorPage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<AllUserLoans />} />
          <Route path="/user/all-user-loan" element={<AllUserLoans />} />
          <Route path="/user/get-loan" element={<GetLoan />} />
          <Route path="/user/loan-detail/:loanid" element={<LoanDetail />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default App;
