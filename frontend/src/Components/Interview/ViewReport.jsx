import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const ViewReport = () => {
    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetchReportDetails();
    }, [])


    const fetchReportDetails = async () => {
        try {
            const { data } = await axios.get(`https://careermate-app.onrender.com/api/v1/interview/interview-feedback/report/${id}`, { withCredentials: true })
            setReport(data.feed);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>


        </div>
    )
}

export default ViewReport
