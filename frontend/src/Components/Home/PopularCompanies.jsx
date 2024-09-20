import React from 'react';
import "../../style/popcompanies.css";
import { FaAmazon, FaApple, FaGoogle, FaMicrosoft, FaPaypal } from 'react-icons/fa';
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
    const company = [
        {
            id: 1,
            title: "Microsoft",
            location: "Miyapur, Hyderabad",
            openPosition: 10,
            icon: <FaMicrosoft />
        },
        {
            id: 2,
            title: "Tesla",
            location: "Kondapur, Hyderabad",
            openPosition: 5,
            icon: <SiTesla />
        },
        {
            id: 3,
            title: "Apple",
            location: "Karmanghat, Hyderabad",
            openPosition: 3,
            icon: <FaApple />
        },
        {
            id: 4,
            title: "PayPal",
            location: "Street 4, Kolkata",
            openPosition: 10,
            icon: <FaPaypal />
        },
        {
            id: 5,
            title: "Google",
            location: "Gachibowli, Hyderabad",
            openPosition: 6,
            icon: <FaGoogle />
        },
        {
            id: 6,
            title: "Amazon",
            location: "Barkatpura, Hyderabad",
            openPosition: 12,
            icon: <FaAmazon />
        }
    ];

    return (
        <div className="companies">
            <div className="container">
                <h3 className="text-center mb-4">Popular Companies</h3>
                <div className="row banner-pc">
                    {
                        company.map((element) => (
                            <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={element.id}>
                                <div className="card text-center p-4 d-flex flex-column justify-content-between">
                                    <div className="icon mb-3">{element.icon}</div>
                                    <h4>{element.title}</h4>
                                    <p>{element.location}</p>
                                    <p>Open Positions: {element.openPosition}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default PopularCompanies;
