import express from "express";
import { register } from "../controllers/userController.js";

const router = express.Router(); //instance of express.router

router.post("/register", register);

export default router;
