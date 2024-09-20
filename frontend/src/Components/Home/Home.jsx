import React, { useEffect } from "react";
import { Context } from "../../main";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isAuthorized);
    if (!isAuthorized) {
      navigate("/register");
    }
  }, [isAuthorized, navigate]);

  return (
    <section className="homePage page">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
};

export default Home;
