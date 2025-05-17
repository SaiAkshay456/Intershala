import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../main";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import "../../style/postjob.css";
import { BASE_URL_BACKEND } from "../Services/helper.jsx";
import { ClipLoader } from 'react-spinners';

const PostJob = () => {
    const [title, setTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
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
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    //job categories
    const jobCategories = [
        {
            label: "💻 Technology & Development",
            options: [
                "Full Stack Development",
                "Frontend Development",
                "Backend Development",
                "Web Development",
                "Mobile App Development",
                "Game Development",
                "DevOps & Cloud",
                "AI & Machine Learning",
                "Data Science",
                "Cybersecurity",
                "Blockchain Development",
                "Software Testing / QA",
                "Embedded Systems / IoT"
            ],
        },
        {
            label: "🎨 Design & Creative",
            options: [
                "Graphic & Design",
                "UI/UX Design",
                "Video Animation",
                "Motion Graphics",
                "3D Modeling / Animation",
                "Interior Design",
                "Fashion Design",
                "Illustration",
                "Branding & Identity Design"
            ],
        },
        {
            label: "📈 Marketing & Sales",
            options: [
                "Digital Marketing",
                "Social Media Marketing",
                "Content Marketing",
                "SEO & SEM",
                "Email Marketing",
                "Affiliate Marketing",
                "Sales & Business Development",
                "Copywriting",
                "Market Research",
                "Product Marketing"
            ],
        },
        {
            label: "🧮 Finance & Business",
            options: [
                "Finance & Accounts",
                "Financial Analysis",
                "Investment Banking",
                "Auditing",
                "Taxation",
                "Business Strategy",
                "Consulting",
                "Risk Management",
                "Bookkeeping"
            ],
        },
        {
            label: "🧑‍🏫 Education & Training",
            options: [
                "Teaching",
                "Curriculum Development",
                "Subject Matter Expert",
                "Educational Content Writing",
                "Online Tutoring",
                "Corporate Training",
                "eLearning Development"
            ],
        },
        {
            label: "🌐 IT Support & Admin",
            options: [
                "Technical Support",
                "System Administration",
                "Network Administration",
                "IT Help Desk",
                "Database Administration"
            ],
        },
        {
            label: "📝 Writing & Content",
            options: [
                "Content Writing",
                "Creative Writing",
                "Technical Writing",
                "Blog Writing",
                "Ghostwriting",
                "Editing & Proofreading",
                "Script Writing"
            ],
        },
        {
            label: "📷 Media & Entertainment",
            options: [
                "Photography",
                "Videography",
                "Video Editing",
                "Audio Engineering",
                "Voice-over",
                "Music Production",
                "Journalism"
            ],
        },
        {
            label: "🌍 Other Categories",
            options: [
                "Human Resources",
                "Legal & Compliance",
                "Project Management",
                "Operations Management",
                "Procurement & Supply Chain",
                "Customer Support",
                "Event Management",
                "Public Relations",
                "Travel & Hospitality",
                "Real Estate",
                "Healthcare & Medical",
                "Research & Development",
                "NGO / Non-Profit"
            ],
        }
    ];

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
        await axios.post(`https://careermate-app.onrender.com/api/v1/job/postjob`, fixedSalary.length >= 4 ?
            { companyName, title, category, city, country, location, description, fixedSalary } :
            { companyName, title, category, city, country, location, description, salaryFrom, salaryTo }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setTitle("");
            setCompanyName("");
            setCategory("");
            setCity("");
            setCountry("");
            setLocation("");
            setDescription("");
            setFixedSalary("");
            setSalaryFrom("");
            setSalaryTo("");
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        });
    }
    if (!isAuthorized || (user && user.role !== "Employer")) {
        navigate("/");
    }

    return (<div className="postjob">
        <div className="container py-4">
            <h3 className="text-center mb-4">Post Job</h3>
            <div className="wrapper-p">
                <form onSubmit={handlePostJob}>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        {/* <div className="col-md-6 mb-3">
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
                            </div> */}
                        <div className="col-md-6 mb-3">
                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Job Category</option>
                                {jobCategories.map((group, index) => (
                                    <optgroup key={index} label={group.label}>
                                        {group.options.map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))}
                                    </optgroup>
                                ))}
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
