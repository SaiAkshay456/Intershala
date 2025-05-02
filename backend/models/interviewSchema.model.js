import mongoose from "mongoose";
import User from "./user.js";
import jobModel from "./jobSchema.js";
import validator from "validator";

const interviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: validator.isEmail
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobModel",
        required: true
    },
    interviewId: {
        type: String,
    },
    interviewType: {
        type: String,
        rquired: true,
    },
    duration: {
        type: String,
        required: true
    },
    questionList: [
        {
            question: { type: String, required: true },
            answer: { type: String },             // Candidate’s response
        }],

}, { timestamps: true }
)

const interviewModel = mongoose.model("interviewModel", jobSchema);
export default interviewModel;