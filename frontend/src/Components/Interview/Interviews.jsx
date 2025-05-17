import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
const Interviews = () => {
    const [interviews, setInterview] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigateTo = useNavigate();

    useEffect(() => {
        fetchInterviews();
    }, []);

    const handleViewDetails = (id) => {
        navigateTo(`/interview-feedback/${id}`)
    }

    const sendWhatsapp = (id) => {
        const link = `https://careermateai.netlify.app/join-interview/${id}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(`Interview Link: ${link}`)}`, '_blank')
    }

    const sendMail = (id) => {
        const link = `https://careermateai.netlify.app/join-interview/${id}`;
        window.open(`mailto:?subject=Interview Invitation&body=Please join using this link: ${encodeURIComponent(link)}`, '_blank')
    }
    const handleCopyLink = (id) => {
        const link = `https://careermateai.netlify.app/join-interview/${id}`;
        navigator.clipboard.writeText(link);
        toast.success("Interview link copied to clipboard!");
    }
    const fetchInterviews = async () => {
        try {
            const { data } = await axios.get("https://careermate-app.onrender.com/api/v1/interview/all/interviews", { withCredentials: true });
            setInterview(data.interviews);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = async (interview_id) => {
        try {
            const { data } = await axios
                .delete(`https://careermate-app.onrender.com/api/v1/interview/delete/${interview_id}`, {
                    withCredentials: true,
                })
            toast.success(data.message)
            console.log(data)
            setInterview((prev) => prev.filter((interview) => interview.interviewId !== interview_id));
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-xl font-semibold mb-6 text-gray-800">Scheduled Interviews</h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <ClipLoader size={40} color={"#4f46e5"} loading={loading} />
                </div>
            ) : interviews.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                    No interviews scheduled
                </div>
            ) : (
                <div className="space-y-4">
                    {interviews.map((item, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg shadow-sm ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} border border-gray-100`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <h2 className="font-medium text-gray-900">
                                        Interview By <span className="text-indigo-600">{item.email}</span>
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-bold uppercase">Job Position:</span> <span className="font-bold uppercase">{item?.jobId?.title || 'N/A'}</span>
                                        </p>
                                    </p>
                                    <p className="text-xs text-gray-700">
                                        <span className="font-bold uppercase">Scheduled: {formatDate(item.createdAt)}</span>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        <span className="font-bold uppercase">Interview Type: {item.interviewType.join(", ")}</span>
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full">
                                        {item.duration} Minutes
                                    </span>
                                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                                        Active
                                    </span>
                                </div>
                            </div>
                            <div className="mt-5 d-flex flex-column flex-sm-row justify-content-end gap-3">
                                <Button
                                    variant="link"
                                    size="sm"
                                    onClick={() => handleViewDetails(item.interviewId)}
                                    className="text-primary p-0 d-flex align-items-center"
                                >
                                    View Analytics
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ms-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Button>
                                <Button
                                    variant="link"
                                    size="sm"
                                    onClick={() => handleDelete(item.interviewId)}
                                    className="text-danger p-0 d-flex align-items-center"
                                >
                                    Remove
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ms-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Button>

                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => sendMail(item.interviewId)}
                                    className="d-flex align-items-center"
                                >
                                    <i className="bi bi-envelope me-2"></i>
                                    Send Email
                                </Button>

                                <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => sendWhatsapp(item.interviewId)}
                                    className="d-flex align-items-center"
                                >
                                    <i className="bi bi-whatsapp me-2"></i>
                                    WhatsApp
                                </Button>
                            </div>
                            <Button
                                variant="light"
                                size="sm"
                                className="border text-primary d-flex align-items-center gap-2 px-3 py-1"
                                onClick={() => handleCopyLink(item?.interviewId)}
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Link size={14} />
                                <span style={{ fontSize: '0.875rem' }}>Copy Interview Link</span>
                            </Button>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Interviews;