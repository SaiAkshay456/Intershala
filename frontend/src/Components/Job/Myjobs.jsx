import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "../../style/myjobs.css"; // Custom CSS for animations
import toast from "react-hot-toast";

const Myjobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3030/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.jobs);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigate("/login");
  }

  const handleEnableEdit = (jobId) => {
    setEditMode(jobId);
  };

  const handleUpdate = async (jobId) => {
    const updateJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:3030/api/v1/job/updatejob/${jobId}`, updateJob, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message)
        setEditMode(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message)
        console.error(err.response.data.message);
      });
  };

  const handleDelete = async (jobId) => {
    await axios
      .delete(`http://localhost:3030/api/v1/job/deletejob/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message)
        setMyJobs((prev) => prev.filter((job) => job._id !== jobId));
      })
      .catch((err) => {
        toast.success(res.data.response.message)
        console.error(err.response.data.message)
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myjob-page container py-4">
      <h3 className="mb-4 animate__animated animate__fadeIn text-center">Jobs Posted</h3>
      {myJobs && myJobs.length > 0 ? (
        <div className="row g-4">
          {myJobs.map((job) => (
            <div
              className="col-md-6 col-lg-4 animate__animated animate__fadeInUp"
            >
              <div className="card p-3 h-100 card-hover" key={job._id}>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={editMode !== job._id}
                      value={job.companyName}
                      onChange={(e) =>
                        handleInputChange(job._id, "companyName", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={editMode !== job._id}
                      value={job.title}
                      onChange={(e) =>
                        handleInputChange(job._id, "title", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Country:</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={editMode !== job._id}
                      value={job.country}
                      onChange={(e) =>
                        handleInputChange(job._id, "country", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">City:</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={editMode !== job._id}
                      value={job.city}
                      onChange={(e) =>
                        handleInputChange(job._id, "city", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Category:</label>
                    <select
                      className="form-select"
                      disabled={editMode !== job._id}
                      value={job.category}
                      onChange={(e) =>
                        handleInputChange(job._id, "category", e.target.value)
                      }
                    >
                      <option value="">Category</option>
                      <option value="Mobile App Development">
                        Mobile App Development
                      </option>
                      <option value="Video Animation">Video Animation</option>
                      <option value="Graphic & Design">Graphic & Design</option>
                      <option value="Web Development">Web Development</option>
                      <option value="AI & ML">AI & ML</option>
                      <option value="Finance & Accounts">
                        Finance & Accounts
                      </option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Salary:</label>
                    {job.fixedSalary ? (
                      <input
                        type="number"
                        className="form-control"
                        disabled={editMode !== job._id}
                        value={job.fixedSalary}
                        onChange={(e) =>
                          handleInputChange(job._id, "fixedSalary", e.target.value)
                        }
                      />
                    ) : (
                      <div className="d-flex gap-2">
                        <input
                          type="number"
                          className="form-control"
                          disabled={editMode !== job._id}
                          value={job.salaryFrom}
                          onChange={(e) =>
                            handleInputChange(job._id, "salaryFrom", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          className="form-control"
                          disabled={editMode !== job._id}
                          value={job.salaryTo}
                          onChange={(e) =>
                            handleInputChange(job._id, "salaryTo", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Location:</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled={editMode !== job._id}
                      value={job.location}
                      onChange={(e) =>
                        handleInputChange(job._id, "location", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Expired:</label>
                    <select
                      className="form-select"
                      disabled={editMode !== job._id}
                      value={job.expired}
                      onChange={(e) =>
                        handleInputChange(job._id, "expired", e.target.value)
                      }
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                      rows="4"
                      className="form-control"
                      disabled={editMode !== job._id}
                      value={job.description}
                      onChange={(e) =>
                        handleInputChange(job._id, "description", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  {editMode === job._id ? (
                    <>
                      <button
                        className="btn btn-success btn-animate"
                        onClick={() => handleUpdate(job._id)}
                      >
                        <FaCheck />
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary btn-animate"
                      onClick={() => handleEnableEdit(job._id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-animate"
                    onClick={() => handleDelete(job._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't posted any jobs.</p>
      )}
    </div>
  );
};

export default Myjobs;
