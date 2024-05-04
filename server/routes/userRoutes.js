import express from "express";
const router = express.Router();
import * as userController from "../controller/userController.js";

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

export default router;
