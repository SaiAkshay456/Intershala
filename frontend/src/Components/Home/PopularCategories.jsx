import React from 'react';
import { FaReact } from 'react-icons/fa';
import { MdAccountBalance, MdOutlineAnimation, MdOutlineDesignServices } from 'react-icons/md';
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbAppsFilled } from "react-icons/tb";
// Ensure this file is correctly linked

const PopularCategories = () => {
    const category = [
        {
            id: 1,
            title: "Graphic & Design",
            subTitle: "30+ Openings",
            icon: <MdOutlineDesignServices />
        },
        {
            id: 2,
            title: "Mobile App Development",
            subTitle: "300+ Openings",
            icon: <TbAppsFilled />
        },
        {
            id: 3,
            title: "Video Animation",
            subTitle: "50+ Openings",
            icon: <MdOutlineAnimation />
        },
        {
            id: 4,
            title: "Web Development",
            subTitle: "350+ Openings",
            icon: <FaReact />
        },
        {
            id: 5,
            title: "AI & ML",
            subTitle: "600+ Openings",
            icon: <GiArtificialIntelligence />
        },
        {
            id: 6,
            title: "Finance & Accounts",
            subTitle: "150+ Openings",
            icon: <MdAccountBalance />
        }
    ];

    return (
        <div className="categories">
            <div className="container">
                <h3 className="text-center mb-4">Popular Categories</h3>
                <div className="row banner-p">
                    {
                        category.map((element) => (
                            <div className="col-12 col-md-4 col-lg-2 mb-4" key={element.id}>
                                <div className="card text-center p-4">
                                    <div className="icon mb-3">{element.icon}</div>
                                    <h4>{element.title}</h4>
                                    <p>{element.subTitle}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default PopularCategories;
