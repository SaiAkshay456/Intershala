import axios from 'axios';
import { useState } from 'react';
import { Container, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
function InterviewForm({ goToNext, formData, setFormData }) {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        formData["jobId"] = id;
        if (formData.interviewType.length === 0) {
            toast.error("select interview type");
            return;
        }
        goToNext();
        // Submit logic here
    };
    return (
        (<Container className="min-vh-100 d-flex align-items-center justify-content-center py-3">
            <Card className="w-100 shadow" style={{ maxWidth: '600px', border: 'none' }}>
                <Card.Body className="p-4">
                    <h2 className="text-center mb-3 fw-bold" style={{ color: '#009688' }}>Create Interview</h2>

                    <Form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-medium">Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"  // Changed from "name" to "email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="py-2"
                                required
                            />
                        </Form.Group>

                        {/* Duration Field */}
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-medium">Duration</Form.Label>
                            <Form.Control
                                type="number"  // Changed from "text" to "number"
                                name="duration"  // Changed from "name" to "duration"
                                min="15"
                                max="120"
                                value={formData.duration}
                                onChange={handleChange}
                                className="py-2"
                                placeholder="e.g., 30"
                                required
                            />
                            <Form.Text className="text-muted">
                                Please enter duration in minutes (15-120)
                            </Form.Text>
                        </Form.Group>

                        {/* Interview Type Selection */}
                        {formData.interviewType.length === 0 && (
                            <div className="text-danger mt-2">* Please select interview type</div>
                        )}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium d-block mb-3">Select Interview Type</Form.Label>
                            <div className="d-flex flex-wrap">  {/* Replaced ButtonGroup with div for better control */}
                                {['Technical', 'Behavioral', 'Experience', 'Problem Solving'].map((pref) => (
                                    <Button
                                        key={pref}
                                        variant={formData.interviewType.includes(pref) ? "primary" : "outline-primary"}
                                        onClick={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                interviewType: prev.interviewType.includes(pref)
                                                    ? prev.interviewType.filter(p => p !== pref)
                                                    : [...prev.interviewType, pref]
                                            }));
                                        }}
                                        className="m-1 rounded"
                                    >
                                        {pref}
                                    </Button>
                                ))}
                            </div>
                        </Form.Group>

                        {/* Submit Button */}
                        <div className="d-flex justify-content-between mt-3">
                            <Button
                                style={{ background: '#009688' }}
                                type="submit"
                                className="w-100 mt-2 py-2 fw-bold"
                            >
                                Generate Questions
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>)
    );
}

export default InterviewForm;