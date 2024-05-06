import express from "express";
const router = express.Router();
import * as loanController from "../controller/loanController.js";
import authenticateJWT from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdminMiddleware.js";


router.use(authenticateJWT);
router.put(
  "/updateLoanStatus/:loanId",
  isAdmin,
  loanController.updateLoanStatus
);
router.get("/getAllLoans", isAdmin, loanController.getAllLoans);
router.post("/createLoan/:userId", loanController.askForLoan);
router.get("/getUserLoans/:userId", loanController.getUserLoans);
router.get("/getLoanDetails/:loanId", loanController.LoanDetails);
router.post("/processRepayment/:loanId", loanController.PayLoan);
export default router;
