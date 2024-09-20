import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import '../../style/JobDetails.css'; // Custom CSS for responsive letter format

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const { isAuthorized, user } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3030/api/v1/job/${id}`, { withCredentials: true });
                setJob(data.job);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        if (!isAuthorized) {
            navigate("/login");
        } else {
            fetchJobDetails();
        }
    }, [id, isAuthorized, navigate]);

    if (!job) {
        return <p>Loading job details...</p>;
    }

    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="jobdetails-letter-responsive py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="letter-content border rounded shadow-sm p-4 bg-white">
                            <h2 className='text-center'>Job Details</h2>
                            {/* Letter Header */}
                            <div className="letter-header mb-4">
                                <p><strong>{currentDate}</strong></p>
                                <p><strong>Company Address:</strong> {job.location},{job.city},{job.country}</p>
                            </div>

                            {/* Greeting */}
                            <p>Job Seeker</p>

                            {/* Body: Job Details */}
                            <p>
                                We are pleased to inform you about an exciting opportunity at our company. Below are the details of the position:
                            </p>

                            <div className="job-details">
                                <p><strong>Job Title:</strong> {job.title}</p>
                                <p><strong>Category:</strong> {job.category}</p>
                                <p><strong>Description:</strong> {job.description}</p>
                                <p><strong>Posted On:</strong> {new Date(job.postedOn).toLocaleDateString()}</p>
                                <p><strong>Salary:</strong>
                                    {job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`}
                                </p>
                            </div>

                            {/* Conclusion */}
                            <p>
                                If this opportunity interests you, we encourage you to apply by clicking the button below. We look forward to receiving your application.
                            </p>

                            {/* Easy Apply Button */}
                            {/* Closing */}
                            <p className="mt-4">Sincerely,</p>
                            <p><strong>{job.companyName || "Hiring Manager"}</strong></p>

                            {user && user.role !== "Employer" && (
                                <div className="text-right mt-4">
                                    <Link to={`/application/${job._id}`} className="btn btn-primary">
                                        Easy Apply
                                    </Link>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
