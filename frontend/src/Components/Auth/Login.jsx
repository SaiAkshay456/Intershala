import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3030/api/v1/user/login", {
                email, password, role
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(data)
            toast.success(data.message);
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
        <div className="wrapper">
            <h1 className="must">Login Here</h1>
            <form>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <select onChange={(e) => setRole(e.target.value)} value={role}>
                    <option value="" >Role</option>
                    <option value="Employer" >Employee</option>
                    <option value="JobSeeker" >Job Seeker</option>
                </select>
                <button className="btx" onClick={handleLogin}>Login Now</button>
                <div className="member">
                    Not a member? <a href="./register">Register Now</a>
                </div>

            </form>

        </div>
    )
}

export default Login
