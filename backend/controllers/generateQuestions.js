import jobModel from "../models/jobSchema.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Errorhandler } from "../middleware/error.js";
import OpenAI from "openai"


export const generateQuestions = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role === "JobSeeker") {
        return next(new Errorhandler(`${role} cannot access source`, 400));
    }
    const { duration, interviewType, email, jobId } = req.body;
    console.log(req.body);

    if (!email || !duration || !interviewType || !jobId) {
        return next(new Errorhandler("fill the details", 300))
    }

    const job = await jobModel.findById(jobId);
    if (!job) {
        return next(new Errorhandler("no job found", 300))
    }

    let jobDescription = job.description;
    let jobTitle = job.title;

    let PROMPT = `You are an expert technical interviewer.

Generate a set of structured interview questions based on the following candidate and job details:

- Job Title: {{position}}
- Job Description: {{jobDescription}}
- Interview Types: {{interviewTypes}} (e.g., Technical, Behavioral, Problem Solving,Experience)
- Total Interview Duration: {{duration}} minutes

Please return the questions as a JSON array in the following format:

[
  { "question": "Question text here", "answer": "" },
  ...
]

Each question should be concise, relevant to the job role and interview type, and suitable for the candidate's experience level. Distribute questions proportionally across the selected interview types.

Do not include any explanations or extra text — only the JSON array.
`
    const filledPrompt = PROMPT
        .replace('{{position}}', jobTitle)
        .replace('{{jobDescription}}', jobDescription)
        .replace('{{interviewTypes}}', interviewType)
        .replace('{{duration}}', duration);
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.API_REF_KEY,
    })

    const completion = await openai.chat.completions.create({
        // model: "deepseek/deepseek-prover-v2:free",
        model: "qwen/qwen3-30b-a3b:free",
        messages: [
            { role: "user", content: filledPrompt }
        ],
    })
    let finalQuestions = completion.choices[0].message;
    console.log(completion);
    res.status(200).json({
        success: true,
        message: "questions generated!!",
        finalQuestions
    })


})