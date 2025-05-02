import React, { useEffect, useState } from "react";
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

  const initialCategories = [
    'All',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Machine Learning Engineer'
  ];

  const moreCategories = [
    'Data Scientist',
    'UI/UX Designer',
    'DevOps Engineer',
    'Cybersecurity Specialist',
    'Mobile App Developer',
    'Product Manager'
  ];

  const [showMore, setShowMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [query, setQuery] = useState("");
  const [dynamicText, setDynamicText] = useState("Job  ?");

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedCategory === 'All' && query === "") {
      navigate("/job/getalljobs");
    }
    else {
      navigate(`/search?query=${query}${selectedCategory === "All" ? "" : selectedCategory}`);
    }
  };

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/register");
    }

    const interval = setInterval(() => {
      setDynamicText((prev) => (prev === "Job  ?" ? "Internship  ?" : "Job  ?"));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAuthorized]);

  const splitText = (text) => {
    return text.split('').map((letter, index) => (
      <span key={index} className="letter" style={{ animationDelay: `${index * 100}ms` }}>
        {letter}
      </span>
    ));
  };

  return (
    <>
      {isAuthorized && user && user?.role === "JobSeeker" ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="w-full max-w-4xl p-6 bg-white rounded-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-gray-800">
              Find Your {splitText(dynamicText)}
            </h1>

            <form onSubmit={handleSearch} className="flex flex-col items-center gap-4">
              <input
                type="text"
                placeholder="Search for a Job or Internship..."
                className="w-full px-5 py-3 border-2 border-blue-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* <label className="input">
                <input type="search" value={query}
                  onChange={(e) => setQuery(e.target.value)} required placeholder="Search" />
              </label> */}

              <div className="w-full text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">🔍 Filter by Job Category</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {[...initialCategories, ...(showMore ? moreCategories : [])].map((category) => (
                    <label key={category}>
                      <input
                        type="radio"
                        name="jobCategory"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={handleCategoryChange}
                        className="hidden"
                      />
                      <span
                        className={`inline-block px-5 py-2 rounded-full text-sm sm:text-base font-medium cursor-pointer transition-all duration-300 ease-in-out
                    ${selectedCategory === category
                            ? 'bg-indigo-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-indigo-100 hover:text-indigo-700'}
                  `}
                      >
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowMore(!showMore)}
                  className="mt-4 font-medium"
                >
                  {showMore ? 'Show Less' : 'Show More Categories'}
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-success"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      ) : null}


      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;
