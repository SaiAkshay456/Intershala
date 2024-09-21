import React, { useContext, useEffect } from 'react'
import './App.css'
import Login from "./Components/Auth/Login";
import Register from './Components/Auth/Register';
import Home from './Components/Home/Home';
import HeroSection from './Components/Home/HeroSection';
import HowItWorks from './Components/Home/HowItWorks';
import PopularCategories from './Components/Home/PopularCategories';
import PopularCompanies from './Components/Home/PopularCompanies';
import Myjobs from './Components/Job/Myjobs';
import JobDetails from './Components/Job/JobDetails';
import Jobs from './Components/Job/Jobs';
import PostJob from './Components/Job/PostJob';
import Application from './Components/Application/Application';
import MyApplications from './Components/Application/MyApplications';
import ResumeModal from './Components/Application/ResumeModal';
import Footer from "./Components/Layout/Footer"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { Context } from './main';
import axios from 'axios';
import NotFound from './Components/NotFound/NotFound';
import NavBar from './Components/Layout/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/v1/user/getuser", { withCredentials: true })
        setUser(response.data.user);
        setIsAuthorized(true);
      }
      catch (error) {
        setIsAuthorized(false);
      }
    }
    fetchuser();
  }, [isAuthorized])


  return (
    <>
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/job/getalljobs" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/job/postjob" element={<PostJob />} />
            <Route path="/job/getmyjobs" element={<Myjobs />} />
            <Route path="/application/:id" element={<Application />} />
            <Route path="/application/me" element={<MyApplications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {isAuthorized ? <Footer /> : <></>
          }
        </Router>
      </div>
      <Toaster />



    </>
  )
}

export default App
