import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Alert, Form } from 'react-bootstrap';
import { CheckCircleFill, Link45deg, Clipboard } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
const InterviewLink = ({ interviewId, formData }) => {
    const [copied, setCopied] = useState(false);
    // This would typically come from your backend/state
    let url = "https://careermateai.netlify.app/join-interview/" + interviewId;
    const navigate = useNavigate();
    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleClick = () => {
        navigate("/job/getmyjobs");
    }
    const getUrl = () => {
        return url;
    }

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm border-0 text-center">
                        <Card.Body className="p-3 text-center">
                            <div className="text-center"> {/* Wrapper div for centering */}
                                <CheckCircleFill
                                    className="text-success mb-3"
                                    style={{ fontSize: '3rem' }}
                                /></div>

                            <h3 className="mb-2 fw-bold">Interview Ready!</h3>
                            <p className="text-muted mb-3 small">
                                Your interview has been successfully scheduled. Share the link below
                                with your candidate to begin the interview process.
                            </p>

                            <Alert variant="light" className="text-start mb-3 p-2 small">
                                <h6 className="fw-semibold mb-2">Interview Details</h6>
                                <p className="mb-0"><strong>Duration:</strong> {formData.duration} minutes</p>
                                <p className="mb-0"><strong>Created By Email:</strong> {formData.email}</p>
                            </Alert>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold small">Shareable Interview Link</Form.Label>
                                <div className="input-group">
                                    <Form.Control
                                        type="text"
                                        value={url}
                                        readOnly
                                        className="py-2 small"
                                    />
                                    <Button
                                        variant={copied ? "success" : "primary"}
                                        onClick={copyToClipboard}
                                        className="d-flex align-items-center small"
                                        size="sm"
                                    >
                                        {copied ? (
                                            <>
                                                <Clipboard className="me-1" /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Link45deg className="me-1" /> Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Form.Group>

                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-3">
                                <Button variant="primary" size="sm" className="px-3"
                                    onClick={handleClick}>
                                    Back To Dashboard
                                </Button>
                            </div>


                            {/* Share Options Section */}
                            <div className="mt-3 border-top pt-3">
                                <h6 className="fw-semibold small mb-2">Share via</h6>
                                <div className="d-flex justify-content-center gap-2">
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Interview Link: ${url}`)}`, '_blank')}
                                        className="d-flex align-items-center"
                                    >
                                        <i className="bi bi-whatsapp me-1"></i> WhatsApp
                                    </Button>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => window.open(`mailto:?subject=Interview Invitation&body=Please join using this link: ${encodeURIComponent(url)}`, '_blank')}
                                        className="d-flex align-items-center"
                                    >
                                        <i className="bi bi-envelope me-1"></i> Email
                                    </Button>
                                    <Button
                                        variant="outline-dark"
                                        size="sm"
                                        onClick={() => {
                                            const discordMessage = `Interview Invitation\nJoin using this link: ${url}`;
                                            navigator.clipboard.writeText(discordMessage);
                                            alert('Interview link copied! You can now paste it in Discord');
                                        }}
                                        className="d-flex align-items-center"
                                    >
                                        <i className="bi bi-discord me-1"></i> Discord
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="text-center mt-3 text-muted small">
                        <small>
                            Need help? <a href="/about">Contact support</a>
                        </small>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default InterviewLink;
