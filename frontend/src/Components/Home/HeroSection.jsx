import React from 'react';
import { FaSuitcase, FaBuilding, FaUsers, FaUserPlus } from "react-icons/fa";
// Custom CSS for additional styling

const HeroSection = () => {
    const details = [
        {
            id: 1,
            title: 1234,
            subTitle: "Live Jobs",
            icon: <FaSuitcase />
        },
        {
            id: 2,
            title: 322,
            subTitle: "Companies",
            icon: <FaBuilding />
        },
        {
            id: 3,
            title: 2456,
            subTitle: "Job Seekers",
            icon: <FaUsers />
        },
        {
            id: 4,
            title: 2498,
            subTitle: "Employers",
            icon: <FaUserPlus />
        }
    ];

    return (
        <>
            <div className='heroSection'>
                <div className='container'>
                    <div className='row align-items-center'>
                        {/* Hero Text Section */}
                        <div className='col-12 col-md-6 title'>
                            <h1>Your career starts here.</h1>
                            <h1>Apply with ease, land with confidence</h1>
                            <p>
                                Welcome to Internshala, your go-to platform for finding the job that
                                perfectly aligns with your skills, passions, and career goals. Whether
                                you're just starting out or looking for the next big step in your professional journey,
                                we connect you with opportunities from top employers across industries. With an easy-to-use interface and
                                personalized job recommendations, finding the right role has never been easier.
                            </p>
                        </div>
                        {/* Hero Image Section */}
                        <div className='col-12 col-md-6 image-h'>
                            <img src="job2.jpg" alt="herosection" className="img-fluid rounded" />
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="row details mt-5">
                        {details.map((element) => (
                            <div className="col-6 col-md-3 mb-4" key={element.id}>
                                <div className="card text-center p-3">
                                    <div className='icon mb-3'>{element.icon}</div>
                                    <div className="content">
                                        <p className="stat-title">{element.title}</p>
                                        <p className="stat-subTitle">{element.subTitle}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection;
