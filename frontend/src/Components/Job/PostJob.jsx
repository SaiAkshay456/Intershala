import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../main";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import "../../style/postjob.css";

const PostJob = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [salaryType, setSalaryType] = useState("default");
    const [fixedSalary, setFixedSalary] = useState("");
    const [salaryFrom, setSalaryFrom] = useState("");
    const [salaryTo, setSalaryTo] = useState("");
    const { isAuthorized, user } = useContext(Context);
    const navigate = useNavigate();

    const handlePostJob = async (e) => {
        e.preventDefault();
        if (salaryType === "Fixed") {
            setSalaryFrom("");
            setSalaryTo("");
        } else if (salaryType === "Ranged") {
            setFixedSalary("");
        } else {
            setSalaryFrom("");
            setSalaryTo("");
            setFixedSalary("");
        }

        await axios.post("http://localhost:3030/api/v1/job/postjob", fixedSalary.length >= 4 ?
            { title, category, city, country, location, description, fixedSalary } :
            { title, category, city, country, location, description, salaryFrom, salaryTo }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setTitle("");
            setCategory("");
            setCity("");
            setCountry("");
            setLocation("");
            setDescription("");
            setFixedSalary("");
            setSalaryFrom("");
            setSalaryTo("");
            toast.success(res.data.message)
        }).catch((err) => toast.error(err.response.data.message));
    }

    if (!isAuthorized || (user && user.role !== "Employer")) {
        navigate("/");
    }

    return (
        <div className="postjob">
            <div className="container py-4">
                <h3 className="text-center mb-4">Post Job</h3>
                <div className="wrapper-p">
                    <form onSubmit={handlePostJob}>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <select
                                    className="form-select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Category</option>
                                    <option value="Mobile App Development">Mobile App Development</option>
                                    <option value="Video Animation">Video Animation</option>
                                    <option value="Graphic & Design">Graphic & Design</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="AI & ML">AI & ML</option>
                                    <option value="Finance & Accounts">Finance & Accounts</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={country}
                                    placeholder="Country"
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={city}
                                    placeholder="City"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={location}
                                    placeholder="Location"
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <select
                                    className="form-select"
                                    value={salaryType}
                                    onChange={(e) => setSalaryType(e.target.value)}
                                >
                                    <option value="default">Salary Type</option>
                                    <option value="Fixed">Fixed Salary</option>
                                    <option value="Ranged">Ranged Salary</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                {salaryType === "default" ? (
                                    <p className="text-danger">Please provide a salary type.</p>
                                ) : salaryType === "Fixed" ? (
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Fixed Salary"
                                        onChange={(e) => setFixedSalary(e.target.value)}
                                    />
                                ) : (
                                    <div className="d-flex">
                                        <input
                                            type="number"
                                            className="form-control me-2"
                                            placeholder="Salary From"
                                            value={salaryFrom}
                                            onChange={(e) => setSalaryFrom(e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={salaryTo}
                                            placeholder="Salary To"
                                            onChange={(e) => setSalaryTo(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-12">
                                <textarea
                                    rows="5"
                                    className="form-control"
                                    value={description}
                                    placeholder="Description"
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                            >
                                Create Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
