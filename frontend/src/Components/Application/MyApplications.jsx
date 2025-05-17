import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from 'react-bootstrap'; // For the modal
import "../../style/applications.css";
import { useNavigate } from 'react-router-dom';
import { BASE_URL_BACKEND } from "../Services/helper.jsx";
import { ClipLoader } from 'react-spinners';


const MyApplications = () => {
    const { isAuthorized, user } = useContext(Context);
    const [applications, setApplications] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetching applications based on user role
    if (!isAuthorized) {
        navigate("/login")
    }
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const endpoint = user.role === "Employer" ?
                    `https://careermate-app.onrender.com/api/v1/application/empApplications` :
                    `https://careermate-app.onrender.com/api/v1/application/jobseekerApplications`;
                const { data } = await axios.get(endpoint, { withCredentials: true });
                setApplications(data.applications);
            } catch (err) {
                toast.error(err.response.data.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchApplications()
    }, [user.role]);

    // Delete application (for Jobseekers only)
    const deleteApplication = async (id) => {
        try {
            const { data } = await axios.delete(`https://careermate-app.onrender.com/api/v1/application/deleteApplication/${id}`, { withCredentials: true });
            toast.success(data.message);
            setApplications((prevApp) => prevApp.filter((app) => app._id !== id));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    // Open Modal to view resum
    return (
        loading ? (
            <div className="text-center">
                <ClipLoader size={50} color={"#000"} loading={loading} />
            </div>
        ) : (
            <div className="container my-4">
                <h2 className="text-center">My Applications</h2>
                <div className="row">
                    {applications.length > 0 ? (
                        applications.map((app) => (
                            <div className="col-md-6 mb-3" key={app._id}>
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <p><strong>Name:</strong> {app.name}</p>
                                        <p><strong>Email:</strong> {app.email}</p>
                                        <p><strong>Phone:</strong> {app.phone}</p>
                                        <p><strong>Address:</strong> {app.address}</p>
                                        <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
                                        <a href={app.resume.url} target="_blank" className="btn btn-primary w-100 text-center" role="button">
                                            Resume
                                        </a>
                                        <h6>{app.jobId}</h6>
                                        {user.role !== "Employer" && (
                                            <Button variant="danger" onClick={() => deleteApplication(app._id)}>
                                                Delete Application
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No applications yet</p>
                    )}
                </div>
            </div>
        )
    );

};

export default MyApplications;

