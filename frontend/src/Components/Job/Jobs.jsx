import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../../style/jobs.css"; // Assuming you have a separate CSS file for styling
import { BASE_URL_BACKEND } from "../Services/helper.jsx";
import { ClipLoader } from 'react-spinners';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const { isAuthorized } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthorized) {
            navigate("/login");
            return;
        }

        const fetchJobs = async () => {
            try {
                const { data } = await axios.get(`https://careermate-app.onrender.com/api/v1/job/getalljobs`, {
                    withCredentials: true,
                });
                console.log(data.jobs);
                setJobs(data.jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [isAuthorized, navigate]);

    return (loading ? (<div className="text-center">
        <ClipLoader size={50} color={"#000"} loading={loading} />
    </div>) :
        <div className="jobs">
            <div className="container">
                <h3>All Available Jobs</h3>
                <div className="row">
                    {jobs?.length > 0 ? (
                        jobs?.map((job) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" >
                                <div className="card p-4 h-100" key={job._id}>
                                    <h4>{job.title}</h4>
                                    <p>Company :{job.companyName}</p>
                                    <p>Category: {job.category}</p>
                                    <p>Country: {job.country}</p>
                                    <Link to={`/job/${job._id}`} className="btn btn-primary">
                                        Job Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No jobs available at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
