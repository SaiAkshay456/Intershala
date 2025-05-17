import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BASE_URL_BACKEND } from "../Services/helper.jsx";
// Make sure to import the CSS if not using CDN in your HTML file

const Application = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleResume = (e) => {
        const resume = e.target.files[0];
        console.log(resume);
        setResume(resume);
    }

    const { id } = useParams();

    const handleApplication = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("phone", phone);
        formdata.append("address", address);
        formdata.append("coverLetter", coverLetter);
        formdata.append("resume", resume);
        formdata.append("jobId", id);

        console.log(id);

        try {
            const { data } = await axios.post(`https://careermate-app.onrender.com/api/v1/application/post`, formdata, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Application posted successfully:", data);
            console.log(data.application);
            if (data.finalScore < 70) {
                toast.error(`Resume rejected due to low match. Try improving your resume.`);
                navigate("/job/getalljobs");
                return;
            } else {
                toast.success(`✅ - Great match! High chance of getting shortlisted.`);
                toast.success(data.message);
            }
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
            setResume(null);
            setCoverLetter("");
            navigate("/job/getalljobs");
            setLoading(false);

        } catch (err) {
            // console.log(err);
            setLoading(false);
            console.error("Error posting application:", err.response?.data || err.message);
        }
    };


    return (
        <div className="application py-5">
            <div className="container animate__animated animate__fadeInUp">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 animate__animated animate__zoomIn">
                        <h2 className="text-center mb-4">Post Application</h2>
                        <form onSubmit={handleApplication} className="bg-light p-4 shadow-sm rounded">
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    className="form-control"
                                    placeholder='Name'
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    value={phone}
                                    className="form-control"
                                    placeholder='Phone'
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    value={address}
                                    className="form-control"
                                    placeholder='Address'
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    className="form-control"
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <textarea
                                    value={coverLetter}
                                    className="form-control"
                                    placeholder='Cover letter'
                                    rows="4"
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                // required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleResume}
                                    placeholder='Resume'
                                    accept="application/pdf"
                                    style={{ width: "100%" }}
                                    required
                                />
                            </div>
                            <button type="submit" className='btn btn-success w-100 animate__animated animate__pulse animate__infinite'>Send Application</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Application;
