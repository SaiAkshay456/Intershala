import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';


const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3030/api/v1/user/register", {
                firstName, lastName, email, password, role
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(data)
            toast.success(data.message);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setRole("");
            setIsAuthorized(true);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        if (isAuthorized) {
            navigate("/");
        }

    }, [isAuthorized, navigate]);
    return (
        <>
            <div className="wrapper">
                <h1 className="must">Sign Up</h1>
                <form>
                    <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <select onChange={(e) => setRole(e.target.value)}>
                        <option value="" >Role</option>
                        <option value="Employer" >Employee</option>
                        <option value="JobSeeker" >Job Seeker</option>
                    </select>
                    <button onClick={handleRegister} className="btx">Sign Up</button>
                    <div className="member">
                        Already a member? <a href="./login">Login Here</a>
                    </div>
                </form>
            </div >






        </>
    )
}

export default Register
