import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";


function FeedbackPage() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [feedback, setFeedback] = useState("");  // State to hold the feedback text

    const hoverLabels = {
        1: "Bad",
        2: "OK",
        3: "Good",
        4: "Great",
        5: "Amazing"
    };

    const handleSubmitFeedback = () => {
        console.log('Feedback submitted with rating:', rating, 'and notes:', feedback);
        alert('Thank you for your feedback!');
        setRating(0);  
        setFeedback("");  
    };

    

    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1 style={{ color: 'white', textShadow: '0 0 3px black' }}>Feedback</h1></Col>
            </Row>
            <Row className="px-4">
                <Col>
                    <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>How would you rate your experience?</h2>
                    <div>
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        style={{ display: "none" }}
                                    />
                                    <FaStar
                                        className='star'
                                        size={50}
                                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    <div style={{ color: 'white', marginTop: '20px' }}>
                        {hover ? hoverLabels[hover] : "None"} {/* Display dynamic hover labels */}
                    </div>             
                    <Form.Group controlId="exampleForm.ControlTextarea1" style={{ marginTop: '20px' }}>
                        <Form.Label style={{ color: 'white' }}>Additional Notes:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Enter any additional feedback here..."
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="px-4 my-5">
                <Col><Button onClick={handleSubmitFeedback} variant="primary">Submit Feedback</Button></Col>
            </Row>
            <style>
                {`
                    body {
                        background-color: #333333;
                        min-height: 100vh;
                    }
                `}
            </style>
        </Container>
    );
}

export default FeedbackPage;
