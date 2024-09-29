import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../../main';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import axios from "axios";

const NavBar = () => {

    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:3030/api/v1/user/logout", { withCredentials: true })
            toast.success(response.data.message)
            console.log("logged out");
            setIsAuthorized(false);
            navigateTo("/login");
        }
        catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            setIsAuthorized(true);
        }
    }
    const renderUserFields = () => {
        if (user && user?.role === 'Employer') {
            return (
                <>
                    <Nav.Link as={Link} to="/application/me" className="text-white">Applicant's Appliccation</Nav.Link>
                    <Nav.Link as={Link} to="/job/postjob" className="text-white">Post Job</Nav.Link>
                    <Nav.Link as={Link} to="/job/getmyjobs" style={{ color: 'white' }}>View Your Jobs</Nav.Link>

                </>
            );
        } else if (user && user?.role === 'JobSeeker') {
            return (
                <>
                    <Nav.Link as={Link} to="/application/me" style={{ color: 'white' }}>My Applications</Nav.Link>
                    <Nav.Link as={Link} to="/job/getalljobs" className="text-white">All Jobs</Nav.Link>

                </>
            );
        }
        return null;
    };

    return (
        <>
            {isAuthorized ? (<Navbar expand="lg" style={{ background: '#009688' }} >
                <Container>
                    <Navbar.Brand as={Link} to="/" className="text-white">Internshala</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
                            <Nav.Link as={Link} to="/about" className="text-white">Contact Us</Nav.Link>
                            {renderUserFields()}

                        </Nav>
                        <Button variant="outline-light" onClick={handleLogout} className="ms-auto">LOGOUT</Button>

                    </Navbar.Collapse>
                </Container>
            </Navbar>) : (<></>)}

        </>
    )
}

export default NavBar
