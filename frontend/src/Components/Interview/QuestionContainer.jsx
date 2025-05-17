import React from 'react'
import {
    Row,
    Col,
    Card,
} from 'react-bootstrap';
const QuestionContainer = ({ questionList }) => {
    return (
        <div>
            <Row xs={1} md={2} lg={3} className="g-4">
                {questionList.map((item, index) => (
                    <Col key={index}>
                        <Card className="h-100 shadow-sm border-0 hover-shadow transition">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-start">
                                    <span className="badge bg-primary me-2 mt-1">
                                        {index + 1}
                                    </span>
                                    <span>{item.question}</span>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default QuestionContainer
