import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // For the modal
import "../../style/applications.css";
import { useNavigate } from 'react-router-dom';

const MyApplications = () => {
    const { isAuthorized, user } = useContext(Context);
    const [applications, setApplications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedResume, setSelectedResume] = useState(null);
    const navigate = useNavigate();

    // Fetching applications based on user role
    if (!isAuthorized) {
        navigate("/login")
    }
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const endpoint = user.role === "Employer" ?
                    "http://localhost:3030/api/v1/application/empApplications" :
                    "http://localhost:3030/api/v1/application/jobseekerApplications";
                const { data } = await axios.get(endpoint, { withCredentials: true });
                setApplications(data.applications);
            } catch (err) {
                toast.error(err.response.data.message);
            }
        };
        fetchApplications()
    }, [user.role]);

    // Delete application (for Jobseekers only)
    const deleteApplication = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:3030/api/v1/application/deleteApplication/${id}`, { withCredentials: true });
            toast.success(data.message);
            setApplications((prevApp) => prevApp.filter((app) => app._id !== id));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    // Open Modal to view resume
    const handleResumeView = (resume) => {
        setSelectedResume(resume);
        setShowModal(true);
    };

    // Close modal
    const handleClose = () => setShowModal(false);

    return (
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
                                    <Button variant="info" onClick={() => handleResumeView(app.resume.url)}>
                                        View Resume
                                    </Button>
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

            {/* Modal to View Resume */}
            <Modal show={showModal} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Resume</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedResume ? (
                        <div className="resume-container">
                            <iframe
                                src={selectedResume}
                                className="responsive-iframe"
                                title="Resume"
                            />
                        </div>
                    ) : (
                        <p>No resume available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );





};

export default MyApplications;
