import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Spinner,
    Alert,
    Badge
} from 'react-bootstrap';
import QuestionContainer from './QuestionContainer.jsx';
import { v4 as uuidv4 } from 'uuid';
const QuestionList = ({ goBack, formData, goToNext, onCreateLink }) => {
    const [questionList, setQuestionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        if (formData) {
            generateQuestionList();
        }
    }, [formData]);

    const handleQuestionSubmit = async () => {
        let interviewId = uuidv4();
        try {
            const data = await axios.post("https://careermate-app.onrender.com/api/v1/interview/post-interview",
                { ...formData, interviewId, questionList }, {
                withCredentials: true,
            })
            goToNext();

            onCreateLink(interviewId)
        }
        catch (err) {
            console.log(err);
        }
    }

    const generateQuestionList = async () => {
        try {
            setError(null);
            setLoading(true);

            const { data } = await axios.post(
                'https://careermate-app.onrender.com/api/v1/interview/generate-questions',
                { ...formData },
                {
                    withCredentials: true,
                    timeout: 30000
                }
            );

            // Check if the response indicates success
            if (!data.success) {
                throw new Error(data.message || 'Request failed');
            }

            // Safely access the questions content
            const rawContent = data?.finalQuestions?.content;
            if (!rawContent) {
                throw new Error('Server response is missing question content');
            }

            // Parse the JSON content
            let parsedQuestions;
            try {
                parsedQuestions = JSON.parse(rawContent);
            } catch (parseError) {
                console.error('Failed to parse questions:', rawContent);
                throw new Error('Received invalid question format from server');
            }

            // Validate the questions array
            if (!Array.isArray(parsedQuestions)) {
                throw new Error('Server did not return an array of questions');
            }

            if (parsedQuestions.length === 0) {
                throw new Error('No questions were generated');
            }

            setQuestionList(parsedQuestions);
        } catch (err) {
            console.error('Error details:', err);

            let errorMessage = 'Error generating questions';
            if (err.response) {
                // Server responded with error status
                if (err.response.data?.message) {
                    errorMessage = err.response.data.message;
                } else if (err.response.status === 500) {
                    errorMessage = 'Server encountered an internal error';
                }
            } else if (err.message) {
                errorMessage = err.message;
            } else if (err.code === 'ECONNABORTED') {
                errorMessage = 'Request timed out. Please try again.';
            }

            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="py-5 bg-light">
            <Container className="mt-4">
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h1 className="display-5 fw-bold text-primary">
                            Interview Questions
                            <Badge bg="info" className="ms-2">
                                {questionList.length} Questions
                            </Badge>
                        </h1>
                        <p className="text-muted">
                            Personalized questions based on your interview details
                        </p>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="primary"
                            onClick={goBack}
                            className="shadow-sm"
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Form
                        </Button>
                    </Col>
                </Row>

                {loading ? (
                    <Row className="justify-content-center my-5 py-5">
                        <Col xs="auto" className="text-center">
                            <Spinner animation="border" variant="primary" size="lg" />
                            <h4 className="mt-3 text-primary">
                                Crafting Your Questions...
                            </h4>
                            <p className="text-muted mt-2">
                                Our AI is analyzing your details to create the perfect interview questions.
                            </p>
                        </Col>
                    </Row>
                ) : error ? (
                    <Alert variant="danger" className="my-4">
                        <Alert.Heading>Error Generating Questions</Alert.Heading>
                        <p>{error}</p>
                        <Button variant="outline-danger" onClick={generateQuestionList}>
                            Try Again
                        </Button>
                    </Alert>
                ) : (
                    <QuestionContainer questionList={questionList} />
                )}
                <Button
                    variant="primary"
                    className="shadow-sm"
                    onClick={handleQuestionSubmit}
                >
                    Finish
                </Button>
            </Container>
        </Container>
    );
};

export default QuestionList;