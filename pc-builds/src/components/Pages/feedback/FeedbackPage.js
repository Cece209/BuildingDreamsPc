import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Rating } from '@aws-amplify/ui-react';



  

function FeedbackPage(){
    const [rating, setRating] = useState(0); // Initializes state to hold rating value
    

    const handleSubmitFeedback = () => {
        // Here you might call an API to save the rating
        console.log('Feedback submitted with rating:', rating);
        // Optionally reset the rating or show a message
        setRating(0);
        alert('Thank you for your feedback!');
    };
    


    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1 style={{ color: 'white', textShadow: '0 0 3px black' }}>Feedback</h1></Col>
            </Row>
            <Row className="px-4">
                <Col>
                    <h2 style={{ color: 'white', textShadow: '0 0 3px black' }}>How would you rate your experience?</h2>
                    <Rating
                        value={rating} // Current rating value
                        maxValue={5}  // Maximum number of stars
                        onChange={(value) => setRating(value)} // Updates state when a star is clicked
                    />                   
                    <div style={{ color: 'white', marginTop: '20px' }}>
                        You rated: {rating} / 5                      
                    </div>
                </Col>
            </Row>
            <Row className="px-4 my-5">
                <Col><Button onClick={handleSubmitFeedback} variant="primary">Submit Feedback</Button>
                </Col>
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
