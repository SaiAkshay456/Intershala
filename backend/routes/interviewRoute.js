import express from "express";
import { isAuthorized } from "../middleware/auth.js";
import { generateQuestions } from "../controllers/generateQuestions.js";

const router = express.Router();

router.route("/generate-questions").post(isAuthorized, generateQuestions);

export default router;