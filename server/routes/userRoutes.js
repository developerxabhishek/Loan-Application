import express from "express";
const router = express.Router();
import * as userController from "../controller/userController.js";
import { validateCredentials } from "../middleware/ValidateUserDetails.js";
router.post("/register", validateCredentials,userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
export default router;
