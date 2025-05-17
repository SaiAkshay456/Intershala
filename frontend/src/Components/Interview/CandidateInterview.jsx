import React, { useContext, useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, ListGroup } from 'react-bootstrap';
import { PersonFill, EnvelopeFill, MicFill, CameraVideoFill, LightbulbFill, Headphones } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import { CiVideoOn } from "react-icons/ci";
import { InterviewContext } from '../../main.jsx';
import { useNavigate } from 'react-router-dom';

const CandidateInterview = ({ setFormData, formData, interviewDetails, jobPosition }) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { interviewInfo, setInterviewInfo } = useContext(InterviewContext);
    const { id } = useParams();
    const navigateTo = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.agreeTerms) newErrors.agreeTerms = 'You must accept the terms';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (interviewInfo && Object.keys(interviewInfo).length > 0) {
            console.log(interviewInfo);
            navigateTo("/join-interview/" + "start/" + id);
        }
    }, [interviewInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            setInterviewInfo({
                userName: formData?.fullName,
                userEmail: formData?.email,
                questions: interviewDetails?.questionList,
                jobPosition: jobPosition
            });
            // Handle form submission (API call, etc.)
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}> {/* Reduced from md={8} lg={6} */}
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Join Your Interview</h2>
                                <p>{interviewDetails.duration} minutes</p>
                                <p>{jobPosition}</p>
                                <p className="text-muted">Please enter your details to continue</p>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label><PersonFill className="me-2" />Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.fullName}
                                        placeholder="John Doe"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label><EnvelopeFill className="me-2" />Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        placeholder="john@example.com"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Interview Preparation Checklist */}
                                <Card className="mb-4 bg-light border-0">
                                    <Card.Body>
                                        <h5 className="fw-bold mb-3"><Headphones className="me-2" />Interview Preparation</h5>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="bg-transparent py-2">
                                                <MicFill className="text-primary me-2" />
                                                <strong>Audio:</strong> Ensure your microphone is working and unmuted
                                            </ListGroup.Item>
                                            <ListGroup.Item className="bg-transparent py-2">
                                                <CameraVideoFill className="text-primary me-2" />
                                                <strong>Video:</strong> Camera must be turned on throughout
                                            </ListGroup.Item>
                                            <ListGroup.Item className="bg-transparent py-2">
                                                <LightbulbFill className="text-primary me-2" />
                                                <strong>Lighting:</strong> Sit in a well-lit area facing the light
                                            </ListGroup.Item>
                                            <ListGroup.Item className="bg-transparent py-2">
                                                <i className="bi bi-wifi text-primary me-2"></i>
                                                <strong>Internet:</strong> Use stable connection (avoid public Wi-Fi)
                                            </ListGroup.Item>
                                            <ListGroup.Item className="bg-transparent py-2">
                                                <i className="bi bi-clock text-primary me-2"></i>
                                                <strong>Timing:</strong> Join 5 minutes before scheduled time
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>

                                <Form.Group className="mb-4">
                                    <Form.Check
                                        type="checkbox"
                                        name="agreeTerms"
                                        label="I confirm I've reviewed the technical requirements above"
                                        checked={formData.agreeTerms}
                                        onChange={handleChange}
                                        isInvalid={!!errors.agreeTerms}
                                    />
                                    {errors.agreeTerms && (
                                        <div className="text-danger small mt-1">{errors.agreeTerms}</div>
                                    )}
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 py-2 d-flex align-items-center justify-content-center gap-2 fs-6 fs-md-5"
                                    disabled={isSubmitting}
                                >
                                    <CiVideoOn className="fs-5" />
                                    {isSubmitting ? 'Processing...' : 'Join Interview Now'}
                                </Button>
                            </Form>

                            <div className="text-center mt-3 text-muted small">
                                <p>Having trouble? <a href="/support">Contact support</a></p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CandidateInterview;