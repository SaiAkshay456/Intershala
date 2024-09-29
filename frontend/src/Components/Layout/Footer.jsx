import React from 'react'
import { GrInstagram } from "react-icons/gr";
import { FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer class="bg-dark text-light pt-5 pb-4">
                <div class="container text-center text-md-left">
                    <div class="row text-center text-md-left">
                        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 class="text-uppercase mb-4 font-weight-bold">Job Portal</h5>
                            <p>
                                Connecting employers and job seekers. Find your perfect career match on our platform!
                            </p>
                        </div>

                        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 class="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
                            <p><a href="#" class="text-light" style={{ "text-decoration": "none" }}>Home</a></p>
                            <p><a href="#" class="text-light" style={{ "text-decoration": "none" }}>Jobs</a></p>
                            <p><a href="#" class="text-light" style={{ "text-decoration": "none" }}>Employers</a></p>
                            <p><a href="#" class="text-light" style={{ "text-decoration": "none" }}>Contact</a></p>
                        </div>

                        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 class="text-uppercase mb-4 font-weight-bold">Contact Us</h5>
                            <p><i class="fas fa-home mr-3"></i> 1234 Street, City, Country</p>
                            <p><i class="fas fa-envelope mr-3"></i> support@jobportal.com</p>
                            <p><i class="fas fa-phone mr-3"></i> +123 456 7890</p>
                        </div>

                        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3">
                            <h5 class="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
                            <a href="https://www.instagram.com/imakshay50/" target="_blank" class="text-light me-4"><GrInstagram /></a>
                            <a href="#" class="text-light me-4" target="_blank" ><FaTwitter /></a>
                            <a href="#" class="text-light me-4" target="_blank" ><FaFacebook /></a>
                        </div>
                    </div>

                    <hr class="mb-4" />

                    <div class="row align-items-center">
                        <div class="col-md-7 col-lg-8">
                            <p class="text-center text-md-left">© 2024 Job Portal. All Rights Reserved.</p>
                        </div>

                        <div class="col-md-5 col-lg-4">
                            <div class="text-center text-md-right">
                                <a href="#" class="text-light me-4" target="_blank"><GrInstagram /></a>
                                <a href="#" class="text-light me-4" target="_blank"><FaTwitter /></a>
                                <a href="#" class="text-light me-4" target="_blank"><FaFacebook /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


        </div>
    )
}

export default Footer
