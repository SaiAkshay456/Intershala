import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const InterviewFeedback = () => {
    const [feedback, setFeedBack] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigateTo = useNavigate();
    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    useEffect(() => {
        fetchFeedBackDetails();
    }, [])
    const { id } = useParams();

    const getBarColor = (value) => {
        if (value >= 4) return 'bg-green-500';
        if (value >= 3) return 'bg-yellow-400';
        return 'bg-red-400';
    };
    const fetchFeedBackDetails = async () => {
        try {
            const { data } = await axios.get(`https://careermate-app.onrender.com/api/v1/interview/interview-feedback/${id}`, { withCredentials: true })
            console.log(data.feedbacksAll);
            setFeedBack(data.feedbacksAll);
        } catch (err) {
            console.log("data feedback error :", err)
        }
        finally {
            setLoading(false);
        }
    }

    const handleToReport = (id) => {
        navigateTo(`/interview-feedback/report/${id}`)
    }
    return (loading ? (<div className="flex justify-center items-center h-64">
        <ClipLoader size={40} color={"#4f46e5"} loading={loading} />
    </div>) :
        < div >
            <div className="max-w-7xl mx-auto px-4 py-10">
                <Container className="text-center my-5">
                    <h2 className="display-4 fw-bold text-primary">
                        <span role="img" aria-label="chart" className="me-2">📊</span>
                        Feedback Dashboard
                    </h2>
                    <p className="text-muted fs-5">Insightful evaluations from your interviewers</p>
                </Container>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feedback.map((item) => (
                        <div key={item._id} className="border border-gray-300 p-5 rounded-xl bg-white">
                            {/* Header */}
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">{item.userName}</h3>
                                <p className="text-sm text-gray-500">{item.userEmail}</p>
                                <span className={`mt-2 inline-block text-xs font-bold px-2 py-1 rounded-full 
                                ${item.considered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {item.considered ? 'Recommended' : 'Not Selected'}
                                </span>
                            </div>

                            {/* Ratings */}
                            <div className="space-y-3">
                                {Object.entries(item.feedback).map(([skill, rating]) => (
                                    <div key={skill}>
                                        <div className="flex justify-between text-sm text-gray-700">
                                            <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1')}</span>
                                            <span>{rating}/10</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div
                                                className={`${getBarColor(rating)} h-2 rounded-full`}
                                                style={{ width: `${(rating / 10) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='space-y-3'>
                                <p className="text-sm text-gray-500">{item.summary}</p>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                                <span>{formatDate(item.createdAt)}</span>
                                <button onClick={() => handleToReport(item._id)} className="text-blue-500 hover:underline text-sm">
                                    Full Report
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default InterviewFeedback




