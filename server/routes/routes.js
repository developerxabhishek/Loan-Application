import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes.js";
import loanRoutes from "./loanRoutes.js";

router.use("/users", userRoutes);
router.use("/loans", loanRoutes);

export default router;
