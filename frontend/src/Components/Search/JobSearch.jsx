import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../../style/jobs.css"; // Assuming you have a separate CSS file for styling
import { BASE_URL_BACKEND } from "../Services/helper.jsx";// For the loader, you can install react-spinners
import { ClipLoader } from 'react-spinners';
const JobSearch = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const { isAuthorized } = useContext(Context);
    const [queryTerm, setQueryTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthorized) {
            navigate("/login");
            return;
        }

        const urlParams = new URLSearchParams(location.search);
        const searchTermOfURL = urlParams.get("query");

        console.log(urlParams);

        const fetchJobs = async () => {
            // searchQuery = urlParams.toString();
            try {
                if (searchTermOfURL) {
                    const searchQuery = urlParams.toString();
                    setQueryTerm(searchQuery);
                    const { data } = await axios.get(`https://careermate-app.onrender.com/api/v1/job/search?${searchQuery}`, {
                        withCredentials: true,
                    });
                    setJobs(data.jobs);
                }
            } catch (err) {
                console.log(err, "message 31");
                // toast.error(err.response.data.message)
            } finally {
                setLoading(false); // Stop loading once the data is fetched
            }
        };

        fetchJobs();
    }, [isAuthorized, navigate]);

    return (
        <div className="jobs">
            <div className="container">
                <h3>All Available Jobs</h3>
                <div className="row">
                    {loading ? (
                        <div className="text-center">
                            <ClipLoader size={50} color={"#000"} loading={loading} />
                        </div>
                    ) : jobs?.length > 0 ? (
                        jobs?.map((job) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={job._id}>
                                <div className="card p-4 h-100">
                                    <h4>{job.title}</h4>
                                    <p>Company: {job.companyName}</p>
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

export default JobSearch;
