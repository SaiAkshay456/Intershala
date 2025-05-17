import React, { useEffect, useState } from 'react'
import CandidateInterview from './CandidateInterview.jsx'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const JoinInterview = () => {
    const [interviewDetails, setInterviewDetails] = useState({});
    const [jobPosition, setJobPosition] = useState("");
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        agreeTerms: false
    });
    const { id } = useParams();
    useEffect(() => {
        getInterviewDetailsOfEmployee();
    }, [id])

    const getInterviewDetailsOfEmployee = async () => {
        try {
            const { data } = await axios.get(`https://careermate-app.onrender.com/api/v1/interview/join-interview/${id}`)
            console.log(data?.interviewDetails);
            console.log(data?.jobTitle);
            setInterviewDetails(data?.interviewDetails);
            setJobPosition(data?.jobTitle);
            console.log(id);
            if (interviewDetails?.length === 0) {
                toast.error("Incorrect Interview Link")
                return;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <CandidateInterview setFormData={setFormData} formData={formData} interviewDetails={interviewDetails} jobPosition={jobPosition} />
        </div>
    )
}

export default JoinInterview
