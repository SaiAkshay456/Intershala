import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
// Include your custom CSS file

const HowItWorks = () => {
  return (
    <>
      <div className="howItWorks">
        <div className="container">
          <h3>How Internshala Works ?</h3>
          <div className="row banner">
            <div className="col-12 col-md-4 mb-4 mb-md-0">
              <div className="card text-center p-4">
                <FaUserPlus className="icon mb-3" />
                <h4>Create Account</h4>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem eius quam quas officiis repellat architecto error
                  alias odit?
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4 mb-4 mb-md-0">
              <div className="card text-center p-4">
                <MdFindInPage className="icon mb-3" />
                <h4>Find a Job/Post a Job</h4>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem eius quam quas officiis repellat architecto error
                  alias odit?
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card text-center p-4">
                <IoMdSend className="icon mb-3" />
                <h4>Apply and Connect</h4>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem eius quam quas officiis repellat architecto error
                  alias odit?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
